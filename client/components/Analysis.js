/*
  Analysis
*/

var React = require('react');
var Graph = require('./Graph');
var Data = require('./Data');

var Analysis = React.createClass({
  render: function() {
    return (
      <div className="analysis-container">
        <Graph />
        <Data />
      </div>
    )
  }
});

module.exports = Analysis;
