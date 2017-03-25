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
        <TouchableOpacity onPress={() => this.props.navigator.push(Routes[4])}>
          <Text>Order Button - places order - goes straight to completed</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigator.push(Routes[1])}>
          <Text>Details Button - goes to brands page</Text>
        </TouchableOpacity>
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
