import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button,Image} from 'react-native';
import { createStackNavigator   } from 'react-navigation-stack';
import { createAppContainer , createSwitchNavigator   } from 'react-navigation';
import {  createDrawerNavigator } from 'react-navigation-drawer';
import { createTabNavigator , createBottomTabNavigator} from 'react-navigation-tabs';
//
import Feed from './src/screens/Feed';
import Profile from './src/screens/Profile';
import Upload from './src/screens/Upload';
import Icon from '@expo/vector-icons/Ionicons';
import FirstScreen from './src/screens/FirstScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import { f , auth , database } from './config/config';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import CreateUser from './src/screens/CreateUser';




class App extends Component{
  render(){
    return(
      <AppContainer />
    )
  }
}

export default App;

/*class FirstScreen extends Component{
  render(){
    return(
      <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
        <Button 
          onPress = {() => this.props.navigation.navigate('Dashboard')}
          title = "Login">
        </Button>
        <Button 
          onPress = {() => this.props.navigation.navigate('Dashboard')}
          title = "SignUp">
        </Button>
        
      </View>
    )
  }
}*/
class DashboardScreen extends Component{
  render(){
    return(
      <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    )
  }
}

const Detail = props => (
  <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
    <Text>Detail</Text>
  </View>
);

const FeedStack = createStackNavigator({
  Feed:{
    screen : Feed,
    navigationOptions: ({navigation}) => {
      return{
        headerTitle: 'Feed',
        headerLeft: (
          <Icon
          style = {{paddingLeft : 10 }}
          onPress = { () => navigation.openDrawer()}
          name = "md-menu"
          size = {30} />
        )
      }
    }
  },
  Detail: {
    screen: Detail
  } 
  
  },{
    defaultNavigationOptions: {
      gesturesEnabled : false
    }
});


const ProfileStack = createStackNavigator({
  Profile:{
    screen : Profile,
    navigationOptions: ({navigation}) => {
      return{
        headerTitle: 'Profile',
        headerLeft: (
          <Icon
          style = {{paddingLeft : 10 }}
          onPress = { () => navigation.openDrawer()}
          name = "md-menu"
          size = {30} />
        )
      }
    }
  },

});

const Images = [src='./', 'uri 2', 'uri 3', 'uri 4']

const UploadStack = createStackNavigator({
  Upload:{
    screen : Upload,
    navigationOptions: ({navigation}) => {
      return{
        headerTitle: 'Upload',
        headerLeft: (
          <Icon
          style = {{paddingLeft : 10 }}
          onPress = { () => navigation.openDrawer()}
          name = "md-menu"
          size = {30} />
        )
      }
    }
  },

});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    UploadStack,
    ProfileStack
  },
  { 
    navigationOptions: ({navigation}) => {
      const { routeName } = navigation.state.routes
      [navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
)


const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator : DashboardTabNavigator
  },
  {
    defaultNavigationOptions : ({navigation}) => {
      return {
        headerLeft :(
          <Icon
            style = {{paddingLeft : 10 }}
            onPress = { () => navigation.openDrawer()}
            name = "md-menu"
            size = {30} />
        ) 
      }
    }
  },
  
)

//  הוספתי בגלל הכפתור חזרה 
const LoginStackNavigator = createStackNavigator (
  {
    Login : {screen : LoginScreen , navigationOptions : ({navigation}) => {
      return {
        headerTitle : () => <LogoTitle />,
        headerLeft : (
          <Button 
          title = "Go back"
          onPress = { () => navigation.navigate('First')}> 
          </Button>
        )
      }
    }}
  }
)
//  הוספתי בגלל הכפתור חזרה 
const SignUpStackNavigator = createStackNavigator (
  {
    
    SignUp : {screen : SignUpScreen , navigationOptions : ({navigation}) => {
      return {
        headerTitle : () => <LogoTitle />,
        headerLeft : (
          <Button 
          title = "Go back"
          onPress = { () => navigation.navigate('First')}> 
          </Button>
        )
      }
    }}
  }
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard : {screen : DashboardStackNavigator}
})

// הוספתי בשביל הכותרת למסך הראשי
const FirstStackNavigator = createStackNavigator (
  {
    First : {screen : FirstScreen , navigationOptions : () => ({
      headerTitle : () => <LogoTitle />
      //title : 'Welcome'
    }),
  }
}
)

class LogoTitle extends Component {
  render(){
    return (
      <Image
        source={require('./assets/friendogWhite.jpeg')}
        style={{ width: 130, height: 45}}
      />
    )
  }
}

const ForgotPasswordStackNavigator = createStackNavigator (
  {
    ForgotPasswordScreen : {screen : ForgotPasswordScreen , navigationOptions : ({navigation}) => {
      return {
        headerTitle : () => <LogoTitle />,
        headerLeft : (
          <Button 
          title = "Go back"
          onPress = { () => navigation.navigate('Login')}> 
          </Button>
        )
      }
    }}
  }
)

const CreateUserStackNavigator = createStackNavigator (
  {
    CreateUser : {screen : CreateUser , navigationOptions : ({navigation}) => {
      return {
        headerTitle : () => <LogoTitle />,
        headerLeft : (
          <Button 
          title = "Go back"
          onPress = { () => navigation.navigate('Login')}> 
          </Button>
        )
      }
    }}
  }
)

const AppSwitchNavigator = createSwitchNavigator(
  {
    First: {screen : FirstStackNavigator },
    Dashboard : {screen : AppDrawerNavigator},
    //
    Login : {screen : LoginStackNavigator },
    SignUp : {screen : SignUpStackNavigator},
    ForgotPasswordScreen : {screen : ForgotPasswordStackNavigator},
    CreateUser : {screen : CreateUserStackNavigator}
  }
  
)

const AppContainer = createAppContainer(AppSwitchNavigator);

/*const navigator = createStackNavigator(
  {
    First : FirstScreen,
    Login : LoginScreen,
    SignUp : SignUpScreen
  },
  {
    initialRouteName : 'First',
    defaultNavigationOptions: {
      title: 'yonatan1'
    }
  }
);

export default createAppContainer(navigator);*/