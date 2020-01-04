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
import Chat from './src/screens/Chat';
import { Ionicons } from '@expo/vector-icons';
import FirstScreen from './src/screens/FirstScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import { f , auth , database } from './config/config';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import Comments from './src/screens/Comments';
import DogProfile from './src/screens/DogProfile';
import MatchScreen from './src/screens/MatchScreen';
import ShopScreen from './src/screens/ShopScreen';
import VetScreen from './src/screens/VetScreen';





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
          <Ionicons name="md-camera" size={32} style = {{paddingLeft : 10 }}
          onPress = { () => navigation.navigate("Upload")}/>
        ),
        headerRight: (
          <Ionicons name="md-paper-plane" size={32} style = {{paddingRight : 10 }}
          onPress = { () => navigation.navigate("Chat")}/>
        )
      }
    }
  },
  DogProfile : {screen : DogProfile , navigationOptions : ({navigation}) => {
    return {
      header:null,
      /*headerLeft : (
        <Button 
        title = "Go back"
        onPress = { () => navigation.goBack()}> 
        </Button>
        )*/
      }
  }},

  Upload : {screen : Upload , navigationOptions : ({navigation}) => {
    return {
      headerTitle : null,
      headerLeft : (
        <Ionicons name="md-arrow-back" size={32} style = {{paddingLeft : 10 }} onPress = { () => navigation.goBack()}/>
      )
    }
  }},

  Chat : {screen : Chat , navigationOptions : ({navigation}) => {
    return {
      headerTitle : null,
      headerLeft : (
        <Ionicons name="md-arrow-back" size={32} style = {{paddingLeft : 10 }} onPress = { () => navigation.goBack()}/>
      )
    }
  }},

  Comments : {screen : Comments , navigationOptions : ({navigation}) => {
    return {
      header: null,
      headerTitle : () => <LogoTitle />,
      headerLeft : (
        <Ionicons name="md-arrow-back" size={32} style = {{paddingLeft : 10 }} onPress = { () => navigation.goBack()}/>
      )
    }
  }},

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
        headerRight: (
          <Ionicons name="md-cog" size={32} style = {{paddingRight : 10 }}/>
        )
      }
    }
  }
});

const MatchScreenStack = createStackNavigator({
  MatchScreen:{
    screen : MatchScreen,
    navigationOptions: ({navigation}) => {
      return{
        headerTitle: 'MatchScreen',
        headerRight: (
          <Ionicons name="md-cog" size={32} style = {{paddingRight : 10 }}/>
        )
      }
    }
  }
});

const ShopScreenStack = createStackNavigator({
  ShopScreen:{
    screen : ShopScreen,
    navigationOptions: ({navigation}) => {
      return{
        headerTitle: 'ShopScreen',
        headerRight: (
          <Ionicons name="md-cog" size={32} style = {{paddingRight : 10 }}/>
        )
      }
    }
  }
});

const VetScreenStack = createStackNavigator({
  VetScreen:{
    screen : VetScreen,
    navigationOptions: ({navigation}) => {
      return{
        headerTitle: 'VetScreen',
        headerRight: (
          <Ionicons name="md-cog" size={32} style = {{paddingRight : 10 }}/>
        )
      }
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home : {
      screen: FeedStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={32}/>
        )
      }

    },

    Match : {
      screen: MatchScreenStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-bed" size={32}/>
        )
      }

    },

    Vet : {
      screen: VetScreenStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-medkit" size={32}/>
        )
      }

    },

    Shop : {
      screen: ShopScreenStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-cart" size={32}/>
        )
      }

    },

    Profile : {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-paw" size={32}/>
        )
      }
    }
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
          <Ionicons name="md-menu" size={32} style = {{paddingLeft : 10 }}/>
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
          <Ionicons name="md-arrow-back" size={32} style = {{paddingLeft : 10 }} onPress = { () => navigation.navigate('First')}/>
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
          <Ionicons name="md-arrow-back" size={32} style = {{paddingLeft : 10 }} onPress = { () => navigation.navigate('First')}/>
        )
      }
    }}
  }
)

/*const AppDrawerNavigator = createDrawerNavigator({
  Dashboard : {screen : DashboardStackNavigator}
})*/

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
          <Ionicons name="md-arrow-back" size={32} style = {{paddingLeft : 10 }} onPress = { () => navigation.navigate('Login')}/>
        )
      }
    }}
  }
)


const AppSwitchNavigator = createSwitchNavigator(
  {
    First: {screen : FirstStackNavigator },
    Dashboard : {screen : DashboardStackNavigator},
    //
    Login : {screen : LoginStackNavigator },
    SignUp : {screen : SignUpStackNavigator},
    ForgotPasswordScreen : {screen : ForgotPasswordStackNavigator},
    Comments : {screen : DashboardStackNavigator},
    //
    Dog : {screen : DashboardStackNavigator}, 
    Upload : {screen : DashboardStackNavigator},
    Chat : {screen : DashboardStackNavigator}


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