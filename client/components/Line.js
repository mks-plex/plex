/*
  Line
*/

var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      interpolate: 'basis',
      color: 'rgba(33, 33, 33, 0.75)',
      strokeWidth: 2
    }
  },

  componentDidMount: function() {
    this.path = d3.select(ReactDOM.findDOMNode(this.refs.path));
    this.renderPath();
  },

  componentDidUpdate: function(nextProps) {
    this.length = this.getTotalLength();
    console.log(this.length);
    this.path
      .attr('stroke-dasharray', this.length + ' ' + this.length)
      .attr('stroke-dashoffset', this.length)
      .transition()
        .duration(3000)
        .ease('linear')
        .attr('stroke-dashoffset', 0);
  },

  getTotalLength: function() {
    return this.path.node().getTotalLength();
  },

  renderPath: function() {
    this.path
      .attr('transform', 'translate(32, 20)');
  },

  render: function() {
    var xScale = this.props.xScale;
    var yScale = this.props.yScale;

    var line = d3.svg.line()
      .x(function(d) { return xScale(d.x_axis); })
      .y(function(d) { return yScale(d.y_axis); })
      .interpolate(this.props.interpolate);

    return (
      <g>
        <path ref="path" d={line(this.props.data)} stroke={this.props.color} strokeWidth={this.props.strokeWidth} fill="none" />
      </g>
    );
  }
});

module.exports = Line;
