import { StyleSheet, View, Text,Image,TextInput, TouchableOpacity, ScrollView, Linking   } from 'react-native'
import React, { Component, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';
import { json } from 'react-router-dom';
// import MapView from 'react-native-maps';

import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";
class Inputs extends Component {

  constructor(props) {
     super(props)
     this.state = {
      id:'',
      search: '',
      mechanicData: [],
      location: null,
      errorMessage: null,
    }

    this.getValue();
  }


  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  getValue = async () => {

    var value = await AsyncStorage.getItem("id");
    this.setState({ id: value })
    this.getMechanicsData(value);
  }
  


  handleSearch = (text) => {
    this.setState({ search: text })
 }

 SearchMechanic = (search) => {
  console.log("Search", search)
 }

 getMechanicsData = (id) => {
  axios.get('https://blueclans.com/breakdownbuddy/login.php?method=getMechanicData&mech_id='+id)
        .then((response) => {
           if(response?.data?.response)
           {
              this.setState({ 
                mechanicData : response?.data?.data
              })
           } else {
              // alert("User not exits!");
              ToastAndroid.show("Something went wrong.!", ToastAndroid.SHORT);
           }
        })
        .catch(function (error) {
           console.log(error);
         });
}

bookBuddy = (booking_id, status) => {

  axios.get('https://blueclans.com/breakdownbuddy/login.php?method=updateBooking&booking_id='+booking_id+'&status='+status)
          .then((response) => {
             if(response?.data?.response)
             {
                this.getMechanicsData(this.state.id)
             } else {
                // alert("User not exits!");
                ToastAndroid.show("Something went wrong.!", ToastAndroid.SHORT);
             }
          })
          .catch(function (error) {
             console.log(error);
           });

}


openGoogleMaps = (latitude, longitude) => {

  const label = 'My Location'; // Replace with a label for the marker

  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

haversineDistance  = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(4)+' Km';
}


   render() {
    const { navigation } = this.props

    const { location, errorMessage } = this.state;

    const pending = this.state.mechanicData['metrics']?.Pending
    const corrent = this.state.mechanicData['metrics']?.Current
    const completed = this.state.mechanicData['metrics']?.Completed

    const mechDataList = this.state.mechanicData['data'] ? this.state.mechanicData['data'] : []

    console.log("mechDataList", mechDataList)
    var mechList = [];

    if(mechDataList.length > 0)
    {

      mechList = []
    for(let data of mechDataList){
      mechList.push(
          <View style={styles.listBox} key={ data['id'] }>
              <View>
                <Image
                  source={require('../../assets/logo.jpg')}
                  style={{ width: 100, height: 100, marginTop: 30 }}
                />
              </View>
                <View>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Name</Text>: { data['name'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Mobile</Text>: { data['mobile'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Address</Text>: { data['address'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Created On</Text>: { data['created_on'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Status</Text>: { data['status'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Distance</Text>: { this.haversineDistance(data['latitude'], data['longitude'], location?.coords?.latitude , location?.coords?.longitude) }</Text>
                  {/* <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Latitude</Text>: { data['latitude'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Longitude</Text>: { data['longitude'] }</Text> */}
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={
                          () => this.bookBuddy(data['id'], 'Current')
                      }>
                      <Text style={styles.submitButtonText}> 
                      <Ionicons name="md-checkmark-circle-outline" size={15}/> { data['status'] == 'Pending' ? 'Accept' : 'Completed' }
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={
                          () => this.openGoogleMaps(data['latitude'], data['longitude'])
                      }>
                      <Text style={styles.submitButtonText}> 
                      <Ionicons name="md-map"  /> Map
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
      )
  }

} else {
  mechList.push(
    <View style={styles.listBox} key="11111111111111">
    <View>
      <Image
        source={require('../../assets/logo.jpg')}
        style={{ width: 100, height: 100 }}
      />
    </View>
      <View>
        <Text style={{marginTop: 30}}>No Data Available</Text>
      </View>
  </View>
  )
}

    return (
        <View style={styles.container}>
            <View>
              {errorMessage && <Text>{errorMessage}</Text>}
            </View>
            <View style={{ flexDirection: 'row', width: '100%', padding:10 }}>
                <View style={styles.flexBox}>    
                  <Text style={{fontSize: 13}}>Pending</Text>
                  <Text style={{fontSize: 20, fontWeight:'700'}}>{ pending ? pending : 0 }</Text>
                </View>
                <View  style={styles.flexBox}>  
                  <Text style={{fontSize: 13}}>Working</Text>
                  <Text style={{fontSize: 20, fontWeight:'700'}}>{ corrent ? corrent : 0 }</Text>
                </View>
                <View  style={styles.flexBox}> 
                  <Text style={{fontSize: 13}}>Completed</Text>
                  <Text style={{fontSize: 20, fontWeight:'700'}}>{ completed ? completed : 0 }</Text>
                </View>
            </View>
            <View style={{ padding: 20, borderTopWidth:  1, borderTopStyle:'solid', borderTopColor:'silver' , borderBottomWidth:  1, borderBottomStyle:'solid', borderBottomColor:'silver',width:'100%'}}>
            <Text>Work List </Text>
            </View>
            <ScrollView style={styles.scrollView}>
              { mechList }
            </ScrollView>
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
    subtext:{
      marginTop: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      marginTop: 50,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    headline:{
      marginTop: 20,
      fontSize: 30,
      fontWeight: 900,
    },
    map: {
      width: '100%',
      height: 200,
      marginTop: 20,
      marginBottom: 20
    },
    input: {
      marginTop: 20,
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      padding: 10,
      width: '90%'
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      paddingleft: 20,
      paddingRight: 20,
      marginTop: 15,
      marginRight: 15,
      borderRadius: 10,
      height: 40,
      textAlign: 'center',
   },
   submitButtonText: {
      color: 'white'
   },
   flexBox:{ 
    flex: 1, 
    borderWidth:  1, 
    borderColor: 'silver', 
    borderStyle:'solid', 
    borderRadius:  5, 
    width: '30%', 
    padding: 20, 
    margin: 5,
    textAlign: 'left'
  },
  scrollView: {
    marginHorizontal: 20,
    width: '90%'
  },
  listBox: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    width: '90%',
    borderWidth:  1,
    borderColor: 'silver',
    borderStyle: 'solid'
  }
  });