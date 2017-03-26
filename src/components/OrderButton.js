'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import Routes from 'OrderBeer/src/routes'

export default class orderButton extends Component {
  constructor(props) {
    super(props);
  }

  handlePress(){
    let { route } = this.props

    this.props.navigator.push(Routes[route])

    if(this.props.onPress){
      return this.props.onPress();
    }
    return;
  }

  render() {
    let { route, text } = this.props
    let buttonStyle;
    if(route === 4){
      buttonStyle = styles.orderButton;
    } else {
      buttonStyle = styles.detailsButton;
    }

     console.log("route and associated buttonStyle");
      console.log(route, buttonStyle);
    return (
      <TouchableOpacity onPress={() => this.handlePress()} style={buttonStyle}>
        <Text style={styles.buttonText}> { text } </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  orderButton: {
    // padding: 20,
    // margin: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 50,
    height: 100,
    width: 350,
  },
  detailsButton: {
    // padding: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 125,
    height: 100,
    width: 350,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
});
