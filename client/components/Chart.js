/*
  Chart
*/

var React = require('react');
var ReactDOM = require('react-dom');

var Chart = React.createClass({
  componentDidMount: function() {
    this.xAxisG = d3.select(ReactDOM.findDOMNode(this.refs.xAxis));
    this.yAxisG = d3.select(ReactDOM.findDOMNode(this.refs.yAxis));
    console.log(this.xAxisG);
  },

  componentWillReceiveProps: function() {
    var xScale = d3.scale.log()
      .domain([0.000001, 10000000])
      .range([0, this.props.width]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(0, "e");

    var yScale = d3.scale.linear()
      .domain([0, 120])
      .range([0, 120]);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(6);

    this.xAxisG.call(xAxis);
    this.yAxisG.call(yAxis);
  },

  render: function() {
    var style = {
      chart: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1
      }
    };

    return (
      <svg width={this.props.width} height={this.props.height} style={style.chart}>
        <g ref="xAxis"></g>
        <g ref="yAxis"></g>
      </svg>
    );
  }
});

module.exports = Chart;
