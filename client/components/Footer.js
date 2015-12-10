/*
  Footer
*/

var React = require('react');

var Footer = React.createClass({
  render: function() {
    var style = {
      container: {
        width: '100vw',
        height: '5vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      content: {
        fontSize: '10px'
      }
    };

    return (
      <div className="footer" style={style.container}>
        <p style={style.content}>{ this.props.footer }</p>
      </div>
    )
  }
});

module.exports = Footer;
