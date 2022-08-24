const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

module.exports = function () {
  const inputCode = fs.readFileSync("src/decrement.js", "utf8");
  const ast = parser.parse(inputCode);

  const stack = [];
  const nodes = [];
  const edges = [];

  traverse(ast, {
    enter(path) {
      if (path.node.type === "FunctionDeclaration") {
        nodes.push(path.node.id.name);
        stack.push(path.node.id.name);
      } else if (path.node.type === "CallExpression") {
        const functionName = stack.pop();
        edges.push([functionName, path.node.callee.name]);
        stack.push(functionName);
      }
    },
    exit(path) {
      if (path.node.type === "FunctionDeclaration") {
        stack.pop();
      }
    },
  });

  return { edges, nodes };
}
