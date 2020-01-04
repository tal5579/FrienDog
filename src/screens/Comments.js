import React ,{ Component } from 'react';
import { Text, View , StyleSheet , Button, FlatList,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import { f , auth , database, storage } from '../../config/config';
class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
          comments_list:[],
          refresh: false
        };
    }

    checkParams = () => {
      var params = this.props.navigation.state.params;
      if(params){
        if(params.photoId){
          this.setState({
            photoId: params.photoId
          });
          this.fetchComments(params.photoId);
        }
      }
    }

    addCommentToList = (comments_list,data,comment) => {
      var that = this;
      console.log(data);
      var commentObj = data[comment];

      database.ref('users').child(commentObj.author).child('username').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
          comments_list.push({
            id:comment,
            comment: commentObj.comment,
            posted: that.timeConverter(commentObj.posted),
            timestamp: commentObj.posted,
            author: data,
            authorId: commentObj.author
          });

          var myData = [].concat(comments_list).sort((a,b) => a.timestamp < b.timestamp);

          that.setState({
            refresh:false,
            loading:false,
            comments_list: myData
          })
      }).catch(error => console.log(error));
    }

    fetchComments = (photoId) => {
      var that = this;
      database.ref('comments').child(photoId).orderByChild('posted').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists){
          //add comments to flatlist
          data = snapshot.val();
          var comments_list = that.state.comments_list;
          for(var comment in data){
            console.log('tal');
            that.addCommentToList(comments_list,data,comment);
          }
        }
        else{
          that.setState({
            comments_list: []
          });
        }
      }).catch(error => console.log(error));
    }

    componentDidMount = () => {
      var that = this;
      that.checkParams();
    }

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

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }

  uniqueId = () => {
    return this.s4() + this.s4() + '-'+ this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();   
  }
    
  postComment = () => {
    var comment = this.state.comment;
    if(comment != ''){
      //process
      var imageid = this.state.photoId;
      var userId = f.auth().currentUser.uid;
      var commentId = this.uniqueId();
      var dateTime = Date.now();
      var timestamp = Math.floor(dateTime / 1000);
      this.setState({
        comment: ''
      });
      var commentObj = {
        posted: timestamp,
        author: userId,
        comment: comment
      };
      database.ref('/comments/'+imageid+'/'+commentId).set(commentObj);
      //reload comment
      this.reloadCommentList();
    }
    else{
      alert('Please enter a comment before posting.');
    }
  }
  
    reloadCommentList = () => {
      this.setState({
        comments_list:[]
      });
      this.fetchComments(this.state.photoId)
    }

    render(){
        return(
          <View style = {{flex : 1 }}>
            <View style={{flexDirection: 'row',height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey',borderBottomWidth:0.5,justifyContent:'center',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity style={{width:100}}
            onPress={() => this.props.navigation.goBack()}>
              <Text style={{fontSize:18,fontWeight:'bold',paddingLeft:10}}>Go Back</Text>
            </TouchableOpacity>
            <Text style={{fontSize:16}}>Comments</Text>
            <Text style={{width:100}}></Text>
            </View> 
            {this.state.comments_list.length == 0 ? (
              <Text>No comments found..</Text>
            ):(
              <FlatList 
               refreshing={this.state.refresh}
               data={this.state.comments_list}
               keyExtractor={(item, index) => index.toString()}
               style={{flex:1,backgroundColor: '#eee'}}
               renderItem={({item,index}) => (
                 <View key={index} style={{width: '100%', overflow: 'hidden',marginBottom: 5,justifyContent: 'space-between',borderBottomWidth: 1,borderColor: 'grey'}}>
                   <View style={{padding:5,width:'100%', flexDirection: 'row',justifyContent:'space-between'}}>
                     <Text>{item.posted}</Text>
                     <TouchableOpacity
                     onPress={() => this.props.navigation.navigate('DogProfile', {userId: item.authorId})}>
                       <Text>{item.author}</Text>
                     </TouchableOpacity>
                   </View>
                   <View style={{padding:5}}>
                     <Text>{item.comment}</Text>
                   </View>
                 </View>
               )}
                />
             )}
             <KeyboardAvoidingView behavior="padding" enabled style={{borderTopWidth: 1,borderTopColor: 'grey', padding:10, marginBottom: 15}}>
                <Text style={{fontWeight:'bold'}}>Post comment</Text>
                <View>
                  <TextInput
                  editable={true}
                  placeholder={'enter your comment here..'}
                  onChangeText={(text) => this.setState({comment: text})}
                  value={this.state.comment}
                  style={{marginVertical: 10, height:50, padding:5 ,borderColor: 'grey',borderRadius: 3,backgroundColor: 'grey',color:'black'}}
                  />
                  <TouchableOpacity
                  style={{paddingVertical: 10,paddingHorizontal:20,backgroundColor:'blue',borderRadius:5}}
                  onPress={() => this.postComment()}>
                    <Text style={{color:'white'}}>Post</Text>
                  </TouchableOpacity>
                </View>
             </KeyboardAvoidingView>
          </View>
        )
      }
}


export default Comments;