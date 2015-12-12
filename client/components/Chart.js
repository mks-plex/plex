/*
  Chart
*/

var React = require('react');
var ReactDOM = require('react-dom');

var Chart = React.createClass({
  getDefaultProps: function() {
    return {
      interpolate: 'linear',
      color: 'black',
      lineWidth: 1,
      data: []
    }
  },

  componentDidMount: function() {
    this.xAxisG = d3.select(ReactDOM.findDOMNode(this.refs.xAxis));
    this.x0AxisG = d3.select(ReactDOM.findDOMNode(this.refs.x0Axis));
    this.yAxisG = d3.select(ReactDOM.findDOMNode(this.refs.yAxis));
    this.xAxisLabel = d3.select(ReactDOM.findDOMNode(this.refs.xLabel));
    this.yAxisLabel = d3.select(ReactDOM.findDOMNode(this.refs.yLabel));
    this.path = d3.select(ReactDOM.findDOMNode(this.refs.path));
    this.renderAxes();
    this.renderLabels();
    this.renderPath();
  },

  componentWillReceiveProps: function(nextProps) {
    this.renderAxes();
    this.renderLabels();
  },

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

  renderPath: function() {
    this.path
      .attr('transform', 'translate(32, 20)');
  },

  render: function() {
    var style = {
      chart: {
        margin: 50
      }
    };

    var xScale = this.props.xScale;
    var yScale = this.props.yScale;

    var line = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); })
      .interpolate(this.props.interpolate);

    return (
      <svg width={this.props.width} height={this.props.height} style={style.chart}>
        <g ref="x0Axis"></g>
        <g ref="xAxis">
          <text ref="xLabel"></text>
        </g>
        <g ref="yAxis">
          <text ref="yLabel"></text>
        </g>
        <g>
          <path ref="path" d={line(this.props.data)} stroke={this.props.color} strokeWidth={this.props.lineWidth} fill="none" />
        </g>
      </svg>
    );
  }
});

module.exports = Chart;
