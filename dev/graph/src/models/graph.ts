import graphviz from "graphviz";

import { Dependency } from "../constants/dependency";
import { Node } from "./node";

export class Graph {
  private graph: graphviz.Graph;
  private nodes: Node[];

  constructor(id: string) {
    this.graph = graphviz.digraph(id);
    this.nodes = [];

    this.graph.set("splines", "ortho");
    this.graph.set("ratio", "expand");
    this.graph.set("center", "1");
    this.graph.set("size", "10");

    this.graph.setNodeAttribut("fontsize", "12");
    this.graph.setNodeAttribut("shape", "box");
    this.graph.setNodeAttribut("margin", "0.22,0.22");
  }

  newNode(deps: Dependency) {
    const node = new Node(this.graph, deps);
    this.nodes.push(node);
    return node;
  }

  getNode(deps: Dependency) {
    return this.nodes.find((n) => n.name === deps.fullname);
  }

  toString() {
    return this.graph.to_dot();
  }

  toPDF(filepath: string) {
    console.log(`exporting to ${filepath}`);
    this.graph.render("pdf", `${filepath}/graph.pdf`);
  }

  toPNG(filepath: string) {
    console.log(`exporting to ${filepath}`);
    this.graph.render("png:cairo:gd", `${filepath}/graph.png`);
  }
}
