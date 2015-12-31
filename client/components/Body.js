/*
  Body
*/

var React = require('react');
var Modal = require('react-modal');
var $ = require('jquery');
var CodeMirror = require('./CodeMirror');
var Analysis = require('./Analysis');

var Body = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      modalIsOpen: false,
      errMessage: '',
      equation: '',
      name: ''
    };
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  getCode: function(newCode) {
    $.ajax({
      type: 'POST',
      url: '/parse/integers',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({data: newCode}),
      success: function(data) {
        console.log('Incoming evaluation for ' + data.name);

        var coords = JSON.parse(data.coords);
        var equation = data.eq;
        var theta = data.bigO;
        var name = data.name;

        console.log(equation);
        console.log(coords);
        console.log(theta);

        this.setState({
          data: coords,
          equation: equation,
          theta: theta,
          name: name
        });
      }.bind(this),
      error: function(err) {
        console.error(err.responseText);

        this.setState({
          modalIsOpen: true,
          errMessage: err.responseText
        });
      }.bind(this)
    });
  },

  render: function() {
    var style = {
      container: {
        backgroundColor: '#f4f4f4',
        color: 'rgba(33, 33, 33, 0.8)',
        paddingTop: '13.4rem',
        paddingBottom: '7rem',
        paddingLeft: '30rem',
        paddingRight: '30rem',
      },
      intro: {
        fontSize: '2rem',
        paddingBottom: '4rem',
        textAlign: 'center'
      }
    };
    var styleModal ={
      overlay : {
        position          : 'fixed',
        zIndex            : 1000,
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.3)'
      },
      content : {
        position              : 'absolute',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        textAlign             : 'center',
        background                 : '#fffdfd',
        boxShadow                  : '0 0.25rem 0.4rem rgba(0, 0, 0, 0.24)',
        fontSize                   : '1.4rem',
        color                      : 'rgba(33, 33, 33, 0.8)',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '0.2rem',
        outline                    : 'none',
        padding                    : '2rem'
      },
      message: {
        marginBottom: '2rem'
      },
      button: {
        backgroundColor: '#a1a0a0',
        border: '1rem',
        borderRadius: '0.2rem',
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0 0.1rem 0.6rem, rgba(0, 0, 0, 0.239216) 0 0.1rem 0.4rem',
        color: '#fffdfd',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontSize: '1.4rem',
        fontWeight: 500,
        lineHeight: '3.6rem',
        marginTop: '1.6rem',
        outline: 'none',
        padding: '0 1.6rem',
        textTransform: 'uppercase',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }
    }

    return (
      <div style={style.container}>
        <p id="intro-message" style={style.intro}>{ this.props.intro }</p>
        <CodeMirror getCode={this.getCode} />
        { this.state.data.length ? <Analysis data={this.state.data} equation={this.state.equation} theta={this.state.theta} name={this.state.name} /> : <span /> }
        { this.state.modalIsOpen ?
          <div>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={styleModal}>
              <p style={styleModal.message}>{this.state.errMessage}</p>
              <button onClick={this.closeModal} style={styleModal.button}>close</button>
            </Modal>
          </div> : <span />
        }
      </div>
    )
  }
});

module.exports = Body;
