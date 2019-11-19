import React, { Component } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { f , auth , database } from '../../config/config';
import Button from '../HelpComponents/Button';
import Card from '../HelpComponents/Card';
import CardSection from '../HelpComponents/CardSection';
import Input from '../HelpComponents/Input';
import Logo from '../HelpComponents/Logo';



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
              
              <CardSection>
                <Button
                  onPress = { () => this.loginUser(this.state.email , this.state.password) }>
                  Login
                </Button>
              </CardSection>
              <CardSection>
                <View style={styles.row}>
                  <Text style={styles.label}>Don’t have an account? </Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={styles.link}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </CardSection>
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
            <CardSection>
              <Button
                onPress = { () => this.setState({emailloginView: true})}>
                Login With Email
              </Button>
            </CardSection>
            ) : (
              <View>

              </View>
            )} 
          </View>
        )}
      </View>
      
     
    );
  }
}



const styles = {
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
    color: 'gray',
  },
  lableForgot: {
    color: 'blue'
  },
  label: {
    color: 'gray'
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
};

export default LoginScreen;