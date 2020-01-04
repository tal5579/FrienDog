import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList,TouchableOpacity,Image,TextInput} from 'react-native';
import { f , auth , database, storage  } from '../../config/config';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm from 'react-native-simple-radio-button';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
          loggedin: false ,
          photo_feed : [],
          refresh: false
        }
      }
    
    componentDidMount = () => {
      var that = this;
      f.auth().onAuthStateChanged(function(user){
        if(user){
          //logged in
          that.fetchUserInfo(user.uid);
          that.LoadFeed();
        }
        else{
          //not loggen in
          that.setState({
            loggedin: false
          });
        }
      });
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

    fetchUserInfo = (userId) => {
      var that = this;
      database.ref('users').child(userId).once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        //if(exists) data = snapshot.val();
          that.setState({
            username: snapshot.val().username,
            avatar: snapshot.val().avatar,
            gender: snapshot.val().gender,
            breed: snapshot.val().breed,
            userId: userId
          });
      });
    }

    editProfile = () => {
      this.setState({
        editingProfile:true
      })
    }

    saveProfile = () => {
      var username = this.state.username;
      var breed = this.state.breed;
      var gender = this.state.gender;

      if(username !== ''){
        database.ref('users').child(this.state.userId).child('username').set(username);
      }
      if(breed !== ''){
        database.ref('users').child(this.state.userId).child('breed').set(breed);
      }
      if(gender !== ''){
        database.ref('users').child(this.state.userId).child('gender').set(gender);
      }
      this.setState({editingProfile: false});
    }

  loadNew = () => {
      this.LoadFeed();
      /*this.setState({
          refresh: true
      });
      this.setState({
          photo_feed : [5,6,7,8,9],
          refresh: false
      });*/
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
      var userId = f.auth().currentUser.uid;
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
            <Image source = {{uri: this.state.avatar}} style = {{marginLeft : 10, width : 100, height: 100, borderRadius : 50}} />
            <View style = {{marginRight : 10 }}>
              <Text>{this.state.username}</Text>
              <Text>{this.state.breed}</Text>
              <Text>{this.state.gender}</Text>
            </View>
          </View>
          {this.state.editingProfile == true ? (
          <View style={{alignItems: 'center',justifyContent: 'center' ,paddingBottom: 20, borderBottomWidth: 1}}>
            <TouchableOpacity onPress= { () => this.setState({editingProfile: false})}>
              <Text style={{fontWeight: 'bold'}}>Cancel Editing</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text>Dog's Name:</Text>
            <TextInput 
              editable={true}
              placeholder={'Enter your User Name'}
              onChangeText={username => this.setState({username})}
              value={this.state.username}
              style={{width:250,marginVertical:10,padding:5,borderColor:'grey',borderWidth:1}}
            />
            <Text>Breed:</Text>
            <RNPickerSelect
                selectedValue={this.state.moreLessSelected}
                placeholder={{}}
                onValueChange={itemValue => this.setState({breed: itemValue })}
                style={styles.pickerStyle}
                items={selectBreed }/>
            <Text>Gender:</Text>
            <RadioForm
              style = {{marginLeft : 35}}
              radio_props={radio_props}
              initial={null}
              formHorizontal={true}
              onPress={gender => this.setState({gender:gender})}
              />
            <TouchableOpacity style= {{backgroundColor:'blue',padding:10}}
            onPress={ () => this.saveProfile()}>
              <Text style={{fontWeight:'bold',color:'white'}}>Save Changes</Text>
            </TouchableOpacity>
          </View>
          ) : (
          <View style={{paddingBottom: 20, borderBottomWidth: 1}}>
            <TouchableOpacity style={{marginTop: 10,marginHorizontal: 40,paddingVertical: 15,borderRadius: 20,borderColor: 'grey',borderWidth:1.5}}
             onPress = { () => this.signUserOut()}>
              <Text style={{textAlign: 'center',color:'grey'}}>LogOut</Text>
            </TouchableOpacity>            
            <TouchableOpacity style={{marginTop: 10,marginHorizontal: 40,paddingVertical: 15,borderRadius: 20,borderColor: 'grey',borderWidth:1.5}}
              onPress = { () => this.editProfile()}>
              <Text style={{textAlign: 'center',color:'grey'}}>Edit Profile</Text>
            </TouchableOpacity>      
            <TouchableOpacity style={{backgroundColor: 'grey',marginTop: 10,marginHorizontal: 40,paddingVertical: 35,borderRadius: 20,borderColor: 'grey',borderWidth:1.5}}
             onPress = { () => this.props.navigation.navigate('Upload')}>
              <Text style={{textAlign: 'center',color:'white'}}>Upload New +</Text>
            </TouchableOpacity>      
          </View>
          )}
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
  var radio_props = [
    {label: 'Female   ', value: 'Female' },
    {label: 'Male', value: 'Male' }
  ];

  const selectBreed = [
    {label: "Any", value: ''},
    {label: 'Affenpinscher', value: 'Affenpinscher'},
    {label: 'Afghan hound', value: 'Afghan hound'},
    {label: 'Airedale terrier', value: 'Airedale terrier'},
    {label: 'Akita', value: 'Akita'},
    {label: 'Alaskan Malamute', value: 'Alaskan Malamute'},
    {label: 'American Staffordshire terrier', value: 'American Staffordshire terrier'},
    {label: 'American water spaniel', value: 'American water spaniel'},
    {label: 'Australian cattle dog', value: 'Australian cattle dog'},
    {label: 'Australian shepherd', value: 'Australian shepherd'},
    {label: 'Australian terrier', value: 'Australian terrier'},
    {label: 'Basenji', value: 'Basenji'},
    {label: 'Basset hound', value: 'Basset hound'},
    {label: 'Beagle', value: 'Beagle'},
    {label: 'Bearded collie', value: 'Bearded collie'},
    {label: 'Bedlington terrier', value: 'Bedlington terrier'},
    {label: 'Bernese mountain dog', value: 'Bernese mountain dog'},
    {label: 'Bichon frise', value: 'Bichon frise'},
    {label: 'Black and tan coonhound', value: 'Black and tan coonhound'},
    {label: 'Bloodhound', value: 'Bloodhound'},
    {label: 'Border collie', value: 'Border collie'},
    {label: 'Border terrier', value: 'Border terrier'},
    {label: 'Borzoi', value: 'Borzoi'},
    {label: 'Boston terrier', value: 'Boston terrier'},
    {label: 'Bouvier des Flandres', value: 'Bouvier des Flandres'},
    {label: 'Boxer', value: 'Boxer'},
    {label: 'Briard', value: 'Briard'},
    {label: 'Brittany', value: 'Brittany'},
    {label: 'Brussels griffon', value: 'Brussels griffon'},
    {label: 'Bull terrier', value: 'Bull terrier'},
    {label: 'Bulldog', value: 'Bulldog'},
    {label: 'Bullmastiff', value: 'Bullmastiff'},
    {label: 'Cairn terrier', value: 'Cairn terrier'},
    {label: 'Canaan dog', value: 'Canaan dog'},
    {label: 'Chesapeake Bay retriever', value: 'Chesapeake Bay retriever'},
    {label: 'Chihuahua', value: 'Chihuahua'},
    {label: 'Chinese crested', value: 'Chinese crested'},
    {label: 'Chinese shar-pei', value: 'Chinese shar-pei'},
    {label: 'Chow chow', value: 'Chow chow'},
    {label: 'Clumber spaniel', value: 'Clumber spaniel'},
    {label: 'Cocker spaniel', value: 'Cocker spaniel'},
    {label: 'Collie', value: 'Collie'},
    {label: 'Curly-coated retriever', value: 'Curly-coated retriever'},
    {label: 'Dachshund', value: 'Dachshund'},
    {label: 'Dalmatian', value: 'Dalmatian'},
    {label: 'Doberman pinscher', value: 'Doberman pinscher'},
    {label: 'English cocker spaniel', value: 'English cocker spaniel'},
    {label: 'English setter', value: 'English setter'},
    {label: 'English springer spaniel', value: 'English springer spaniel'},
    {label: 'English toy spaniel', value: 'English toy spaniel'},
    {label: 'Eskimo dog', value: 'Eskimo dog'},
    {label: 'Finnish spitz', value: 'Finnish spitz'},
    {label: 'Flat-coated retriever', value: 'Flat-coated retriever'},
    {label: 'Fox terrier', value: 'Fox terrier'},
    {label: 'Foxhound', value: 'Foxhound'},
    {label: 'French bulldog', value: 'French bulldog'},
    {label: 'German shepherd', value: 'German shepherd'},
    {label: 'German shorthaired pointer', value: 'German shorthaired pointer'},
    {label: 'German wirehaired pointer', value: 'German wirehaired pointer'},
    {label: 'Golden retriever', value: 'Golden retriever'},
    {label: 'Gordon setter', value: 'Gordon setter'},
    {label: 'Great Dane', value: 'Great Dane'},
    {label: 'Greyhound', value: 'Greyhound'},
    {label: 'Irish setter', value: 'Irish setter'},
    {label: 'Irish water spaniel', value: 'Irish water spaniel'},
    {label: 'Irish wolfhound', value: 'Irish wolfhound'},
    {label: 'Jack Russell terrier', value: 'Jack Russell terrier'},
    {label: 'Japanese spaniel',value:'Japanese spaniel'},
    {label: 'Keeshond', value: 'Keeshond'},
    {label: 'Kerry blue terrier', value: 'Kerry blue terrier'},
    {label: 'Komondor', value: 'Komondor'},
    {label: 'Kuvasz', value: 'Kuvasz'},
    {label: 'Labrador retriever', value: 'Labrador retriever'},
    {label: 'Lakeland terrier', value: 'Lakeland terrier'},
    {label: 'Lhasa apso', value: 'Lhasa apso'},
    {label: 'Maltese', value: 'Maltese'},
    {label: 'Manchester terrier', value: 'Manchester terrier'},
    {label: 'Mastiff', value: 'Mastiff'},
    {label: 'Mexican hairless', value: 'Mexican hairless'},
    {label: 'Newfoundland', value: 'Newfoundland'},
    {label: 'Norwegian elkhound', value: 'Norwegian elkhound'},
    {label: 'Norwich terrier', value: 'Norwich terrier'},
    {label: 'Otterhound', value: 'Otterhound'},
    {label: 'Papillon', value: 'Papillon'},
    {label: 'Pekingese', value: 'Pekingese'},
    {label: 'Pitbull', value: 'Pitbull'},
    {label: 'Pointer', value: 'Pointer'},
    {label: 'Pomeranian', value: 'Pomeranian'},
    {label: 'Poodle', value: 'Poodle'},
    {label: 'Pug', value: 'Pug'},
    {label: 'Puli', value: 'Puli'},
    {label: 'Rhodesian ridgeback', value: 'Rhodesian ridgeback'},
    {label: 'Rottweiler', value: 'Rottweiler'},
    {label: 'Saint Bernard', value: 'Saint Bernard'},
    {label: 'Saluki', value: 'Saluki'},
    {label: 'Samoyed', value: 'Samoyed'},
    {label: 'Schipperke', value: 'Schipperke'},
    {label: 'Schnauzer', value: 'Schnauzer'},
    {label: 'Scottish deerhound', value: 'Scottish deerhound'},
    {label: 'Scottish terrier', value: 'Scottish terrier'},
    {label: 'Sealyham terrier', value: 'Sealyham terrier'},
    {label: 'Shetland sheepdog', value: 'Shetland sheepdog'},
    {label: 'Shih tzu', value: 'Shih tzu'},
    {label: 'Siberian husky', value: 'Siberian husky'},
    {label: 'Silky terrier', value: 'Silky terrier'},
    {label: 'Skye terrier', value: 'Skye terrier'},
    {label: 'Staffordshire bull terrier', value: 'Staffordshire bull terrier'},
    {label: 'Soft-coated wheaten terrier', value: 'Soft-coated wheaten terrier'},
    {label: 'Sussex spaniel', value: 'Sussex spaniel'},
    {label: 'Spitz', value: 'Spitz'},
    {label: 'Tibetan terrier', value: 'Tibetan terrier'},
    {label: 'Vizsla', value: 'Vizsla'},
    {label: 'Weimaraner', value: 'Weimaraner'},
    {label: 'Welsh terrier', value: 'Welsh terrier'},
    {label: 'West Highland white terrier', value: 'West Highland white terrier'},
    {label: 'whippet', value: 'Whippet'},
    {label: 'Yorkshire terrier', value: 'Yorkshire terrier'}
]

  const styles = {
    pickerStyle : {
      inputIOS: {
        color: 'black',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        marginLeft : 175,
        fontSize : 18
      }
  }
}
  export default Profile;