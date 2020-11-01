import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class MyRecievedThings extends Component{
    
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            recievedThingsList:[]
        }
        this.requestRef=null
    }
getRecievedThingsList=()=>{
this.requestRef=db.collection("requested_things").where('user_id','==',this.state.userId)
.where("book_status",'==','recieved')
.onSnapshot((snapshot)=>{
    var recievedThingssList=snapshot.docs.map((doc)=>doc.data())
    this.setState({
        recievedThingssList:recievedThingsList
    })
})
}
componentDidMount(){
    this.getRecievedThingsList()
}
keyExtractor=(item,index)=>index.toString()
renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={item.ThingsStatus}
        titleStyle={{color:'black',fontWeight:'bold'}}
        bottomDivider
        />
    )
}
render(){
    return(
        <View style={{flex:1}}> 
<MyHeader title="Recieved Things" navigation={this.props.navigation}/>
<View style={{flex:1}}>
    {this.state.recievedThingsList.length===0
    ?(
        <View style={styles.subContainer}>
<Text style={{fontSize:20,font:'algerian'}}>
    list of all recieved Books
</Text>
            </View>
    )
    :(
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.receivedThingsList}
        renderItem={this.renderItem}
      />
    )
}
</View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })