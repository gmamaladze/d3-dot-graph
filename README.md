# d3-dot-graph

This module provides [D3js](#d3js) compatible library to parse and load files in graphviz [.dot](#dot) (graph description language) format.

## why?
While working on Java Platform Module System migration projects coming with Java 9 (as of August 2017), I am havily using jdeps which is generating DOT (.dot) files. These are usually visualized using dot tool of graphviz.

In most cases it is enough, but I wanted to have nicer d3js visualization and interaction.    

## usage

Usage is identical with well known ´d3.json([url], [callback])´ or ´d3.csv([url], [callback])´.

```js
d3.dot("/path/to/graph.dot", function(error, graph) {
  if (error) throw error;
  console.log(JSON.stringify(graph, null, true));
  //{
  //  "nodes": [ {"id": "Myriel"}, {"id": "Napoleon"}],
  //  "links": [ {"source": "Myriel"}, {"target": "Napoleon"}]
  //}  
});
```

## parser

The parser was generated using [PEG.js](#pegjs). The grammer is taken from here [cpettitt/graphlib-dot](https://github.com/cpettitt/graphlib-dot). Thanks to Chris Pettitt.

You can also use parser independently from loader and converter.

# build


## notes

[#d3js]: https://www.d3js.org
[#dot]: https://en.wikipedia.org/wiki/DOT_(graph_description_language)
[#pegjs]: https://pegjs.org
