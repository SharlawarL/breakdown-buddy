import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         usertype: ''
      }
      this.getValue();
   }

   getValue = async () => {

      var value = await AsyncStorage.getItem("usertype");
      this.setState({"usertype": value});

      if(value == 'user')
      {
         this.props.navigation.navigate("UserDashboard");
      }
      if(value == 'mechanic')
      {
         this.props.navigation.navigate("MechanicDashboard");
      }
      if(value == 'admin')
      {
         this.props.navigation.navigate("AdminDashboard");
      }

   }

   render() {
      const { navigation } = this.props

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
                  Welcome to Breakdown Buddy 
               </Text>
            </View>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={() => navigation.navigate('LoginAdmin')}
               >
               <Text style={styles.submitButtonText}> 
                  Admin
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={() => navigation.navigate('LoginUser')}
               >
               <Text style={styles.submitButtonText}> 
                  User
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={styles.submitButton}
               onPress={() => navigation.navigate('LoginMechanic')}
               >
               <Text style={styles.submitButtonText}> 
                  Mechanic
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
      paddingBottom: 200,
      backgroundColor: 'white'
   },
   title: {
     alignItems: 'center',
      textAlign: 'center',
      fontSize: 40,  
      paddingBottom: 100,
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
      borderRadius: 10,
      padding: 10
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      borderRadius: 10,
      height: 40,
      textAlign: 'center'
   },
   submitButtonText: {
      textAlign: 'center',
      color: 'white'
   }
})