class DOMNodeCollection {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.handlers = {};
  }

  html(str){
    if (typeof str === 'undefined'){
      return this.nodeList[0].innerHTML;
    } else {
      for(let i = 0; i < this.nodeList.length; i++) {
        this.nodeList[i].innerHTML = str;
      }
    }
  }

  empty(){
    for(let i = 0; i < this.nodeList.length; i++){
      this.nodeList[i].innerHTML = "";
    }
  }

  append(element) {
    if (element instanceof DOMNodeCollection) {
      for (let i = 0; i < this.nodeList.length; i++) {
        let nodeInnerHTML = this.nodeList[i].innerHTML;
        for (let j = 0; j < element.nodeList.length; j++) {
          nodeInnerHTML += element.nodeList[j].outerHTML;
        }
        this.nodeList[i].innerHTML = nodeInnerHTML;
      }
    } else if (element instanceof HTMLElement) {
      for (let i = 0; i < this.nodeList.length; i++) {
        this.nodeList[i].innerHTML += element.outerHTML;
      }
    } else if (typeof element === 'string') {
      for (let i = 0; i < this.nodeList.length; i++) {
        this.nodeList[i].innerHTML += element;
      }
    }
  }

  attr(name, value){
    if(typeof value === 'undefined'){
      let attributes = this.nodeList[0].attributes;
      return attributes[name] ? attributes[name].value : undefined;
    } else {
      for (let i = 0; i < this.nodeList.length; i++) {
        this.nodeList[i].setAttribute(name,value);
      }
    }
  }

  addClass(className){
    for (var i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].classList.add(className);
    }
  }

  removeClass(className){
    for (var i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].classList.remove(className);
    }
  }

  children() {
    let children = [];

    for(let i = 0; i < this.nodeList.length; i++){
      children = children.concat(this.nodeList[i].children);
    }

    return new DOMNodeCollection(children);
  }

  parent() {
    let parentElements = [];

    for(let i = 0; i < this.nodeList.length; i++){
      parentElements = parentElements.concat(this.nodeList[i].parentElement);
    }

    return new DOMNodeCollection(parentElements);
  }

  find(selector) {
    let foundNodes = [];

    for (let i = 0; i < this.nodeList.length; i++) {
      foundNodes = foundNodes.concat(this.nodeList[i].querySelectorAll(selector));
    }

    return new DOMNodeCollection(foundNodes);
  }

  remove(){
    this.nodeList.forEach((node) => {
      node.outerHTML = "";
    });
  }

  on(action, cb){
    this.nodeList.forEach((node) => {
      node.addEventListener(action, cb);
      // this.attr('event-handlers', `${action}-${cb}`);
      if(node[action]){
        node[action].push(cb);
      } else {
        node[action] = [cb];
      }
    });
  }


  off(action){
    this.nodeList.forEach((node) => {
      node[action].forEach((cb) => {
        node.removeEventListener(action, cb);
      });
    });
  }
  // on(action, cb){
  //   this.nodeList.forEach((node) => {
  //     node.addEventListener(action, cb);
  //     // this.attr('event-handlers', `${action}-${cb}`);
  //   });
  //   if(this.handlers[action]){
  //     this.handlers[action].push(cb);
  //   } else {
  //     this.handlers[action] = [cb];
  //   }
  //   console.log(this.handlers);
  // }
  //
  //
  // off(action){
  //   console.log(this.handlers);
  //   this.nodeList.forEach((node) => {
  //     this.handlers[action].forEach((cb) => {
  //       node.removeEventListener(action, cb);
  //     });
  //   });
  // }
}





module.exports = DOMNodeCollection;
