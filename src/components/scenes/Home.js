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

  placeOrder(){
    return fetch(
        'http://198.199.66.68:8080/api/confirm',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST"
        })
        .then((response) => response.json())
        .then((responseJson) => {
          return alert("Your beer order has been placed");
        })
        .catch((error) => {
          console.error(error);
        });

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={{fontSize: 24}}>Order Details</Text>

        <Brands navigator={this.props.navigator} />

        <OrderButton
          navigator={this.props.navigator}
          route={4}
          text="Order Now"
          onPress={this.placeOrder}
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
    paddingTop: 0,
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
    width: 550,
  },
  detailsButton: {
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 125,
    height: 150,
    width: 550,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
});
