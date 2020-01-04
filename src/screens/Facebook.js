import React, {Component} from 'react';
import { Text, View, Image,KeyboardAvoidingView ,TouchableWithoutFeedback,Keyboard,TouchableOpacity} from 'react-native';
import Button from '../HelpComponents/Button';
import CardSection from '../HelpComponents/CardSection';
import Input from '../HelpComponents/Input';
import RadioForm from 'react-native-simple-radio-button';
import { f , auth , database } from '../../config/config';
import LoginScreen from './LoginScreen';
import RNPickerSelect from 'react-native-picker-select';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

class Facebook extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userDogName:"",
        gender:""
      };
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
                onChangeText={userDogName => this.setState({ userDogName })}
                />
            </CardSection>
            <Text></Text>
            <RadioForm
              style = {{marginLeft : 120}}
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              onPress={(value) => {gender => this.setState({value:value})}}
            />
            <RNPickerSelect
               onValueChange={(value) => console.log(value)}
               items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
                ]}
            />
            <Text></Text>
            <Text></Text>
            <TouchableOpacity style={styles.buttonContainer}
            onPress = {() =>  {this.CheckingDetails(this.state.userDogName)}}  >
                <Text style={styles.buttonText}>Create new account</Text>
            </TouchableOpacity>
         </View>  
        </KeyboardAvoidingView>
        </DismissKeyboard>
    );
    }
};