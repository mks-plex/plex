/*
  Analysis
*/

var React = require('react');
var ReactDOM = require('react-dom');
var Graph = require('./Graph');
var Data = require('./Data');
var $ = require('jquery');

var Analysis = React.createClass({

  componentDidMount: function() {
    window.scroll(0, ReactDOM.findDOMNode(this.refs.analysis).scrollHeight - 40);
  },

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
      <div ref="analysis" className="analysis-container" style={style.container}>
        <div className="graph-container" style={style.graphContainer}>
          <Graph data={this.props.data} />
        </div>
        <Data data={this.props.data} equation={this.props.equation} theta={this.props.theta} />
      </div>
    )
  }
});

module.exports = Analysis;
