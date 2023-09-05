import React, { Component } from 'react'
import { View, Text,Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import OtpInputs from 'react-native-otp-inputs';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Inputs extends Component {
   state = {
        id: this.props?.route?.params?.id,
        remark: '',
        amount: '',
        redirect: false
   }
   handleOtp = (text) => {
      this.setState({ verifyOtp: text })
   }
   
   login = (email, pass) => {
      this.setState({ redirect: true })
   }
   render() {
      const { navigation } = this.props
      if(this.state.verifyOtp == this.state.otp)
      {
        //  AsyncStorage.setItem('mobile', this.state.mobile);
        //  AsyncStorage.setItem('name', this.state.name);
        //  navigation.navigate('Details')
      }
      return (
         <View style = {styles.container}>
            <View style={styles.image}>
               <Image
                  source={require('../../assets/logo.jpg')}
                  style={{ width: 100, height: 100 }}
               />
            </View>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter One Time Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleOtp}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Verify </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10
   },
   image: {
      margin: 10,
      width: '100%',
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
      width: '100%',
      margin: 15,
      height: 40,
      textAlign: 'center'
   },
   submitButtonText:{
      color: 'white'
   }
})