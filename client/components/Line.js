/*
  Line
*/

var React = require('react');

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      path: '',
      color: 'black',
      width: 1
    }
  },

  render: function() {
    return (
      <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
    );
  }
});

module.exports = Line;
