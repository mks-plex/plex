/*
  LineChart
*/

var React = require('react');
var d3 = require('d3');
var _ = require('underscore');
var Chart = require('./Chart');
var DataSeries = require('./DataSeries');

var LineChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 800,
      height: 300
    }
  },

  render: function() {
    var size = { width: this.props.width, height: this.props.height };

    var xScale = d3.scale.log()
      .domain([0.000001, 10000000])
      .range([0, this.props.width]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(0, "e");

    var yScale = d3.scale.linear()
      .domain([0, 120])
      .range([this.props.height, 0]);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(6);

    return (
      <Chart width={this.props.width} height={this.props.height} xAxis={xAxis} yAxis={yAxis}>
        <DataSeries />
      </Chart>
    );
  }
});

module.exports = LineChart;
