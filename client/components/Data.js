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
        margin: '5rem',
        marginTop: '6rem',
        background: '#fffdfd',
        boxShadow: '0 0.25rem 0.4rem rgba(0, 0, 0, 0.24)',
        position: 'absolute',
        right: '65rem',
        height: '20rem'
      },
      content: {
        padding: '1rem',
        textAlign: 'center',
        fontSize: '1.4rem'
      },
      heading: {
        fontSize: '1.9rem',
        marginBottom: '1rem'
      },
      section: {
        marginBottom: '0.8rem'
      },
      analytics: {
        fontWeight: 'bold'
      }
    };

    return (
      <div className="data-container" style={style.container}>
        <div className="data-content" style={style.content}>
          <h2 style={style.heading}>Information About Your Algorithm</h2>
          <p style={style.section}>
            The Big O Time Complexity is approximately:
            <br />
            <span style={style.analytics}>{this.props.theta}</span>
          </p>
          <p style={style.section}>
            The line of best fit has the equation:
            <br />
            <span style={style.analytics}>{this.props.equation}</span>
          </p>
          <ul>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Data;
