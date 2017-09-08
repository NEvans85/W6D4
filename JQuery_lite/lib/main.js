const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function $l(selector){
  let nodeArray;
  switch (selector instanceof HTMLElement) {
    case false:
      const selectedNodes = document.querySelectorAll(selector);
      nodeArray = Array.from(selectedNodes);
      break;
    case true:
      nodeArray = [selector];
      break;
  }

  return new DOMNodeCollection(nodeArray);
};
