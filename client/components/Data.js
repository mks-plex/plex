/*
  Data
*/

var React = require('react');

var Data = React.createClass({
  render: function() {
    var style = {
      container: {padding: 50},
      content: {
        width: '30vw',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1
      }
    };

    return (
      <div className="data-container" style={style.container}>
        <div className="data-content" style={style.content}>
          <h2>Information About Your Algorithm</h2>
          <ul>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Data;
