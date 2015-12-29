/*
  Analysis
*/

var React = require('react');
var Graph = require('./Graph');
var Data = require('./Data');

var Analysis = React.createClass({
  render: function() {
    var style = {
      container: {
        display: 'flex',
        justifyContent: 'space-around'
      },
      graphContainer: {
        position: 'relative'
      }
    };

    return (
      <div className="analysis-container" style={style.container}>
        <div className="graph-container" style={style.graphContainer}>
          <Graph data={this.props.data} />
        </div>
        <Data data={this.props.data} equation={this.props.equation} />
      </div>
    )
  }
});

module.exports = Analysis;
