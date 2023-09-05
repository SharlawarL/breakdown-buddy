import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Inputs extends Component {

   constructor(props) {
      super(props)
   }



   render() {
      return (
         <View style={styles.container}>
            <ScrollView style={{ height: '100%' }}>
               <View style={{ padding: 20, textAlign: 'justify' }}>
                  <Text style={{ fontSize: 30, fontWeight: 700 }}>Information</Text>
                  <Text style={styles.instructions}>In today's world, women's safety has become a major concern, with reports of violence and harassment against women being reported on a daily basis. Women are often afraid to go out alone or travel to unfamiliar places, and their safety can be compromised in various ways, including physical assault, sexual harassment, and stalking. To address these concerns, technology can play a significant role in improving women's safety.
                     In recent years, mobile applications have emerged as a popular tool for addressing women's safety concerns. These apps can be used by women to alert authorities or family members in case of emergencies, track their location, and access self-defense tips, among other features. One such app is the women's safety android app, which is designed specifically for women to help them feel safer and more secure in their daily lives.
                     The women's safety android app provides various features and functionality to enhance women's safety. For example, it allows users to send out an emergency alert to pre-selected contacts, including the user's location, in case of an emergency. The app also includes a panic button that can be activated in case of danger, which sends out an alert to the user's emergency contacts, as well as to the nearest police station. In addition, the app includes a feature for tracking the user's location, which can help authorities locate the user in case of an emergency.</Text>
                     <Text style={{ fontSize: 20, fontWeight: 700 }}>Significance of Project</Text>
                  <Text style={styles.instructions}><Text style={{ fontWeight: 700 }}>Providing immediate assistance:</Text> Women safety apps can offer quick access to emergency services and alert designated contacts in case of an emergency, providing an additional layer of safety and security.</Text>
                  <Text style={styles.instructions}><Text style={{ fontWeight: 700 }}>Encouraging awareness and prevention:</Text> Women safety apps can educate users on safety tips and techniques, encouraging them to be more aware of their surroundings and take proactive steps to prevent unsafe situations.</Text>
                  <Text style={styles.instructions}><Text style={{ fontWeight: 700 }}>Creating a supportive community:</Text> Women safety apps can create a community of users who can share their experiences, report incidents, and provide support to each other.</Text>
                  <Text style={styles.instructions}><Text style={{ fontWeight: 700 }}>Reducing the stigma:</Text> Women safety apps can help reduce the stigma associated with reporting harassment and assault by providing a safe and anonymous platform for reporting incidents.</Text>
               </View>
            </ScrollView>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
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
   },
   instructions: {
      marginBottom: 20,
      marginTop: 20,
      textAlign: 'justify'
   }
})