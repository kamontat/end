import graphviz from "graphviz";
import { Dependency, DependencyType, DependencyFrom } from "../constants/dependency";
import { standardNodes, devCli, devLinter, devTestbox, devUtils } from "../constants/dependencies";
import { Stylist } from "./style";

export type Arguments = Record<string, string>;

export class Node {
  private node: graphviz.Node;
  constructor(private graph: graphviz.Graph, dep: Dependency) {
    this.node = this.addNode(dep);
  }

  private addNode(dep: Dependency) {
    const style = new Stylist({ color: "gray" });

    // if app: blue
    // if lib: green
    // if test: yellow
    // if dev: gray
    style.when(DependencyType.APP).then("style", "normal").andThen("color", "lightslateblue");
    style
      .whenFrom(DependencyFrom.IN)
      .then("style", "filled")
      .andThen("color", "black")
      .andThen("fillcolor", "lightsteelblue1");

    style.when(DependencyType.LIB).then("style", "normal").andThen("color", "darkgreen");
    style
      .whenFrom(DependencyFrom.IN)
      .then("style", "filled")
      .andThen("color", "black")
      .andThen("fillcolor", "palegreen");

    style.when(DependencyType.TST).then("style", "normal").andThen("color", "khaki4");
    style.whenFrom(DependencyFrom.IN).then("style", "filled").andThen("color", "black").andThen("fillcolor", "khaki1");

    style.when(DependencyType.DEV).then("style", "normal").andThen("color", "gray");
    style.whenFrom(DependencyFrom.IN).then("style", "filled").andThen("color", "black").andThen("fillcolor", "gray90");

    return this.graph.addNode(dep.fullname, style.when(dep.type, dep.from).get());
  }

  private addEdge(a: graphviz.Node, b: graphviz.Node, dep: Dependency) {
    const style = new Stylist({});

    // if app: blue
    // if lib: green
    // if test: yellow
    // if dev: gray
    style.when(DependencyType.APP).then("style", "solid");
    style.whenFrom(DependencyFrom.IN).then("color", "royalblue4");

    style.when(DependencyType.LIB).then("style", "solid");
    style.whenFrom(DependencyFrom.IN).then("color", "palegreen4");

    style.when(DependencyType.TST).then("style", "dashed");
    style.whenFrom(DependencyFrom.IN).then("color", "yellow4");

    style.when(DependencyType.DEV).then("style", "dashed");
    style.whenFrom(DependencyFrom.IN).then("color", "grey10");

    this.graph.addEdge(a, b, style.when(dep.type, dep.from).get());
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

  withDevCli() {
    this.dependOn(devCli);
    return this;
  }

  withLint() {
    this.dependOn(devLinter);
    return this;
  }

  withTest() {
    this.dependOn(devTestbox);
    return this;
  }

  withUtils() {
    this.dependOn(devUtils);
    return this;
  }
}
