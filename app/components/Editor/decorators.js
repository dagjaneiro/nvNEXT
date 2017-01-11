import React from 'react'
import Immutable from 'immutable'
const marked = require('marked')

const KEY_SEPARATOR = '-'

const strategies = [{
  match: /(([_]{2})+)[^_]+?\1/g,
  class: 'md-bold'
}, {
  match: /(([_|\*]{2})+[_|\*])[^_]+?\1/g,
  class: 'md-bold md-italic'
}, {
  match: /_[^_]+?_/g,
  class: 'md-italic'
}]

function findWithRegex (regex, props, contentBlock, callback) {
  const text = contentBlock.getText()
  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    callback(start, start + matchArr[0].length, props)
  }
}

function decorateRange (decorationsArray, start, end, key) {
  for (var ii = start; ii < end; ii++) {
    decorationsArray[ii] = key
  }
}

markdownDecorator.prototype.getRangeDecorator = function (block, decorations) {
  let decorationId = 0
  const blockKey = block.getKey()
  this.decorated[blockKey] = {}

  return (start, end, props) => {
    if (decorations[start] != null) return

    if (props === undefined) {
      props = {}
    }
    const key = blockKey + KEY_SEPARATOR + decorationId
    this.decorated[blockKey][decorationId] = props
    decorateRange(decorations, start, end, key)
    decorationId++
  }
}


/**
 * Creates a Draft decorator
 * @param {Function} strategy function (contentBlock, callback(start, end, props))
 * @param {Function} getComponent function (props) -> React.Component
 */
function markdownDecorator () {
  this.decorated = {}
}

/**
 * Return list of decoration IDs per character
 * @param {ContentBlock} block
 * @return {List<String>}
 */
markdownDecorator.prototype.getDecorations = function (block) {
  const decorations = Array(block.getText().length).fill(null)
  const callback = this.getRangeDecorator(block, decorations)

  strategies.forEach((strategy) => {
    const props = {
      className: strategy.class
    }

    findWithRegex(strategy.match, props, block, callback)
  })

  return Immutable.List(decorations)
}

/**
 * Return component to render a decoration
 * @param {String} key
 * @return {Function}
 */
markdownDecorator.prototype.getComponentForKey = function (key) {
  return (props) => (<span {...props}>{props.children}</span>)
}

/**
 * Return props to render a decoration
 * @param {String} key
 * @return {Object}
 */
markdownDecorator.prototype.getPropsForKey = function (key) {
  var parts = key.split(KEY_SEPARATOR)
  var blockKey = parts[0]
  var decorationId = parts[1]
  return this.decorated[blockKey][decorationId]
}

export default markdownDecorator
