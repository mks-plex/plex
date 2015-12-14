/*
  Body
*/

var React = require('react');
var $ = require('jquery');
var CodeMirror = require('./CodeMirror');
var Analysis = require('./Analysis');

var Body = React.createClass({
  getCode: function(newCode) {
    $.ajax({
      type: 'POST',
      url: '/parse/integers',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({data: newCode}),
      success: function(res) {
        console.log('Response received, success');
        console.log(res.body);
      },
      error: function(err) {
        console.error('Ooop! You have a ' + err.status + ' error.');
      }
    });
  },
  
  render: function() {
    return (
      <div className="main-content">
        <p id="intro-message">Plex allows you to test the time complexity of your algorithm.</p>
        <CodeMirror getCode={this.getCode} />
        <Analysis />
      </div>
    )
  }
});

module.exports = Body;
