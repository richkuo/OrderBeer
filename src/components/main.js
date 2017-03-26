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
import Home from 'OrderBeer/src/components/scenes/Home'
import Brands from 'OrderBeer/src/components/scenes/Brands'
import BrandDetails from 'OrderBeer/src/components/scenes/BrandDetails'
import Checkout from 'OrderBeer/src/components/scenes/Checkout'
import Complete from 'OrderBeer/src/components/scenes/Complete'
import Routes from 'OrderBeer/src/routes'
import Animation from 'OrderBeer/src/art';

export default class OrderBeer extends Component {
  constructor(props) {
    super(props);
  }

  sceneSelector(route, navigator) {
    if(route.index == 0) {
      return (
        <Home navigator={navigator} routes={Routes} />
      );
    }

    if(route.index == 1) {
      return (
        <Brands navigator={navigator} routes={Routes} />
      );
    }

    if(route.index == 2) {
      return (
        <BrandDetails navigator={navigator} routes={Routes} />
      );
    }

    if(route.index == 3) {
      return (
        <Checkout navigator={navigator} routes={Routes} />
      );
    }

    if(route.index == 4) {
      return (
        <Complete navigator={navigator} routes={Routes} />
      );
    }

    if(route.index == 5) {
      return (
        <Animation navigator={navigator} routes={Routes} />
      );
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <StatusBar
          barStyle="dark-content"
          networkActivityIndicatorVisible
        />

        <Navigator
          initialRoute={Routes[0]}
          renderScene={this.sceneSelector}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (route.index === 0) {
                    return(<Text></Text>);
                  } else {
                    return (
                      <TouchableOpacity onPress={navigator.pop}>
                        <Text> Back </Text>
                      </TouchableOpacity>
                    );
                  }
                },
                RightButton: (route, navigator, index, navState) =>
                  { return (<Text></Text>); },
                Title: (route, navigator, index, navState) =>
                  { return (<Text></Text>); },
              }}
             style={{backgroundColor: 'white'}}
           />
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
