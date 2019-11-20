import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList,TouchableOpacity,Image} from 'react-native';
import { f , auth , database, storage  } from '../../config/config';
class Profile extends Component{
    constructor(props){
        super(props);
        /*this.state = {
          loggedin: false */
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
            <Text>Profile</Text>
          ) : (
          //not logged in
          <View>
            <Text>You are not logged in</Text>
            <Text>Please login to view your profile</Text>
          </View>
          )}
        </View>*/
        <View style = {{flex : 1}}>
          <View style= {{justifyContent : 'space-evenly', alignItems : 'center', flexDirection : 'row', paddingVertical : 10}}>
            <Image source = {{uri: 'https://api.adorable.io/avatars/285/test@user.i.png'}} style = {{marginLeft : 10, width : 100, height: 100, borderRadius : 50}} />
            <View style = {{marginRight : 10 }}>
              <Text>Name</Text>
              <Text>@username</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  export default Profile;