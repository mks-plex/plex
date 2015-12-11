/*
  Graph
*/

var React = require('react');
var LineChart = require('./LineChart');

var Graph = React.createClass({
  render: function() {
    var style = {
      padding: 50,
      width: '65vw'
    };

    return (
      <div className="graph-container" style={style}>
        <LineChart />
      </div>
    );
  }
});

module.exports = Graph;
