import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList} from 'react-native';
import { f , auth , database, storage } from '../../config/config';
class Upload extends Component{
    constructor(props){
        super(props);
       /* this.state = {
          loggedin: false*/
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

    /*componentDidMount = () => {
      var that = this;
      f.auth().onAuthStateChanged(function(user){
        if(user){
          //logged in
          that.setState({
            loggedin: true
          });
        }
        else{
          //not loggen in
          that.setState({
            loggedin: false
          });
        }
      });
    }*/

    render(){
      return(
        /*הההתחברות שאנחנו לא צריכים
        <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
           {this.state.loggedin == true ?(
            <Text>Upload</Text>
          ) : (
          //not logged in
          <View>
            <Text>You are not logged in</Text>
            <Text>Please login to upload a photo</Text>
          </View>
          )}
        </View>*/
        <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
          <Text> Upload</Text>
          <Button
            title="Log Out"
            onPress = { () => this.signUserOut()}>
            
          </Button>
        </View>
      )
    }
  }

  export default Upload;