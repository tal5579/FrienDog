import React, {Component} from 'react';
import { Text, View, Image,KeyboardAvoidingView ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Button from '../HelpComponents/Button';
import CardSection from '../HelpComponents/CardSection';
import Input from '../HelpComponents/Input';
import { f , auth , database } from '../../config/config';
import LoginScreen from './LoginScreen';
import CreateUser from './CreateUser';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName:"",
      ownerName:"",
      email: "",
      password: "",
      confirmPass: ""
    };
  }

  CheckingDetails = (dogName,ownerName,email ,password , confirmPass) => {
    if( dogName =='' || ownerName =='' || email =='' || password =='' || confirmPass =='')
    {
        alert("Missing Details")
    }
    else{
        if( password == confirmPass && password != '')
        {
            if(this.registerUser(this.state.email, this.state.password ) == true ){
                this.props.navigation.navigate('CreateUser')
            }
            else{
                this.props.navigation.navigate('SignUp')
            }
        }
        else{
        alert(" Password doesn't match ")
        this.props.navigation.navigate('SignUp')
        }
    }
   
  }
  registerUser = (email, password ) => {

    console.log(email, password);
      auth.createUserWithEmailAndPassword(email, password)
      .then((userObj) => this.props.navigation.navigate('CreateUser'))
      .catch(error => {
        
        switch (error.code) {
            case 'auth/email-already-in-use':
              alert(" Email already in use.")
              break
              //console.log(`Email address ${this.state.email} already in use.`);
            case 'auth/invalid-email':
              alert(" Email is invalid.")
              break
            
              //console.log(`Email address ${this.state.email} is invalid.`);
           //case 'auth/operation-not-allowed':
             // alert(" Email is invalid.")
              //console.log(`Error during sign up.`);
           //case 'auth/weak-password':
             //console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
           default:
              alert(" Password is not strong enough.")
              break
             //console.log(error.message);
         }
         return false
         
     })
    
    

  }
  render() {
    return (
    <DismissKeyboard>
    <KeyboardAvoidingView behavior="padding" style={styles.container2}>
      <View>
            <Image
                style={styles.logo}
                source={require('../../assets/SignUp.jpeg')}/>
            <CardSection >
              <Input
                placeholder= "Dog's Name"
                lable="Dog's Name :"
                onChangeText={dogName => this.setState({ dogName })}
              />
            </CardSection>
            <CardSection >
              <Input
                placeholder= "Owner's Name"
                lable="Owner's Name :"
                onChangeText={ownerName => this.setState({ ownerName })}
              />
            </CardSection>
            <CardSection >
              <Input
                placeholder="user@gmail.com"
                lable="Email :"
                onChangeText={email => this.setState({ email })}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                placeholder= {"Password"}
                lable="Password :"
                onChangeText={password => this.setState({ password })}
              />
            </CardSection>
            <CardSection>
              <Input 
                secureTextEntry
                placeholder="Confirm Password"
                lable="Confirm Pass :"
                onChangeText={confirmPass => this.setState({ confirmPass })}
              />
            </CardSection>
            <CardSection>
              
              <Button 
              onPress = {() =>  {this.CheckingDetails(this.state.dogName,this.state.ownerName,this.state.email ,this.state.password , this.state.confirmPass)}}
              >
                Enter
              </Button>
            </CardSection>
      </View>  
    </KeyboardAvoidingView>
    </DismissKeyboard>
    );
    }
};

const styles = {
  logo: {
    width:400,
    height:300
    },
    container: {
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    container2:{
      flex:1,
      Backgroundcolor:'#3498db'
    }
  }
export default SignUpScreen;