import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList} from 'react-native';
import { f , auth , database, storage } from '../../config/config';
class VetScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
          <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
            <Text> VetScreen</Text>
          </View>
        )
      }
}

export default VetScreen;