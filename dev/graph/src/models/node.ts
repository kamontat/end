import graphviz from "graphviz";
import { Dependency, DependencyType } from "../constants/dependency";
import { standardNodes } from "../constants/dependencies";

export type Arguments = Record<string, string>;

export class Node {
  private node: graphviz.Node;
  constructor(private graph: graphviz.Graph, dep: Dependency) {
    this.node = this.addNode(dep);
  }

  private withStyles(dep: Dependency, def: Arguments) {
    return (app: Arguments, lib: Arguments, dev: Arguments) => {
      switch (dep.type) {
        case DependencyType.APP:
          return { ...def, ...app };
        case DependencyType.LIB:
          return { ...def, ...lib };
        case DependencyType.DEV:
          return { ...def, ...dev };
      }
    };
  }

  private addNode(dep: Dependency) {
    const args: Arguments = {};
    const style = this.withStyles(dep, args)(
      {
        style: "filled",
        color: "black",
        fillcolor: "grey",
      },
      {
        color: "black",
      },
      {
        color: "grey",
      }
    );

    return this.graph.addNode(dep.fullname, style);
  }

  private addEdge(a: graphviz.Node, b: graphviz.Node, dep: Dependency) {
    const args: Arguments = {};
    const style = this.withStyles(dep, args)(
      {
        style: "bold",
        color: "black",
      },
      {
        style: "solid",
        color: "black",
      },
      {
        style: "dashed",
        color: "grey",
      }
    );

    this.graph.addEdge(a, b, style);
  }

  get name() {
    return this.node.id;
  }

  standardNode() {
    standardNodes.forEach((n) => this.dependOn(n));
  }

  dependOn(dep: Dependency) {
    const node = this.addNode(dep);
    this.addEdge(this.node, node, dep);

    return new Node(this.graph, dep);
  }

  dependsOn(...deps: Dependency[]) {
    deps.forEach((d) => this.dependOn(d));
  }
}
