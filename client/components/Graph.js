/*
  Graph
*/

var React = require('react');
var d3 = require('d3');
var _ = require('underscore');
var ZeroAxis = require('./ZeroAxis');
var InputAxis = require('./InputAxis');
var TimeAxis = require('./TimeAxis');
var Line = require('./Line');

var Graph = React.createClass({
  getDefaultProps: function() {
    return {
      width: 800,
      height: 425
    }
  },

  render: function() {
    //styles
    var style = {
      svg: {
        margin: '5rem',
        background: '#fffdfd',
        boxShadow: '0 0.25rem 0.4rem rgba(0, 0, 0, 0.24)',
      }
    };

    //ordinal axis
    var x0Scale = d3.scale.ordinal()
      .domain([0])
      .range([0]);

    var x0Axis = d3.svg.axis()
      .scale(x0Scale)
      .orient('bottom');

    // logarithmic scale (x)
    var xScale = d3.scale.log()
      .domain([10, 13000])
      .range([0, this.props.width - 50]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(0, d3.format(','))
      .tickValues([100, 1000, 10000])
      .outerTickSize(0);

    // linear scale (y)
    var yScale = d3.scale.linear()
      .domain([0, 215])
      .range([this.props.height - 50, 0]);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .tickValues([0, 40, 80, 120, 160, 200])
      .outerTickSize(0);

    return (
      <svg width={this.props.width} height={this.props.height} style={style.svg}>
        <ZeroAxis data={this.props.data} width={this.props.width} height={this.props.height} x0Axis={x0Axis} />
        <InputAxis data={this.props.data} width={this.props.width} height={this.props.height} xAxis={xAxis} />
        <TimeAxis data={this.props.data} width={this.props.width} height={this.props.height} yAxis={yAxis} />
        <Line data={this.props.data} xScale={xScale} yScale={yScale} />
      </svg>
    );
  }
});

module.exports = Graph;
