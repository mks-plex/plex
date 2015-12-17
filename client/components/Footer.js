/*
  Footer
*/

var React = require('react');

var Footer = React.createClass({
  render: function() {
    var style = {
      container: {
        alignItems: 'center',
        backgroundColor: 'rgb(33, 33, 33)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6.2rem 2.4rem',
        textAlign: 'center'
      },
      content: {
        color: 'rgba(255, 255, 255, 0.54)',
        fontSize: '1.5rem',
        lineHeight: '2.4rem',
        maxWidth: '33.5rem'
      },
      link: {
        color: 'rgba(255, 255, 255, 0.87)',
        height: '4.8rem',
        fontSize: '2.4rem',
        padding: '1.2rem',
        width: '4.8rem'
      }
    };

    return (
      <div className="footer" style={style.container}>
        <p style={style.content}>{ this.props.footer }</p>
        <a href="https://github.com/plexit/plex" style={style.link}>
          <i className="fa fa-github"></i>
        </a>
      </div>
    )
  }
});

module.exports = Footer;
