import React, { Component } from 'react';
import { Text , TouchableOpacity , View ,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { f , auth , database } from '../../config/config';
import Button from '../HelpComponents/Button';
import Card from '../HelpComponents/Card';
import CardSection from '../HelpComponents/CardSection';
import Input from '../HelpComponents/Input';
import Logo from '../HelpComponents/Logo';
import * as Facebook from 'expo-facebook';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

class LoginScreen extends Component {
  state = { email: '', password: '', error: '', loading: false };

  constructor(props)
  {
    super(props);
    this.state = {
      loggedin: false
    };
    //this.registerUser('ttt@gmail.com', 'fffhhhhff');
    var that = this;    
    f.auth().onAuthStateChanged(function(user) {
      if(user){
        //Logged in
        that.setState({
          loggedin: true
        });
        console.log('Logged in', user);
      }
      else{
        //Logged out
        that.setState({
          loggedin: false
        });
        console.log('Logged out');
      }
    });
  }

  loginUser = async(email, pass) => {
    console.log(email)
    if(email != undefined && pass != undefined){
        try{
          let user = await auth.signInWithEmailAndPassword(email, pass);
          console.log(user);
        } catch(error){
          alert("Email Or Password is incorret ")
          console.log(error);
        }
    }
    else{
      //if they are empty
      alert("Missing email or password")
    }
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      user.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      user.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)      
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
    console.log("rrrrrrrrrrr")
    console.log(user.email)
  }

  async loginWithFacebook (){   
    console.log("yyyyyyyyyyyyyyyyyy")
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1027722400896035',
        { permissions: ['email', 'public_profile'] }
        
        
      );
      
      console.log("ttttttttttt")
      if(type === 'success'){
        console.log(f.auth.FacebookAuthProvider.arguments)
        console.log("ttttttttttt")
        const credentials = f.auth.FacebookAuthProvider.credential(token);
        f.auth().signInWithCredential(credentials).catch((error) => {
          console.log('Error...', error);
        })
      }

    }



  /*registerUser = (email, password) => {

    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((error) => console.log('error logging in', error));

  }

  signUserOut = () => {
    auth.signOut()
    .then(() => {
      console.log('Logged out...');
    }).catch((error) => {
      console.log('Error', error);
    });
  }*/

  /*renderButton() { // בתוך הפונקצייה החלטנו אם להראות ספינר או כפתור
    if (this.state.loading) {
      return <Spinner size = 'small' />;
    }

    return(
      <Button>
        Login 
      </Button>
    );
  }*/


  render() {
    
    return (
    <DismissKeyboard>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style = {{ flex : 1 ,justifyContent : 'center' , alignItems : 'stretch' }}>
        <Logo />
        { this.state.loggedin == true ? (
          this.props.navigation.navigate('Dashboard')
          
        ) : (
          <View>
            { this.state.emailloginView == true ? (
             <Card>
              <CardSection >
                <Input
                  placeholder="user@gmail.com"
                  lable="Email"
                  value = {this.state.email}
                  onChangeText = {email => this.setState({ email })}
                />
              </CardSection>
              <CardSection>
                <Input
                  secureTextEntry
                  placeholder="password"
                  lable="Password"
                  value = {this.state.password}
                  onChangeText = {password => this.setState({ password })}
                />
              </CardSection>
              <Text></Text>
              <TouchableOpacity style={styles.buttonContainer}
                onPress = { () => this.loginUser(this.state.email , this.state.password) }>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text></Text>
              <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <CardSection style={styles.forgotPassword}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.lableForgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </CardSection>
            </Card>
            ): (
              <View>
              
              </View>
            )}
            { this.state.emailloginView != true ? (
              <View>
                <TouchableOpacity style={styles.buttonContainer} 
                onPress = { () => this.setState({emailloginView: true})}>
                  <Text style={styles.buttonText}>Login with email</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity style={styles.buttonContainer} 
                onPress={() =>  this.loginWithFacebook()}>
                  <Text style={styles.buttonText}>Login with facebook</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>

              </View>
            )} 
          
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
    </DismissKeyboard>
     
    );
  }
}



const styles = {
  container:{
    flex:1,
    Backgroundcolor:'#3498db'
  },
  errorTextStyle: {
    fontSize:20,
    alignSelf: 'center',
    color: 'red'
  },
  forgotPassword: {
    title: 'Clear button',
    type: 'clear'
  },
  forgotPasswordText: {
    color : 'blue'
  },Background: {
    width: '0%',
    height: '50%',
    flex: 1 
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'black',
  },
  lableForgot: {
    color: '#1e90ff',
    fontWeight:'bold'
  },
  label: {
    color: 'gray'
  },
  buttonContainer: {
    backgroundColor : '#000000',
    paddingVertical: 10,
    borderRadius:50,
    width: 335,
    alignSelf:'center'
  },
  buttonText : {
    textAlign: 'center',
    color : '#FFFFFF',
    alignItems: 'stretch'
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
};

export default LoginScreen;