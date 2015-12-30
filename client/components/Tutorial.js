/*
  Tutorial Instructions
*/

var React = require('react');
var Modal = require('react-modal');
 
var TutorialModal = React.createClass({
 
  getInitialState: function() {
    return { modalIsOpen: false };
  },  
  //   if(!window.localStorage && !window.localStorage.isReturningVisitor){
  //     // return window.setTimeout(function(){
  //       return { modalIsOpen: true };
  //    // }, 3000);
  //   } else {
  //     return { modalIsOpen: false };
  //   }
  // },
 
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
 
  render: function() {
    var style = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.5)'
      },
      content : {
        position                   : 'absolute',
        // top                        : '40px',
        // left                       : '40px',
        // right                      : '40px',
        // bottom                     : '40px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width                 : '700px',
        heigth                : '500px',
        transform             : 'translate(-50%, -50%)'
      }
    }
    return (
      <div>
        <span className="btn-tutorial" onClick={this.openModal}>about</span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={style} className="modal-tutorial" >
 
          <h2>About</h2>
          <form>
            <p> Insert your alogorithm wrapped into one function in the code mirror</p>
            <p> Click the Plex it button </p>
            <p> Check the graph so see a visual representation  of your alogorithm </p>
            <p> Check the information box to get more useful information about your alogorithm </p>
          </form>
          <button onClick={this.closeModal}>Got it</button>
        </Modal>
      </div>
    );
  }
});

module.exports = TutorialModal;
