/*
  Footer
*/

var React = require('react');

var Footer = React.createClass({
  render: function() {
    var style = {
      container: {
        alignItems: 'center',
        backgroundColor: '#a1a0a0',
        boxShadow: '0 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5.2rem 2.4rem',
        textAlign: 'center'
      },
      content: {
        color: 'rgba(255, 255, 255, 0.94)',
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
        <a href="https://github.com/plexit/plex" target="_blank" style={style.link}>
          <i className="fa fa-github"></i>
        </a>
      </div>
    )
  }
});

module.exports = Footer;
