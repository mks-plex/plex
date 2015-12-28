/*
  Body
*/

var React = require('react');
var $ = require('jquery');
var CodeMirror = require('./CodeMirror');
var Analysis = require('./Analysis');

var Body = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  getCode: function(newCode) {
    $.ajax({
      type: 'POST',
      url: '/parse/integers',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({data: newCode}),
      success: function(data) {
        console.log('Incoming evaluation for ' + data.name);

        var coords = JSON.parse(data.coords);
        var equation = data.eq;

        console.log(equation);
        console.log(coords);

        this.setState({data: coords});
      }.bind(this),
      error: function(err) {
        console.error('Oups! You have a ' + err.status + ' error.' + err.responseText);
      }.bind(this)
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
        <Analysis data={this.state.data} />
      </div>
    )
  }
});

module.exports = Body;
