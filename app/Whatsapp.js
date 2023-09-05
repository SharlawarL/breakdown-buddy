// This is an Example to Send WhatsApp Message from React Native App
import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, TextInput } from 'react-native';

export default class WhatsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.mobile_no}
          onChangeText={mobile_no => this.setState({ mobile_no })}
          placeholder={'Enter Mobile to Send WhatsApp Message'}
          style={styles.input}
          keyboardType={'numeric'}
        />
        <Text
          style={{marginTop:30}}
          onPress={() => {
            Linking.openURL(
              'http://api.whatsapp.com/send?phone=' + this.state.mobile_no+'&text=Hello%20World!'
            );
          }}>
          Send WhatsApp Message
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:50,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
 input: {
   width:250,
   height: 44,
   padding: 10,
   margin: 20,
   backgroundColor: '#D3D3D3',
 },
});
