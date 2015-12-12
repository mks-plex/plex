/*
  Analysis
*/

var React = require('react');
var Graph = require('./Graph');
var Data = require('./Data');

var Analysis = React.createClass({
  getDefaultProps: function() {
    return {
      data: [
        {x: 0.1, y: 0}, {x: 100, y: 10}, {x: 1000, y: 20}, {x: 10000, y: 30}, {x: 100000, y: 40}, {x: 1000000, y: 50}
      ]
    }
  },

  render: function() {
    var style = {
      container: {
        display: "flex",
        height: '100%',
        justifyContent: "space-around"
      },
      graph: {
        width: '65vw'
      }
    };

    return (
      <div className="analysis-container" style={style.container}>
        <div className="graph-container" style={style.graph}>
          <Graph data={this.props.data} />
        </div>
        <Data />
      </div>
    )
  }
});

module.exports = Analysis;
