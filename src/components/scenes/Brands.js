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
  TextInput,
} from 'react-native';
import Routes from 'OrderBeer/src/routes'

const dummyData = [
  {
    id: 1,
    title: 'Bud light',
    percentChange: '-25',
    quantity: '2500',
  },
  {
    id: 2,
    title: 'crak',
    percentChange: '+25',
    quantity: '1000',
  },
  {
    id: 3,
    title: 'stella',
    percentChange: '-25',
    quantity: '500',
  },
  {
    id: 4,
    title: 'bbass',
    percentChange: '-25',
    quantity: '1500',
  },
];

export default class Brands extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyData),
    };
  }

  componentDidMount() {
    //API call for all data
    // return fetch('http://198.199.66.68:8080/ledata')
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

  removeBrand(brandId) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(this.state.dataSource);

    const newData = oldData.filter(function(data) {
      console.log(brandId);
      console.log(data.id);
      console.log(brandId != data.id);
      if(brandId != data.id) {
        return data;
      }
    });

    this.setState({dataSource: ds.cloneWithRows(newData)});
  }
 
  renderBrand(rowData) {
    // this.props.navigator.brandId = rowData.id;

    // based on last week's percentage change
    // change card background color
    // and add up/down arrow icon
    return (
      <View style={styles.brandCard}>
        <View style={styles.brandSummary}>
          <Text style={styles.brandTitle}>{rowData.title}</Text>

          <View style={styles.recommendedOrderQuantity}>
            <View style={styles.recommendedOrderQuantityText}>
              <Text>
                Recommended Order Quantity
              </Text>
            </View>
            
            <TextInput
              style={styles.textInput}
              onChangeText={(quantity) => this.setState({quantity})}
              defaultValue={rowData.quantity}
              key={rowData.id + 10}
              keyboardType='numeric'
              maxLength={999999999}
            />
          </View>

        </View>

        <View style={styles.brandAction}>
          <TouchableOpacity
            key={rowData.id + 1000}
            onPress={() => this.removeBrand(rowData.id)}
            style={styles.removeButton}
          >
            <Text>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={rowData.id}
            onPress={() => this.props.navigator.push(Routes[2])}
            style={styles.button}
          >
            <Text>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderBrand(rowData)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  brandTitle: {
    fontSize: 20,
  },
  brandSummary: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  recommendedOrderQuantity: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recommendedOrderQuantityText: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    height: 50,
    width: 75,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  brandAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandCard: {
    paddingBottom: 55,
    marginBottom: 55,
    borderBottomWidth: 1,
    // height: 75,
    // width: 300,
  },
  button: {
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  removeButton: {
    margin: 10,
    backgroundColor: 'red',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  }
});
