/*
  App
*/

var React = require('react');
var Header = require('./Header');
var Body = require('./Body');
var Footer = require('./Footer');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header header="plex" />
        <Body intro="plex allows you to test the time complexity of your algorithm." />
        <Footer footer="Hand crafted with love at MakerSquare" />
      </div>
    )
  }
});

module.exports = App;
