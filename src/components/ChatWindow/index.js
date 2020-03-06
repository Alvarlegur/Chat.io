import React from 'react';
import SocketContext from '../../contexts/SocketContext';

class ChatWindow extends React.Component {
  componentDidMount() {
    const {socket} = this.context;
    socket.on('message', message => {
      const {messages} = this.state;
      this.setState({messages: [...messages, message]});
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      messages: [], //list of all messages
      message: '', //current message
    };
  }

  sendMessage(message) {
    const { socket } = this.context;
    if(message === '') {return false;}
    socket.emit('sendmsg', message);
    this.setState({message: ''});
  }
  render() {
    const { messages, message } = this.state;
    const { users } = this.props;
    console.log('users',users);
    console.log('messages',messages);
    return (
      <div className="chat-window">
        <ChatWindow.Title />
        <ChatWindow.Messages messages={messages} />
        <ChatWindow.Users users={users} />
        <div className="input-container">
          <input type="text" value={ message } onChange={e => this.setState({ message: e.target.value})} placeholder="enter your message here" />
          <button type="button" onClick={() => this.sendMessage(message)}>Send</button>
        </div>
      </div>
    )
  }
};

ChatWindow.Title = () => (
  <h3>
    Chat.io
  </h3>
);

ChatWindow.Messages = (props) => (
  <div className="messages">
    {props.messages.map(n => <div key={n} className="message"> {n}</div>)}
  </div>
);

ChatWindow.Users = props => (
  <div>
  {props.users.map(i => <div key={i} className="user">{i}</div> )}
  </div>
);

ChatWindow.contextType = SocketContext;

export default ChatWindow;
