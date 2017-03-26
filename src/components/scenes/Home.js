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

import Routes from 'OrderBeer/src/routes';
import Brands from 'OrderBeer/src/components/scenes/Brands';
import OrderButton from 'OrderBeer/src/components/OrderButton';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleOrderPress(route){
    const BASE_URL = "http://198.199.66.68:8080/api";
    let ext;
    route === 4? ext = "/confirm" : ext = "/contact_sales";
    const url = BASE_URL + ext;
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
    })
    .then(response => response.json())
    .then(json =>  console.log("blahdedah", json))
    .catch(err =>  console.log("Error on Twillio call", err))
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Order Details</Text>

        <Brands navigator={this.props.navigator} />

        <OrderButton
          navigator={this.props.navigator}
          route={4}
          text="Order Now"
        />

        <OrderButton
          navigator={this.props.navigator}
          route={5}
          text="Order Details"
        />

      </View>
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
    padding: 20,
    margin: 20,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 50,
    height: 100,
    width: 250,
  },
  detailsButton: {
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 125,
    height: 150,
    width: 250,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
});
