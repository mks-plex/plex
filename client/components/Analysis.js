/*
  Analysis
*/

var React = require('react');
var Graph = require('./Graph');
var Data = require('./Data');

var Analysis = React.createClass({
  render: function() {
    var style = {
      display: "flex",
      height: '100%',
      justifyContent: "space-around"
    };

    return (
      <div className="analysis-container" style={style}>
        <Graph />
        <Data />
      </div>
    )
  }
});

module.exports = Analysis;
