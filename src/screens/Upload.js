import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList} from 'react-native';
import { f , auth , database, storage } from '../../config/config';
class Upload extends Component{
    constructor(props){
        super(props);
    }
    
    signUserOut = () => {
      auth.signOut()
      .then(() => {
        console.log('Logged out...');
      }).catch((error) => {
        console.log('Error', error);
      });
      {this.props.navigation.navigate('First')}
    }
    render(){
      return(
        <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
          <Text>Upload</Text>
          <Button
            title="Log Out"
            onPress = { () => this.signUserOut()}>
            
          </Button>
        </View>
      )
    }
  }

  export default Upload;