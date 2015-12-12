/*
  ZeroAxis
*/

var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var ZeroAxis = React.createClass({
  componentDidMount: function() {
    this.x0AxisG = d3.select(ReactDOM.findDOMNode(this.refs.x0Axis));
    this.renderAxis();
  },

  componentWillReceiveProps: function() {
    this.renderAxis();
  },

  renderAxis: function() {
    this.x0AxisG
      .attr('class', 'x axis')
      .attr('transform', 'translate(32, ' + (this.props.height - 30) + ')')
      .call(this.props.x0Axis);
  },

  render: function() {
    return (
      <g ref="x0Axis">
      </g>
    );
  }
});

module.exports = ZeroAxis;
