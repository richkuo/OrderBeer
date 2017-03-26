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

const routes = [
  {title: 'Home', index: 0},
  {title: 'Brands', index: 1},
  {title: 'Details', index: 2},
  {title: 'Checkout', index: 3},
];

export default class OrderBeer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <StatusBar
          barStyle="dark-content"
          networkActivityIndicatorVisible
        />

        <Navigator
          initialRoute={routes[1]}
          // initialRouteStack={routes}
          // navigationBar={<NavBar navigator={navigator} navState={this.navState} routes={routes} />}
          // renderScene={this.sceneSelector}
          renderScene={(route, navigator) =>
            <Text>Hello {route.title}!</Text>
          }
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FadeAndroid}
          sceneStyle={styles.sceneStyle}
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
