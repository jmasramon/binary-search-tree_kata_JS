'use strict';
/* global require, describe, it, xit, beforeEach */
/*jshint -W030 */

// var chai = require('chai');
var assert = require('assert');
var expect = require('chai').expect;
var Bst = require('../lib/binary-search-tree');

function argShouldBeDefinedButEmpty(arg) {
  expect(arg).to.be.undefined;
}

describe('binary-search-tree', function () {
  var bst;
  beforeEach(function() {
    bst = new Bst();
  });

  describe('Existence:', function () {
    it('should be instanciable', function () {
      expect(bst).to.be.an.instanceof(Bst);
    });

    it('should have a value', function () {
      expect(bst.value).to.exist;
    });

    it('should have left and right', function () {
      argShouldBeDefinedButEmpty(bst.left);
      argShouldBeDefinedButEmpty(bst.right);
      expect(bst.other).to.not.exist;
    });

    it('should have a constructor that accepts initial value and creates a single leaf', function () {
      var bst = new Bst(3);
      expect(bst.value).to.equal(3);
      argShouldBeDefinedButEmpty(bst.left);
      argShouldBeDefinedButEmpty(bst.right);
    });
  });

  describe('Concatenation:', function () {
    var bst;
    beforeEach(function() {
      bst = new Bst(3);
    });

    it('should allow adding a new node', function () {
      expect(bst.concat).to.exist;
      expect(bst.concat(new Bst(4)).right).to.exist;
      expect(bst.value).to.equal(3);
    });

    describe('It should add new nodes orderly', function (done) {
      it('should add smaller nodes to the left', function () {
        expect(bst.concat(new Bst(2)).left.value).to.equal(2);
      });

      it('should add smaller nodes to the right', function () {
        expect(bst.concat(new Bst(4)).right.value).to.equal(4);
        expect(new Bst(3).concat(new Bst(4)).toString()).to.equal('(3, -, (4, -, -))');
      });

      it('should add equal nodes to the left', function () {
        expect(bst.concat(new Bst(3)).left.value).to.equal(3);
        expect(new Bst(3).concat(new Bst(3)).toString()).to.equal('(3, (3, -, -), -)');
      });

      it('should keep adding more smaller nodes to the left', function () {
        expect(bst.concat(new Bst(2)).concat(new Bst(1))).to.not.fail;
        expect(new Bst(3).concat(new Bst(2)).concat(new Bst(1)).toString()).to.equal('(3, (2, (1, -, -), -), -)');
        expect(new Bst(3).concat(new Bst(2)).concat(new Bst(1)).left.left.value).to.equal(1);
      });

      it('should keep adding more bigger nodes to the right', function () {
        expect(bst.concat(new Bst(4)).concat(new Bst(5))).to.not.fail;
        expect(new Bst(3).concat(new Bst(4)).concat(new Bst(5)).toString()).to.equal('(3, -, (4, -, (5, -, -)))');
        expect(new Bst(3).concat(new Bst(4)).concat(new Bst(5)).right.right.value).to.equal(5);
      });

      it('should add as many nodes as wanted in an orderly way', function () {
        expect(new Bst(4)
                  .concat(new Bst(2))
                  .concat(new Bst(6))
                  .concat(new Bst(3))
                  .concat(new Bst(1))
                  .concat(new Bst(5))
                  .concat(new Bst(7))
                  .toString()).to.equal('(4, (2, (1, -, -), (3, -, -)), (6, (5, -, -), (7, -, -)))');
      });
    });

    describe('String representation:', function () {
      var bst;
      beforeEach(function() {
        bst = new Bst(3);
      });

      it('for a single node', function () {
        expect(bst.toString()).to.equal('(3, -, -)');
      });

      it('for two nodes', function () {
        expect(bst.concat(new Bst(2)).toString()).to.equal('(3, (2, -, -), -)');
        expect(new Bst(3).concat(new Bst(4)).toString()).to.equal('(3, -, (4, -, -))');
      });

      it('for three nodes', function () {
        expect(bst.concat(new Bst(2)).concat(new Bst(4)).toString()).to.equal('(3, (2, -, -), (4, -, -))');
      });

      it('should override the default toString', function () {
        expect(''+bst).to.equal('(3, -, -)');
      });
    });


  });
});
