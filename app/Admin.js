import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Button, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         redirect: false,
         redirectUrl : ''
       }
   }
   
   
   redirect = (url) => {

   }

   render() {
      const { navigation } = this.props
      if(this.state.redirect)
      {
         navigation.navigate('OtpVerify', { otp : this.state.otp, mobile:  this.state.mobile, name : this.state.name})
      }
      if(this.state.user_mobile)
      {
         navigation.navigate('Details')
      }
      return (
         <View style={styles.container}>
            <View style={styles.image}>
               <Image
                  source={require('../assets/logo.jpg')}
                  style={{ width: 100, height: 100 }}
               />
            </View>
            <View>
               <Text style={styles.title}> 
                  Admin Login
               </Text>
            </View>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => this.redirect('user')
               }>
               <Text style={styles.submitButtonText}> 
                  User
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => this.redirect('mechanic')
               }>
               <Text style={styles.submitButtonText}> 
                  Mechanic
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => this.redirect('admin')
               }>
               <Text style={styles.submitButtonText}> 
                  Admin
               </Text>
            </TouchableOpacity>

         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      padding: 20,
      paddingBottom: 100,
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
      color: 'white'
   }
})