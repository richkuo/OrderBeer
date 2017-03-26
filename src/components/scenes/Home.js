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

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Order Details</Text>

        <Brands navigator={this.props.navigator} />

        <OrderButton navigator={this.props.navigator}/>

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
