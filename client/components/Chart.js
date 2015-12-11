/*
  Chart
*/

var React = require('react');
var ReactDOM = require('react-dom');

var Chart = React.createClass({
  renderAxes: function() {
    this.xAxisG
      .attr('transform', 'translate(0, ' + (this.props.height - 50) + ')')
      .call(this.props.xAxis);
    this.yAxisG
      .attr('transform', 'translate(50, 0)')
      .call(this.props.yAxis);
  },

  componentDidMount: function() {
    this.xAxisG = d3.select(ReactDOM.findDOMNode(this.refs.xAxis));
    this.yAxisG = d3.select(ReactDOM.findDOMNode(this.refs.yAxis));
    console.log(this.xAxisG);
    this.renderAxes();
  },

  componentWillReceiveProps: function() {
    this.renderAxes();
  },

  render: function() {
    var style = {
      chart: {

      }
    };

    return (
      <svg width={this.props.width} height={this.props.height} style={style.chart}>
        <g ref="xAxis"></g>
        <g ref="yAxis"></g>
      </svg>
    );
  }
});

module.exports = Chart;
