import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList} from 'react-native';
import { f , auth , database, storage } from '../../config/config';
import { GiftedChat } from "react-native-gifted-chat";

class Chat extends Component {
    constructor(props){
        super(props);
    }
    state = {
        messages: []
    };

    render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={(message) => {
                //send message to your backend
            }}
            user={{
                _id: 1,
            }}
          />
        );
      }
}

export default Chat;