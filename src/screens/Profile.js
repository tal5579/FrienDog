import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList} from 'react-native';
import { f , auth , database, storage  } from '../../config/config';
class Profile extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
      return(
        <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
          <Text>Profile</Text>
        </View>
      )
    }
  }

  export default Profile;