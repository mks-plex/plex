/*
  Chart
*/

var React = require('react');
var ReactDOM = require('react-dom');

var Chart = React.createClass({
  renderAxes: function() {
    this.xAxisG
      .attr('class', 'x axis')
      .attr('transform', 'translate(32, ' + (this.props.height - 30) + ')')
      .call(this.props.xAxis);
    this.x0AxisG
      .attr('class', 'x axis')
      .attr('transform', 'translate(32, ' + (this.props.height - 30) + ')')
      .call(this.props.x0Axis);
    this.yAxisG
      .attr('class', 'y axis')
      .attr('transform', 'translate(32, 20)')
      .call(this.props.yAxis);
  },

  renderLabels: function() {
    this.xAxisLabel
      .attr('x', '' + (this.props.width - 50) + '')
      .attr('y', '-20')
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .text('input size');
    this.yAxisLabel
      .attr('transform', 'rotate(-90)')
      .attr('y', '0')
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .text('time');
  },

  componentDidMount: function() {
    this.xAxisG = d3.select(ReactDOM.findDOMNode(this.refs.xAxis));
    this.x0AxisG = d3.select(ReactDOM.findDOMNode(this.refs.x0Axis));
    this.yAxisG = d3.select(ReactDOM.findDOMNode(this.refs.yAxis));
    this.xAxisLabel = d3.select(ReactDOM.findDOMNode(this.refs.xLabel));
    this.yAxisLabel = d3.select(ReactDOM.findDOMNode(this.refs.yLabel));
    this.renderAxes();
    this.renderLabels();
  },

  componentWillReceiveProps: function() {
    this.renderAxes();
    this.renderLabels();
  },

  render: function() {
    var style = {
      chart: {
        margin: 50
      }
    };

    return (
      <svg width={this.props.width} height={this.props.height} style={style.chart}>
        <g ref="x0Axis"></g>
        <g ref="xAxis">
          <text ref="xLabel"></text>
        </g>
        <g ref="yAxis">
          <text ref="yLabel"></text>
        </g>
      </svg>
    );
  }
});

module.exports = Chart;
