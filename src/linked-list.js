const Node = require("./node");

class LinkedList {
  constructor() {
    this.length = 0;
  }

  append(data) {
    const appendNode = () => {
      if (this.isEmpty()) {
        this.node = new Node(data);
        this._head = new Node();
        this._tail = new Node();
      } else {
        const newNode = new Node(data, this.node);
        this.node.next = newNode;
        this.node = newNode;
      }
    };

    appendNode();
    this.length += 1;
    return this;
  }

  head() {
    const getHead = list => {
      if (!list) return null;

      if (list.prev === null) return list.data;

      return getHead(list.prev);
    };

    return getHead(this.node);
  }

  tail() {
    if (!this.node) return null;

    return this.node.data;
  }

  atNode(index) {
    const searchByIndex = (list, count) => {
      if (count === index) return list;
      if (index > count) return null;

      return searchByIndex(list.prev, count - 1);
    };

    return searchByIndex(this.node, this.length - 1);
  }

  at(index) {
    if (!this.node) return null;

    return this.atNode(index).data;
  }

  insertAt(index, data) {
    if (!this.node) return null;

    const nodeByIndex = this.atNode(index);
    const prevElem = nodeByIndex.prev;
    const nextElem = nodeByIndex.next;

    const newNode = new Node(data, prevElem, nodeByIndex);

    nodeByIndex.prev = newNode;

    this.length += 1;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.node = null;
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    const nodeByIndex = this.atNode(index);
    const prevElem = nodeByIndex.prev;
    const nextElem = nodeByIndex.next;

    if (nextElem) {
      nextElem.prev = prevElem;
    }

    if (prevElem) {
      prevElem.next = nextElem;
    }

    this.length -= 1;

    return this;
  }

  reverse() {
    if (!this.node) return null;

    const newList = new LinkedList();
    newList.append(this.tail());

    if (!this.node.prev) {
      this.node = newList.node;
      return this;
    }

    const iter = list => {
      newList.append(list.data);
      if (list.prev === null) {
        this.node = newList.node;
        return this;
      }

      return iter(list.prev);
    };

    return iter(this.node.prev);
  }

  indexOf(data) {
    const getHead = (list, count) => {
      if (!list) return -1;

      if (list.data === data) return count - 1;

      return getHead(list.prev, count - 1);
    };

    return getHead(this.node, this.length);
  }
}
module.exports = LinkedList;
