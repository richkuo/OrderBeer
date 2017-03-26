'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
  ListView,
  View,
  Platform,
} from 'react-native';
import Routes from 'OrderBeer/src/routes'

const dummyData = {

}

export default class BrandDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //API call for all data
    const brandId = this.props.navigator.brandId;

    return fetch('http://198.199.66.68:8080/ledata?id=' + brandId)
      .then((response) => response.json())
      .then((responseJson) => {

         console.log("responseJson");
         console.log(responseJson);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(dummyData)});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  editOrder(int) {
    // let qty = this.state.dataSource[this.props.navigator.brandId].quantity;
    let qty = 5;
    let newQty = qty + int;
    this.state.dataSource[this.props.navigator.brandId].quantity = newQty;
    this.setState({ ...this.state, qty});
  }

  renderBrandDetails(){
    //this.state.brands
  }

  renderFactors(factors) {
    return factors.map(function(factor) {
      return (
        <Text key={factors.id} style={styles.factor}>
          {factor.title} - {factor.quantity}
        </Text>
      );
    });
  }

  render() {
    // const lastYear = this.props.lastYear;
    // const thisYear = this.props.thisYear;

    const lastYear = [{id: 1, title: 'asdf', quantity: '1'}];
    const thisYear = [{id: 2, title: 'qwer', quantity: '2'}];

    return (
      <View style={styles.mainContainer}>
        <Text>BRAND NAME</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week last year</Text>
          {this.renderFactors(lastYear)}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>suggested orders for this week</Text>
          {this.renderFactors(thisYear)}
        </View>

        <View style={styles.card}>
          <Text style={styles.total}>Total - editable</Text>

          <TouchableOpacity onPress={() => this.editOrder(1)}>
            <Text>Add to Order</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.editOrder(-1)}>
            <Text>Remove to Order</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.props.navigator.pop()} style={styles.saveButton}>
              <Text style={styles.centeredText}>Save and edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigator.push(Routes[3])} style={styles.checkoutButton}>
              <Text style={styles.centeredText}>Save and Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  centeredText: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  factor: {
    marginLeft: 10,
  },
  total: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    fontWeight: '500'
  },
  saveButton:{
    margin: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    flex: 1,
  },
  checkoutButton:{
    margin: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    flex: 1,
  },
});
