/*
  CodeMirror
*/

var React = require('react');
var ReactCodeMirror = require('react-codemirror');
var CodeMirror =
require('codemirror/mode/javascript/javascript');


var CodeMirror = React.createClass({
  getInitialState: function() {
    return {
      code: "//Write your algorithm here.",
      mode: "javascript"
    }
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.state.code.value = '';
  },
  render: function() {
    var options = {
      lineNumbers: false,
      mode: 'javascript',
      tabSize: 2
    };
    return (
      <div className="codeMirror-container">
        <form onSubmit={this.handleSubmit}>
          <ReactCodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
          <button>Evaluate Code</button>
        </form>
      </div>
    )
  }
});

module.exports = CodeMirror;
