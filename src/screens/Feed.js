import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList,Image} from 'react-native';
import { f , auth , database, storage } from '../../config/config';
class Feed extends Component{
    constructor(props){
        super(props);
        this.state= {
            photo_feed : [],
            refresh: false,
            loading:true
        }
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

    componentDidMount = () => {
        //loadfeed
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
        if(interval>1){
            return interval + ' year' + this.pluralCheck(interval);
        }

        interval= Math.floor(seconds / 2952000);
        if(interval>1){
            return interval + ' month' + this.pluralCheck(interval);
        }

        interval= Math.floor(seconds / 604800);
        if(interval>1){
            return interval + ' week' + this.pluralCheck(interval);
        }

        interval= Math.floor(seconds / 86400);
        if(interval>1){
            return interval + ' day' + this.pluralCheck(interval);
        }

        interval= Math.floor(seconds / 3600);
        if(interval>1){
            return interval + ' hour' + this.pluralCheck(interval);
        }

        interval= Math.floor(seconds / 60);
        if(interval>1){
            return interval + ' minute' + this.pluralCheck(interval);
        }

        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
        

    }
    LoadFeed = () => {
        this.setState({
            refresh:true,
            photo_feed:[]
        });
        var that=this;
        database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                var photo_feed = that.state.photo_feed;
                for(var photo in data){
                    var photoObj = data[photo];
                    database.ref('users').child(photoObj.author).once('value').then(function(snapshot){
                        const exists = (snapshot.val() !== null);
                        if(exists) data= snapshot.val();
                            photo_feed.push({
                                id: photo,
                                url: photoObj.url,
                                caption: photoObj.caption,
                                posted: that.timeConverter(photoObj.posted),
                                author: data.username
                            });
                            that.setState({
                                refresh: false,
                                loading: false
                            });
                    }).catch(error => console.log(error));
                }
        }).catch(error => console.log(error));
    }

    render(){
      return(
        /*
        <View style = {{flex : 1 , alignItems : 'center' , justifyContent : 'center' }}>
          <Button 
            title="Go To Detail Screen" 
            onPress={() => this.props.navigation.navigate('Detail')} />
        </View>*/
        <View style={{flex:1}}>
            {this.state.loading == true ?(
                <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                    <Text>Loading...</Text>
                </View>
            ) : (
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
                            <Text>{item.author}</Text>
                        </View>
                        <View>
                            <Image source={{uri: item.url}} 
                                style={{resizeMode: 'cover', width: '100%', height: 275}}/>
                        </View>
                        <View style ={{padding: 5}}>
                            <Text>{item.caption}</Text>
                            <Text style={{color: 'grey'}}>View comments...</Text>
                        </View>
                    </View>            

                )}  
            />
         )}
        </View>
      )
    }
  }

  export default Feed;