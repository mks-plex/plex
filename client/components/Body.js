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
      success: function(data) {
        console.log('Response received, success');
        console.log(data);
      },
      error: function(err) {
        console.error('Ooop! You have a ' + err.status + ' error.');
      }
    });
  },

  render: function() {
    var style = {
      content: {
        display: 'flex',
        flexDirection: 'column',
        height: '90vh'
      },
      intro: {
        width: '100%'
      }
    };

    return (
      <div className="main-content" style={style.content}>
        <p id="intro-message" style={style.intro}>{ this.props.intro }</p>
        <CodeMirror getCode={this.getCode} />
        <Analysis />
      </div>
    )
  }
});

module.exports = Body;
