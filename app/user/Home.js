import { StyleSheet, View, Text, Pressable, ScrollView, Linking } from 'react-native'
import React, { Component } from 'react'
import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

class Inputs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name:'',
      guardian: '',
      emergency: '',
      harrsment: '',
      police: '',
      location: '',
      url : 'https://maps.google.com/?q=',
      latitude: '20.3899',
      longitude: '78.1307'
    }
    this.getItems();
    this.useEffect();
  }
  getItems = async () => {
    this.setState({
      name: await AsyncStorage.getItem('name'),
      guardian: await AsyncStorage.getItem('guardian'),
      emergency: await AsyncStorage.getItem('emergency'),
      harrsment: await AsyncStorage.getItem('harrsment'),
      police: await AsyncStorage.getItem('police')
    })
    console.log("States", this.state)
  }


  useEffect = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      ToastAndroid.show("Permission to access location was denied..!", ToastAndroid.SHORT);
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("location", location)
    this.setState({
      location: location,
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      url: this.state.url + location?.coords?.latitude + ',' + location?.coords?.longitude
    })
  }

  //https://smartmenucard.in/alert.php?method=otp&mobile=9657256675

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text>Demo</Text> */}
          <View style={styles.content}>
            <Text style={styles.headline}>Panic Situation </Text>
            <Text>( {this.state.guardian ? this.state.guardian : 'Please config'} )</Text>
            <Pressable style={styles.button} onPress={() => {
              let result = fetch('https://smartmenucard.in/alert.php?method=alert&mobile=' + this.state.guardian + '&message=Hello, Im '+this.state.name+', %0a%0a Im in panic situation. %0a%0a Please help me. %0a%0a location %0a : '+this.state.url+' %0a%0a '+JSON.stringify(this.state.location))
              Linking.openURL(`tel:` + this.state.guardian)
            }}>
              <Text style={styles.text}>Click to Alert</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.headline}>Health Emergency </Text>
            <Text>( {this.state.emergency ? this.state.emergency : 'Please config'} )</Text>
            <Pressable style={styles.button} onPress={() => {
              let result = fetch('https://smartmenucard.in/alert.php?method=alert&mobile=' + this.state.emergency + '&message=Hello, Im '+this.state.name+', %0a%0a Halth emegency. %0a%0a Please help me, %0a%0a location %0a :  '+this.state.url+' %0a%0a  '+ JSON.stringify(this.state.location))
              Linking.openURL(`tel:` + this.state.emergency)
            }}>
              <Text style={styles.text}>Click to Alert</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.headline}>Sexual Harassment </Text>
            <Text>( {this.state.harrsment ? this.state.harrsment : 'Please config'} )</Text>
            <Pressable style={styles.button} onPress={() => {
              let result = fetch('https://smartmenucard.in/alert.php?method=alert&mobile=' + this.state.harrsment + '&message=Hello, Im '+this.state.name+', %0a%0a Im in trouble. %0a%0a Location %0a :  '+this.state.url+' %0a%0a  '+JSON.stringify(this.state.location))
              Linking.openURL(`tel:` + this.state.harrsment)
            }}>
              <Text style={styles.text}>Click to Alert</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.headline}>Police </Text>
            <Text>( {this.state.police ? this.state.police : 'Please config'} )</Text>
            <Pressable style={styles.button} onPress={() => {
              let result = fetch('https://smartmenucard.in/alert.php?method=alert&mobile=' + this.state.police + '&message=Hello, Im '+this.state.name+', %0a%0a Im in trouble. %0a%0a Location %0a : '+ JSON.stringify(this.state.location))
              Linking.openURL(`tel:` + this.state.police)
            }}>
              <Text style={styles.text}>Click to Alert</Text>
            </Pressable>
          </View>
          {/* <View style={styles.content}>
               Sefety Instruction
               <Pressable style={styles.button} onPress={()=> Linking.openURL(`tel:9657256675`)}>
                <Text style={styles.text}>Click to View</Text>
              </Pressable>
            </View> */}
        </ScrollView>
      </View>
    )
  }
}

export default Inputs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#eb15cb',
  },
  content: {
    margin: 10,
    padding: 30,
    border: '1px solid silver',
    fontSize: 30,
    boxShadow: '0px 0px 10px black',
    backgroundColor: '#eb15cb',
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  headline: {
    fontSize: 20,
    fontWeight: 700
  }
});