import React from 'react';
import { Text, View , Image , TouchableOpacity} from 'react-native';


const FirstScreen = props => {
    
  
    const { container, ImageStyle, title, formContainer, buttonContainer , buttonText } = styles;
    return (
      
      <View style={container}> 
          <Text style={title}> Welcome to FrienDog</Text>
          <Image
              style= {ImageStyle}
              source= {require('../../assets/dog.jpg')} />
          <View style={formContainer}>
            <TouchableOpacity 
            onPress = {() => props.navigation.navigate('Login')}
            style={buttonContainer}>
            <Text style={buttonText}>Login</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity 
            onPress = {() => props.navigation.navigate('SignUp')}
            style={buttonContainer}>
            <Text style={buttonText}>SignUp</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
          </View>
      </View>   
    )
  
};


const styles = {
  container: {
      flex: 1,
      backgroundColor: '#000000' ,
      alignItems: 'center',
      justifyContent: 'center'
  },
  ImageStyle : {
      height : 450,
      width : 415
  },
  title: {
      alignItems: 'center',
      color: '#FFFFFF',
      fontSize: 30,
      fontWeight: 'bold'
  },
  formContainer : {
    padding: 20,
    alignItems: 'stretch',
    width: 415
  },
  buttonText : {
      textAlign: 'center',
      color : '#000000',
      alignItems: 'stretch'
  },
  buttonContainer: {
      backgroundColor : '#ffffff',
      paddingVertical: 10,
      borderRadius:50
  }
};

export default FirstScreen;