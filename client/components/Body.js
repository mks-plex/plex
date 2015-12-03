/*
  Body
*/

var React = require('react');
var CodeMirror = require('./CodeMirror');
var Analysis = require('./Analysis');

var Body = React.createClass({
  render: function() {
    return (
      <div className="main-content">
        <CodeMirror />
        <Analysis />
      </div>
    )
  }
});

module.exports = Body;
