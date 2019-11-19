import React,{ Component } from 'react';
import { Text, View  } from 'react-native';
import { f , auth , database, storage  } from '../../config/config';
import Button from '../HelpComponents/Button';
import CardSection from '../HelpComponents/CardSection';
import Input from '../HelpComponents/Input';
import Card from '../HelpComponents/Card';
import Logo from '../HelpComponents/Logo';


class ForgotPasswordScreen extends Component{
    state = { email: ''}
   
    render(){
      return(
        <View style = {{ flex : 1 ,justifyContent : 'center' , alignItems : 'stretch' }}>
            <Logo />
            <Text style={{fontSize:18,marginLeft:27,fontWeight: 'bold'}}>Please enter your email:</Text>
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
                    <Button
                        onPress = { () => this.props.navigation.navigate('Login'),
                                     () => this.Userexist(this.state.email)  }>
                        Send to email 
                    </Button>
                </CardSection>
            </Card>
        </View>
      )
    }

    Userexist = async(email) => {
        if(email != undefined){
            try{
              let user = await auth.fetchSignInMethodsForEmail(email);
              this.forgotPassword(email)
            } catch(error){
              alert("Email is incorret ")
              console.log(error);
            }
        }
      }

    //פונקציה שמקבלת אימייל ושולחת איפוס סיסמא
    forgotPassword = (yourEmail) => {
        f.auth().sendPasswordResetEmail(yourEmail)
          .then(function (user) {
            alert('Please check your email...')
          }).catch(function (e) {
            console.log(e)
          })
      }
  }
  
export default ForgotPasswordScreen;