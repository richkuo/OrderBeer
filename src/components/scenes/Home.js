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

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => this.props.navigator.push(Routes[4])} style={styles.orderButton}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigator.push(Routes[1])} style={styles.detailsButton}>
          <Text style={styles.buttonText}>Order Details</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 125,
    height: 250,
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
