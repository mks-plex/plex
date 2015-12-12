/*
  Line
*/

var React = require('react');
var d3 = require('d3');

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      interpolate: 'linear',
      color: 'black',
      width: 1,
      data: [
        {x: 0, y: 0}, {x: 100, y: 10}, {x: 1000, y: 20}, {x: 10000, y: 30}, {x: 100000, y: 40}, {x: 10000000, y: 50}
      ]
    }
  },

  componentWillMount: function() {
    this.line = d3.svg.line()
      .x(function(d) { return this.props.xScale(d.x); })
      .y(function(d) { return this.props.yScale(d.y); })
      .interpolate(this.props.interpolate);
  },

  // componentWillReceiveProps: function(nextProps) {
  //   this.renderLine();
  // },

  // renderLine: function() {
  //   this.path = d3.svg.line()
  //     .x(function(d) { return this.props.xScale(d.x); })
  //     .y(function(d) { return this.props.yScale(d.y); })
  //     .interpolate(this.props.interpolate);
  // },

  render: function() {
    return (
      <g>
        <path d={this.line(this.props.data)} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
      </g>
    );
  }
});

module.exports = Line;
