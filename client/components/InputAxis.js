/*
  InputAxis
*/

var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var InputAxis = React.createClass({
  componentDidMount: function() {
    this.xAxisG = d3.select(ReactDOM.findDOMNode(this.refs.xAxis));
    this.xAxisLabel = d3.select(ReactDOM.findDOMNode(this.refs.xLabel));
    this.renderAxis();
    this.renderLabel();
  },

  componentWillReceiveProps: function(nextProps) {
    this.renderAxis();
    this.renderLabel();
  },

  renderAxis: function() {
    this.xAxisG
      .attr('class', 'x axis')
      .attr('transform', 'translate(32, ' + (this.props.height - 30) + ')')
      .call(this.props.xAxis);
  },

  renderLabel: function() {
    this.xAxisLabel
      .attr('x', '' + (this.props.width - 50) + '')
      .attr('y', '-17')
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .style('font-size', '1.2rem')
      .text('input size');
  },

  render: function() {
    return (
      <g ref="xAxis">
        <text ref="xLabel"></text>
      </g>
    );
  }
});

module.exports = InputAxis;
