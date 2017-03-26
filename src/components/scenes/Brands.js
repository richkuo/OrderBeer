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

const dummyData = [];

export default class Brands extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyData),
    };
  }

  componentWillMount() {
    return fetch('http://198.199.66.68:8080/ledata')
      .then((response) => response.json())
      .then((responseJson) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return fetch('http://198.199.66.68:8080/api/ledata?weeks=201705.201707.201708')
          .then((response2) => response2.json())
          .then((responseJson2) => {
            responseJson.map(function(row) {
              responseJson2.forEach(function(row2) {
                if(row.brand === row2.brand) {
                  if(row2.week === 201705) {
                    row['lastMonth'] = row2.qty;
                  } else if(row2.week === 201707) {
                    row['lastWeek'] = row2.qty;
                  }
                }
              });
            });
        this.setState({dataSource: ds.cloneWithRows(responseJson)});
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  removeBrand(brandId) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const newData = this.state.dataSource._dataBlob.s1.filter(function(data) {
      if(brandId != data.id) {
        return data;
      }
    });

    this.setState({dataSource: ds.cloneWithRows(newData)});
  }

  showDetails(rowData) {
    this.props.navigator.brand = rowData.brand;
    this.props.navigator.data = rowData;
    this.props.navigator.push(Routes[2]);
  }
 
  renderBrand(rowData) {
    return (
      <TouchableOpacity
        key={rowData.brand}
        onPress={() => this.showDetails(rowData)}
        style={styles.button}
      >
        <View style={styles.brandSummary}>
          <Text style={styles.brandTitle}>{rowData.brand}</Text>

          <View style={styles.recommendedOrderQuantity}>
            <View style={styles.recommendedOrderQuantityText}>
              <Text>
                Recommended Order Quantity
              </Text>
            </View>

            <TextInput
              style={styles.textInput}
              onChangeText={(quantity) => this.setState({quantity})}
              defaultValue={rowData.qty.toString()}
              key={rowData.id + 10}
              keyboardType='numeric'
              maxLength={999999999}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          enableEmptySections={true}
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
