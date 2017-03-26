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

import OrderButton from 'OrderBeer/src/components/OrderButton';

export default class Checkout extends Component {
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
        <Text>CHECKOUT</Text>
        <Text>List of brands and quantity being ordered</Text>
        <Text>Modify order button</Text>

        <Text>Total Final Order</Text>
        <OrderButton
          navigator={this.props.navigator}
          text="Place Order"
          route={4}
          onPress={this.placeOrder}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  sceneStyle: {
    paddingTop: (Platform.OS === 'ios') ? 70 : 50,
  },
});
