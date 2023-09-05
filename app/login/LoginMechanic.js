import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Button, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         id: '',
         name: '',
         mobile: '',
         username: '',
         password: '',
         usertype: '',
         upi: '',
         redirect: false
       }
   }


   handleUsername = (text) => {
      this.setState({ username: text })
   }

   handlePassword = (text) => {
      this.setState({ password: text })
   }
   
   
   login = (mobile, password) => {
      if(mobile != '' && password != '')
      {
      axios.get('https://blueclans.com/breakdownbuddy/login.php?method=login&mobile='+mobile+'&password='+password+'&usertype=mechanic')
            .then((response) => {
               if(response?.data?.response)
               {
                  this.setState({ 
                     redirect: true,
                     id: response?.data?.data?.id,
                     name: response?.data?.data?.name,
                     mobile : response?.data?.data?.mobile,
                     usertype : response?.data?.data?.usertype,
                     upi : response?.data?.data?.upi
                  })
               } else {
                  // alert("User not exits!");
                  ToastAndroid.show("Mobile and Password incorrect...!", ToastAndroid.SHORT);
               }
            })
            .catch(function (error) {
               console.log(error);
             });
            } else {
               ToastAndroid.show("Mobile and Password is required", ToastAndroid.SHORT);
            }
   }

   render() {
      const { navigation } = this.props

      if (this.state.redirect) {
         AsyncStorage.setItem('id', this.state.id);
         AsyncStorage.setItem('mobile', this.state.mobile);
         AsyncStorage.setItem('name', this.state.name);
         AsyncStorage.setItem('usertype', this.state.usertype);
         AsyncStorage.setItem('upi', this.state.upi);

         navigation.navigate('MechanicDashboard')
     }

      return (
         <View style={styles.container}>
            <View style={styles.image}>
               <Image
                  source={require('../../assets/logo.jpg')}
                  style={{ width: 100, height: 100 }}
               />
            </View>
            <View>
               <Text style={styles.title}> 
                  Mechanic Login
               </Text>
            </View>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Mobile"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleUsername}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => this.login(this.state.username, this.state.password)
               }>
               <Text style={styles.submitButtonText}> 
                  Submit
               </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterMechanic')}>
               <Text style={styles.image}>
                  New to <Text style={{fontWeight:700}}>Breakdown Buddy</Text> ? Create Account
               </Text>
            </TouchableOpacity>
            <Text style={styles.image}>
               Or
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
               <Text style={styles.image}>
                  Back to <Text style={{fontWeight:700}}>Home Page.</Text>
               </Text>
            </TouchableOpacity>

         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 150,
      padding: 20,
      paddingBottom: 250,
      backgroundColor: 'white'
   },
   title: {
     alignItems: 'center',
      textAlign: 'center',
      fontSize: 40,  
      fontWeight: 500,
      color: '#f0118b'
   },
   image: {
      margin: 10,
      alignItems: 'center',
      textAlign: 'center'
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      padding: 10
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      textAlign: 'center'
   },
   submitButtonText: {
      textAlign: 'center',
      color: 'white'
   }
})