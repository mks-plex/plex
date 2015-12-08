/*
  CodeMirror
*/

var React = require('react');
var ReactCodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('../styles/codemirror.css');

var CodeMirror = React.createClass({
  getInitialState: function() {
    return {
      code: 'Write your algorithm here.',
      mode: 'javascript'
    }
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    })
  },
  render: function() {
    var options = {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
    };
    return (
      <div className="codeMirror-container">
          <ReactCodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    )
  }
});

module.exports = CodeMirror;
