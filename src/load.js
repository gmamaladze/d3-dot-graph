'use strict';

import "./dot-parser.js";

const dotparser = d3dotparser1;

export default function(url, converter, callback) {
      if (arguments.length < 3) callback = converter, converter = simple;
      var r = d3
          .request(url)
          .mimeType("text/vnd.graphviz")
          .response(function(xhr) {
            return converter(dotparser.parse(xhr.responseText)); });
      return callback ? r.get(callback) : r;
  };

  function simple(dotgraph) {

    let nodeMap = {};
    function addNode(node) {
      if (nodeMap[node.id]) return;
      nodeMap[node.id] = node;
    }

    if (dotgraph.length===0) return null;
    let fgraph = dotgraph[0];

    fgraph.stmts.filter((s) => s.type === "node" ).forEach(addNode);
    let edges = fgraph.stmts.filter((s) => s.type === "edge" );
    let links = [];
    for(let i=0; i<edges.length; i++) {
      let edge = edges[i];
      for(let j=0; j<edge.elems.length-1; j++) {
        let curr = edge.elems[j];
        let next = edge.elems[j+1];
        let link = Object.assign({source:curr.id, target:next.id}, edge.attrs);
        links.push(link);
        addNode(curr);
        addNode(next);
      }
    }

    let nodes  = Object.values(nodeMap).map( (n) => Object.assign({id:n.id}, n.attrs));
    return {
      nodes,
      links
    };
  }
