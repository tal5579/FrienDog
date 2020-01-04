import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList,TouchableOpacity,Image} from 'react-native';
import { f , auth , database, storage  } from '../../config/config';
class DogProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
          loaded: false,
          photo_feed : [],
          refresh: false,
          loading:true
        }
      }
    
    checkParams = () => {
      var params = this.props.navigation.state.params;
      if(params){
        if(params.userId){
          this.setState({
            userId: params.userId
          });
          this.fetchUserInfo(params.userId);
        }
      }
    }

    fetchUserInfo = (userId) => {
      var that = this;

      database.ref('users').child(userId).child('username').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
          that.setState({username:data});
      }).catch(error => console.log(error));

      database.ref('users').child(userId).child('breed').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null); 
        if(exists) data = snapshot.val();
          that.setState({breed:data});
      }).catch(error => console.log(error));

      database.ref('users').child(userId).child('gender').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
          that.setState({gender:data});
      }).catch(error => console.log(error));

      database.ref('users').child(userId).child('avatar').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
          that.setState({avatar:data, loaded:true});
      }).catch(error => console.log(error));
    }

    componentDidMount = () => {
      this.checkParams();
      this.LoadFeed();
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

    loadNew = () => {
      this.LoadFeed();
  }

    //check if its singular or plural
    pluralCheck = (s) => {
      if(s==1){
          return ' ago';
      }
      else
          return 's ago';
  }

  //convert time
  timeConverter = (timestamp) => {
      var a= new Date(timestamp * 1000);
      var seconds = Math.floor((new Date()-a) /1000);

      var interval= Math.floor(seconds / 31536000);
      if(interval>=1){
          return interval + ' year' + this.pluralCheck(interval);
      }

      interval= Math.floor(seconds / 2952000);
      if(interval>=1){
          return interval + ' month' + this.pluralCheck(interval);
      }

      interval= Math.floor(seconds / 604800);
      if(interval>=1){
          return interval + ' week' + this.pluralCheck(interval);
      }

      interval= Math.floor(seconds / 86400);
      if(interval>=1){
          return interval + ' day' + this.pluralCheck(interval);
      }

      interval= Math.floor(seconds / 3600);
      if(interval>=1){
          return interval + ' hour' + this.pluralCheck(interval);
      }

      interval= Math.floor(seconds / 60);
      if(interval>=1){
          return interval + ' minute' + this.pluralCheck(interval);
      }

      return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
      

  }

  addToFlatList = (photo_feed, data, photo) => {
      var that = this;
      var photoObj = data[photo];
                  database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot){
                      const exists = (snapshot.val() !== null);
                      if(exists) data= snapshot.val();
                          photo_feed.push({
                              id: photo,
                              url: photoObj.url,
                              caption: photoObj.caption,
                              posted: that.timeConverter(photoObj.posted),
                              timestamp: photoObj.posted,
                              author: data,
                              authorId: photoObj.author
                          });

                          var myData = [].concat(photo_feed).sort((a,b) => a.timestamp < b.timestamp);

                          that.setState({
                              refresh: false,
                              loading: false,
                              photo_feed: myData
                          });
                  }).catch(error => console.log(error));
  }

  LoadFeed = () => {
      this.setState({
          refresh:true,
          photo_feed:[]
      });
      var that=this;
      var userId = this.props.navigation.state.params.userId;
      database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
          var photo_feed = that.state.photo_feed;
          for(var photo in snapshot.val()){
            var photoObj = snapshot.val()[photo];
            if(photoObj.author == userId)
              that.addToFlatList(photo_feed, snapshot.val(), photo)
          }
      }).catch(error => console.log(error));
  }

    render(){
      return(
        <View style = {{flex : 1}}>
          <View style={{flexDirection: 'row',height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey',borderBottomWidth:0.5,justifyContent:'center',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity style={{width:100}}
            onPress={() => this.props.navigation.goBack()}>
              <Text style={{fontSize:18,fontWeight:'bold',paddingLeft:10}}>Go Back</Text>
            </TouchableOpacity>
            <Text style={{fontSize:16}}>DogProfile</Text>
            <Text style={{width:100}}></Text>
          </View>
          <View style= {{justifyContent : 'space-evenly', alignItems : 'center', flexDirection : 'row', paddingVertical : 10}}>
            <Image source = {{uri: this.state.avatar}} style = {{marginLeft : 10, width : 100, height: 100, borderRadius : 50}} />
            <View style = {{marginRight : 10 }}>
              <Text>{this.state.username}</Text>
              <Text>{this.state.breed}</Text>
              <Text>{this.state.gender}</Text>
            </View>
          </View>
          <FlatList 
                refreshing={this.state.refresh}
                onRefresh={this.loadNew}
                data={this.state.photo_feed}
                keyExtractor={(item, index) =>  index.toString()}
                style={{flex:1 , backgroundColor: '#eee'}}
                renderItem={({item,index}) => (
                    <View key= {index} style={{width : '100%', overflow: 'hidden',marginBottom: 5, justifyContent: 'space-between',borderBottomWidth: 4,borderColor: 'hidden'}}>
                        <View style={{padding: 5,width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>{item.posted}</Text>
                            <TouchableOpacity 
                            onPress ={ () => this.props.navigation.navigate('DogProfile',{userId:item.authorId}) } >
                                <Text>{item.author}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image source={{uri: item.url}} 
                                style={{resizeMode: 'cover', width: '100%', height: 275}}/>
                        </View>
                        <View style ={{padding: 5}}>
                            <Text>{item.caption}</Text>
                            <TouchableOpacity onPress = { () => this.props.navigation.navigate('Comments',{photoId:item.id})}>
                                <Text style={{color: 'grey',marginTop: 10,textAlign:'center'}}>[ View comments ]</Text>
                            </TouchableOpacity>
                        </View>
                    </View>            

                )}  
            />
        </View>
      )
    }
  }

  export default DogProfile;