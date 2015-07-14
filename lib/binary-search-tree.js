'require strict';

var _ = require('lodash');

module.exports = (function() {
  function Bst(value, left, right) {
    this.value = initializeMember(value, 0);
    this.left = initializeMember(left, undefined);
    this.right = initializeMember(right, undefined);
  }

  function initializeMember(member, defaultVal) {
    return typeof member !== 'undefined' ? member : defaultVal;
  }

  Bst.prototype.concat = function(bst) {
    var setSTPart = setSubTree(this, bst);

    if (isNewNodeBigger(this, bst)) {
      setSTPart('right');
    } else {
      setSTPart('left');
    }

    return this;
  };

  function setSubTree(node, new_node, direction) {
    if (isPartiallyApplied(arguments)) {
      return function (direct) {
        setSubTree(node, new_node, direct);
      };
    }

    if (isEmptyLeaf(node[direction])) {
      node[direction] = new_node;
    } else {
      node[direction].concat(new_node);
    }
  }

  function isPartiallyApplied(args) {
    return (args.length === 2);
  }

  function isEmptyLeaf(leaf) {
    return (leaf === undefined);
  }

  function isNewNodeBigger(node, new_node) {
    return (new_node.value > node.value);
  }

  Bst.prototype.toString = function() {
    var strRep;

    strRep = placeValue(this.value);

    _.forEach(['left', 'right'], function (direction) {
      if (isLeafEmpty(this, direction)) {
        strRep += addSeparator() + addEmptyLeaf();
      } else {
        strRep += addSeparator() + addSubTree(this, direction);
      }
      strRep +=  closeStringIfRight(direction);
    }, this);

    return strRep;
  };

  function placeValue(value) {
    return '(' + value;
  }

  function isLeafEmpty(node, direction) {
    // console.log('isLeafEmpty: direction =', direction, 'subtree =', node[direction]);
    return !node[direction];
  }

  function addSeparator() {
    return ', ';
  }

  function addEmptyLeaf() {
    return '-';
  }

  function addSubTree(node, direction) {
    return node[direction].toString();
  }

  function closeStringIfRight(direction) {
    return ((direction === 'right') ? closeString() : '');
  }

  function closeString() {
    return ')';
  }

  return Bst;
})();
