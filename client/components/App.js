/*
  App
*/

var React = require('react');
var Header = require('./Header');
var Body = require('./Body');
var Footer = require('./Footer');

var App = React.createClass({
  render: function() {
    var style = {
      display: 'flex',
      flexDirection: 'column'
    };

    return (
      <div style={style}>
        <Header header="plex"/>
        <Body intro="plex allows you to test the time complexity of your algorithm."/>
        <Footer footer="&copy; 2016"/>
      </div>
    )
  }
});

module.exports = App;
