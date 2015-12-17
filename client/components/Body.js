/*
  Body
*/

var React = require('react');
var $ = require('jquery');
var CodeMirror = require('./CodeMirror');
var Analysis = require('./Analysis');
var Modal = require('react-modal');

var Body = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      modalIsOpen: false,
      equation: ''
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

        console.log(equation);
        console.log(coords);

        this.setState({
          data: coords,
          equation: equation
        });
      }.bind(this),
      error: function(err) {
        console.error('Oups! You have a ' + err.status + ' error.' + err.responseText);
        this.setState({modalIsOpen: true});
      }.bind(this)
    });
  },

  render: function() {
    var style = {
      container: {
        backgroundColor: '#f8f8f8',
        color: 'rgb(33, 33, 33)',
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
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        position              : 'absolute',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'
      }
    }

    return (
      <div style={style.container}>
        <p id="intro-message" style={style.intro}>{ this.props.intro }</p>
        <CodeMirror getCode={this.getCode} />
        <Analysis data={this.state.data} equation={this.state.equation} />
        { this.state.modalIsOpen ?
          <div>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={styleModal} >
              <p>Error! You're function doesn't sort.</p>
              <button onClick={this.closeModal}>close</button>
            </Modal>
          </div> : <span />
        }
      </div>
    )
  }
});

module.exports = Body;
