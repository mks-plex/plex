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
        <p id="intro-message">Plex allows you to test the time complexity of your algorithm.</p>
        <p>This is so fun!<p>
        <CodeMirror />
        <Analysis />
      </div>
    )
  }
});

module.exports = Body;
