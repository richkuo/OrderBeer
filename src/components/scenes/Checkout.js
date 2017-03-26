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

export default class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>CHECKOUT</Text>
        <Text>List of brands and quantity being ordered</Text>
        <Text>Modify order button</Text>

        <Text>Total Final Order</Text>
        <Text>Place Order Button</Text>
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
