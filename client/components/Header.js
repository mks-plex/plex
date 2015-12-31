/*
  Header
*/

var React = require('react');
var Tutorial = require('./Tutorial');

var Header = React.createClass({
  render: function() {
    var style = {
      mainNav: {
        alignItems: 'center',
        background: '#a1a0a0',
        borderRadius: '0px',
        boxShadow: '0 0.25rem 0.4rem rgba(0, 0, 0, 0.24)',
        color: '#ffffff',
        display: 'flex',
        fontSize: '2.6rem',
        fontWeight: 300,
        height: '64px',
        justifyContent: 'space-between',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 4
      },
      leftDiv: {
        width: '18rem',
      },
      icon: {
        paddingLeft: '3rem',
      },
      rightDiv: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '1.4rem',
        fontWeight: 500,
        justifyContent: 'space-between',
        textTransform: 'uppercase',
        width: '18rem'
      },
      link: {
        color: '#ffffff',
        fontSize: '2.4rem',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        textDecoration: 'none'
      }
    }

    return (
      <nav role="navigation" style={style.mainNav}>
        <div style={style.leftDiv}>
          <span style={style.icon}><i className="fa fa-line-chart"></i></span>
        </div>
        <span>{ this.props.header }</span>
        <div style={style.rightDiv}>
          <Tutorial />
          <a href="https://github.com/plexit/plex" target="_blank" style={style.link}>
            <i className="fa fa-github"></i>
          </a>
        </div>
      </nav>
    )
  }
});

module.exports = Header;
