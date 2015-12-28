/*
  Data
*/

var React = require('react');

var Data = React.createClass({
  render: function() {
    // var dataPoints = this.props.data.map(function(pair) {
    //   return (
    //     <Pair x={pair.x_axis} y={pair.y_axis} />
    //   );
    // });

    var style = {
      container: {
        margin: 50,
        width: '30vw',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1
      },
      content: {
        padding: '10px',
        textAlign: 'center'
      },
      equation: {
        fontWeight: 'bold'
      }
    };

    return (
      <div className="data-container" style={style.container}>
        <div className="data-content" style={style.content}>
          <h2>Information About Your Algorithm</h2>
          <p>
            The line of best fit has the equation:
            <br />
            <span style={style.equation}>{this.props.equation}</span>
          </p>
          <ul>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Data;
