/*
  Line
*/

var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      interpolate: 'monotone',
      color: 'black',
      strokeWidth: 1,
      data: []
    }
  },

  componentDidMount: function() {
    this.path = d3.select(ReactDOM.findDOMNode(this.refs.path));
    this.renderPath();
  },

  renderPath: function() {
    this.path
      .attr('transform', 'translate(32, 20)');
  },

  render: function() {
    var xScale = this.props.xScale;
    var yScale = this.props.yScale;

    var line = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); })
      .interpolate(this.props.interpolate);

    return (
      <g>
        <path ref="path" d={line(this.props.data)} stroke={this.props.color} strokeWidth={this.props.strokeWidth} fill="none" />
      </g>
    );
  }
});

module.exports = Line;
