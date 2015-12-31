/*
  Analysis
*/

var React = require('react');
var ReactDOM = require('react-dom');
var Graph = require('./Graph');
var Data = require('./Data');

var Analysis = React.createClass({
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.analysis).scrollTop = 800;
  },
  // componentDidUpdate: function() {
  //   var node = ReactDOM.findDOMNode();
  //   node.scrollTop = node.scrollHeight;
  // },
  // componentWillUpdate: function() {
  //    // ReactDOM.findDOMNode()
  //   var node = ReactDOM.findDOMNode(this.refs.analysis);
  //   ReactDOM.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  // },
   
  // componentDidUpdate: function() {
  //   if (ReactDOM.shouldScrollBottom) {
  //     var node = ReactDOM.findDOMNode(this.refs.analysis);
  //     node.scrollTop = node.scrollHeight
  //   }
  // },

  render: function() {
    var style = {
      container: {
        display: 'flex',
        justifyContent: 'space-around'
      },
      graphContainer: {
        position: 'relative'
      }
    };

    return (
      <div ref="analysis" className="analysis-container" style={style.container}>
        <div className="graph-container" style={style.graphContainer}>
          <Graph data={this.props.data} />
        </div>
        <Data data={this.props.data} equation={this.props.equation} theta={this.props.theta} />
      </div>
    )
  }
});

module.exports = Analysis;
