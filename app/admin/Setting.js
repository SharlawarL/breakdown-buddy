import React, { Component } from 'react'
import { View,Image, Text, TouchableOpacity, ToastAndroid, TextInput, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         guardian: '',
         emergency: '',
         harrsment: '',
         police: ''
      }
      this.getItems();
   }

   getItems = async () => {
      
   }

   render() {
      return (
         <View style={styles.container}>
            <ScrollView>
               <Text style={{fontSize: 20, marginTop: 50}}>School Of Allied Science</Text>
               <Text style={{fontSize: 30, fontWeight: 700}}>Breakdown Buddy</Text>
               
               <Text style={{fontSize: 20, marginTop: 100}}>Designed and Developed By</Text>
               <Text style={{fontSize: 20, fontWeight: 700}}>Miss. Gauri Gundawar</Text>
               <Text style={{fontSize: 20, fontWeight: 700}}>9637872353</Text>
               
               <Text style={{fontSize: 20, marginTop: 50}}>Project Guided By</Text>
               <Text style={{fontSize: 20, fontWeight: 700}}>Prof. Kalyani Satone</Text>
               {/* <Image
                  source={require('../../assets/profile.jpg')}
                  style={{ width: 400, height: 400, marginTop: 30 }}
               /> */}
            </ScrollView>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      padding: 15
   },
   headline: {
      marginTop: 20
   },
   input: {
      marginTop: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      padding: 10
      // padding: '10px'
   },
   content: {
      margin: 15,
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      marginTop: 15,
      height: 40,
      alignItems: 'center'
   },
   submitButtonText: {
      color: 'white'
   }
})