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

export default class BrandDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //API call for all data
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(dummyData)});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderBrandDetails(){
    //this.state.brands

  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>{this.props.navigator.brandId}</Text>
        <Text>BRAND DETAILS</Text>
        <Text>Per Brand</Text>
        <Text>This week last year</Text>
          <Text>List of factors last year's week</Text>

        <Text>suggested orders for this week</Text>
          <Text>List of factors affecting upcoming week</Text>
          <Text>Extra - user input factors</Text>

        <Text>Total - editable</Text>

        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <Text>Save and edit other brands</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigator.push(Routes[3])}>
          <Text>Save and Checkout</Text>
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
