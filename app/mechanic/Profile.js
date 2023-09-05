import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text,Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from '@expo/vector-icons'; 

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         user_id: '',
         name: '',
         mobile: '',
         upi: '',
         redirect: false
      }
      this.getItems();
   }

   getItems = async () => {
      this.setState({
         user_id: await AsyncStorage.getItem('id'),
         name: await AsyncStorage.getItem('name'),
         mobile: await AsyncStorage.getItem('mobile'),
         upi: await AsyncStorage.getItem('upi')
      })
      console.log("States", this.state)
   }

   logout = (text) => {
      AsyncStorage.removeItem('name');
      AsyncStorage.removeItem('mobile');
      AsyncStorage.removeItem('usertype');
      AsyncStorage.removeItem('upi');
      this.setState({ redirect: true })
   }

   render() {
      const { navigation } = this.props
      if (this.state.redirect) {
         navigation.navigate('Home')
      }
      return (
         <View style={styles.container}>
            <ScrollView>
               <View style={styles.content}>
                  <Text style={{ marginTop: 20 }}>Payment QR :</Text>
                  <View>
                  <Image
                        source={require('../../assets/qr_code_01.jpg')}
                        style={{ width: 200, height: 200, marginTop: 10 }}
                     />
                  </View>
                  <Text style={{ marginTop: 20 }}>Username :</Text>
                  <Text style={{ fontSize: 30 }}>{this.state.name ? this.state.name : 'Please Log in'}</Text>
                  <Text style={{ marginTop: 10 }}>Mobile :</Text>
                  <Text style={{ fontSize: 20 }}>{this.state.mobile ? this.state.mobile : 'Please Log in'}</Text>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => navigation.navigate('UserViewMechanics', {user_id : this.state.user_id })
                    }>
                    <Text style={styles.submitButtonText}> 
                    <AntDesign name="edit" size={15} /> Edit Info
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.submitButton}
                     onPress={
                        () => this.logout()
                     }>
                     <Text style={styles.submitButtonText}> Logout </Text>
                  </TouchableOpacity>
                  {/* <ScrollView style={{height: 500}}>
               <View>
                     <Text>Infomation</Text>
                     <Text style = {styles.instructions}>Today, the safety of women in India is widely discussed everywhere. Now it has become a serious problem. The crime rate is skyrocketing. Women are not safe either at home or outside. Female travelers from other countries also find themselves in a precarious position when traveling to India. But these fears cannot stop them from any social activity. There are laws, but there must be adequate security measures that must be strictly followed to protect against violence against women.</Text>
                     <Text style = {styles.instructions}>Violence and discrimination threaten women's lives and prevent them from participating in any social activities. In India, she is revered by those who consider her goddess of the surge in crimes against women through Durga, Sati and Sabitri. Previously, women were confined to their homes, but urbanization has forced women to break this prison and show the world their talents on an equal footing with men.</Text>
                     <Text style = {styles.instructions}>Women showed off their talents in everything from taxi drivers to CEOs of multinational corporations. A woman should let go of the idea that she can't do anything when she leaves the house. They must admit that she also stepped on the moon. Kalpana Chawala, the first Indian woman to land on the moon, has become a role model not only for women around the world, but also for all men who dream of becoming astronauts. She has become an inspiration all over the world.</Text>
                     <Text style = {styles.instructions}>Women's safety is a major issue in India and many organizations have started working on it after the Nirbhai incident. Women need to learn a few self-defense tips and tricks to be useful in the worst-case scenario. Numerous videos and information about such protection techniques are available on the Internet to educate women about safety. Key and borderline advice for women: If you feel anything unsafe, we recommend that you leave immediately.</Text>
                  </View>
            </ScrollView> */}
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
      marginTop: 50,
      height: 40,
      alignItems: 'center'
   },
   submitButtonText: {
      color: 'white'
   },
   instructions: {
      marginBottom: 20,
      marginTop: 20
   }
})