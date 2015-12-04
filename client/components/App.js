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
      <div className="">
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
});

module.exports = App;
