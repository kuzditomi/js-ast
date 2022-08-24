const parseSrc = require('./parser.js');
const graphviz = require("graphviz"); // Create digraph G

const data = parseSrc();

var g = graphviz.digraph("G");

for (let node of data.nodes) {
  g.addNode(node);
}

for (let [from, to] of data.edges) {
  g.addEdge(from, to);
}

// Set GraphViz path (if not in your path)
// g.setGraphVizPath( "/usr/local/bin" );

// Generate a PNG output
g.output("png", "test01.png");
