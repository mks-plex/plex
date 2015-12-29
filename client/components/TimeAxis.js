/*
  TimeAxis
*/

var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var TimeAxis = React.createClass({
  componentDidMount: function() {
    this.yAxisG = d3.select(ReactDOM.findDOMNode(this.refs.yAxis));
    this.yAxisLabel = d3.select(ReactDOM.findDOMNode(this.refs.yLabel));
    this.renderAxis();
    this.renderLabel();
  },

  componentWillReceiveProps: function(nextProps) {
    this.renderAxis();
    this.renderLabel();
  },

  renderAxis: function() {
    this.yAxisG
      .attr('class', 'y axis')
      .attr('transform', 'translate(32, 20)')
      .call(this.props.yAxis);
  },

  renderLabel: function() {
    this.yAxisLabel
      .attr('transform', 'rotate(-90)')
      .attr('y', '0')
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .style('font-size', '1.2rem')
      .text('time(ms)');
  },

  render: function() {
    return (
      <g ref="yAxis">
        <text ref="yLabel"></text>
      </g>
    );
  }
});

module.exports = TimeAxis;
