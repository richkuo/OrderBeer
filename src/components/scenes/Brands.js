'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
  StatusBar,
  View,
  ListView,
  Platform,
} from 'react-native';
import Routes from 'OrderBeer/src/routes'

const dummyData = [
    'Bud light', 'crak', 'stella', 'bbass'
  ];

export default class Brands extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyData)
    };
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
 
  renderBrand(rowData) {
    this.props.navigator.brandId = rowData.id;
    this.props.navigator.brandId = "456789";

    // based on last week's percentage change
    // change card background color
    // and add up/down arrow icon
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigator.push(Routes[2])} style={styles.card}>
          <Text>sampleBrand.title</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>BRANDS</Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderBrand(rowData)}
        />

        <Text>Place order button</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 10,
    borderRadius: 5,
  },
});
