/*
  Graph
*/

var React = require('react');
var LineChart = require('./LineChart');

var Graph = React.createClass({
  getDefaultProps: function() {
    return {
      data: [
        {x: 0.1, y: 0}, {x: 100, y: 10}, {x: 1000, y: 20}, {x: 10000, y: 30}, {x: 100000, y: 40}, {x: 1000000, y: 50}
      ]
    }
  },

  render: function() {
    var style = {
      width: '65vw'
    };

    return (
      <div className="graph-container" style={style}>
        <LineChart data={this.props.data} />
      </div>
    );
  }
});

module.exports = Graph;
