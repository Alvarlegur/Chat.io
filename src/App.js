import React from 'react';
import SocketContext from './contexts/SocketContext';
import ChatWindow from './components/ChatWindow';


class App extends React.Component {
  componentDidMount() {
    const { socket } = this.context;
    socket.on('adduser', userList => {
      console.log('userList',userList);
      this.setState({users: userList });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  render(){
    const {users} = this.state;
    console.log('users',users);
    return (
      <div>
        <ChatWindow users={users} />
      </div>
    );
  }
};

App.contextType = SocketContext;

export default App;
