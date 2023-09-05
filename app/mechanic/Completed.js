import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';
import { json } from 'react-router-dom';
// import MapView from 'react-native-maps';

import axios from "axios";
class Inputs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      user_id: '',
      myServiceList: []
    }
    this.getValue();
  }

  getValue = async () => {

    var value = await AsyncStorage.getItem("id");
    this.setState({"user_id": value});
    
    this.getMyBookings(value);
  }


  handleSearch = (text) => {
    this.setState({ search: text })
  }

  SearchMechanic = (search) => {
    console.log("Search", search)
  }

  getMyBookings = (id) => {
    axios.get('https://blueclans.com/breakdownbuddy/login.php?method=getBookingMech&status=Completed&mech_id='+id)
            .then((response) => {
               if(response?.data?.response)
               {
                  this.setState({ 
                    myServiceList : response?.data?.data
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

  bookBuddy = (mech_id, user_id) => {
    console.log(mech_id, user_id)

    axios.get('https://blueclans.com/breakdownbuddy/login.php?method=saveBooking&mech_id='+mech_id+'&user_id='+user_id)
            .then((response) => {
               if(response?.data?.response)
               {
                ToastAndroid.show("Booked successfully", ToastAndroid.SHORT);
               } else {
                  // alert("User not exits!");
                  ToastAndroid.show("Something went wrong.!", ToastAndroid.SHORT);
               }
            })
            .catch(function (error) {
               console.log(error);
             });

  }


  render() {
    const { navigation } = this.props

    var mechList = [];
    if((this.state.myServiceList).length > 0)
    {
        for(let data of this.state.myServiceList){
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
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Completed On</Text>: { data['completed_on'] }</Text>
                  <Text style={{ width: 200}}><Text style={{fontWeight:'700'}}>Status</Text>: { data['status'] }</Text>
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
  subtext: {
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
  headline: {
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
    margin: 15,
    height: 40,
    textAlign: 'center',
    width: '90%'
  },
  submitButtonText: {
    color: 'white'
  },
  scrollView: {
    marginHorizontal: 20,
    width: '90%'
  },
  text: {
    fontSize: 42,
  },
  listBox: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    width: '90%',
    borderWidth:  1,
    borderColor: 'silver',
    borderStyle: 'solid'
  }
});