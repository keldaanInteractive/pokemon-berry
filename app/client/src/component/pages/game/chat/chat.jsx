import React from 'react';
import ChatHistory from './chat-history';
import Draggable from 'react-draggable';
import "nes.css/css/nes.min.css";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var windowStyles = {
      position:'absolute',
      bottom:'70px',
      left:'20px',
      maxWidth: '600px',
      width: '600px',
      maxHeight: '150px',
      height: '150px',
      margin: '5px',
      backgroundColor: 'rgba(255, 255, 255, .7)'
   };
   

   var formStyles = {
      display: 'flex',
      width: '100%',
      position: 'absolute',
      bottom: '-60px',
      left: '0px'
   };
   
    return(
      <Draggable>
        <div style={windowStyles}>
            <ChatHistory messages={this.props.messages}/>
            <form style={formStyles} onSubmit={this.props.handleSubmit}>
              <div className="nes-field" style={{width: '80%'}}>
                <input id="name_field" type="text" className="nes-input" onChange={this.props.setCurrentText} value={this.props.currentText} />
              </div>
              
              <button className="nes-btn is-primary" style={{width: '20%'}}>Send</button>
            </form>
        </div>
      </Draggable>
    );
  }
}