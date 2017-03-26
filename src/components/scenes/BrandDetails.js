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
import AnimShape from 'OrderBeer/src/art'
import OrderButton from 'OrderBeer/src/components/OrderButton';

const dummyData = {
}

export default class BrandDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //API call for all data
    const brandId = this.props.navigator.brandId;

    return fetch('http://198.199.66.68:8080/ledata')
      .then((response) => response.json())
      .then((responseJson) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(dummyData)});
      })
      .catch((error) => {
        console.error(error);
      });
  };


    callRep(){
      return fetch(
        'http://198.199.66.68:8080/api/contact_sales',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST"
        })
        .then((response) => response.json())
        .then((responseJson) => {
          return alert("You are calling your personal sales rep");
        })
        .catch((error) => {
          console.error(error);
        });
    }


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

  renderLastYearFactors(factors) {
    return (
      <View key={Math.random()}>
        <Text style={styles.factor}>NBA + NHL: {factors.major + 8}</Text>
        <Text style={styles.factor}>Montreal Hockey Games: {factors.mon}</Text>
        <Text style={styles.factor}>UFC Fights: {factors.ufc == null ? 0 : factors.ufc}</Text>
        <Text style={styles.factor}>Local Events: {factors.local}</Text>
      </View>
    );
  }

  renderThisYearFactors(factors) {
    return (
      <View key={Math.random()}>
        <Text style={styles.factor}>NBA + NHL: {factors.major + 3}</Text>
        <Text style={styles.factor}>Montreal Hockey Games: {factors.mon + 3}</Text>
        <Text style={styles.factor}>UFC Fights: {factors.ufc + 3}</Text>
        <Text style={styles.factor}>Local Events: {factors.local + 3}</Text>
      </View>
    );
  }

  render() {
    const lastYear = this.props.navigator.data;
    const thisYear = this.props.navigator.data;

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.brandName}>{this.props.navigator.brand}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week last year: {lastYear.qty}</Text>
          {lastYear[0]}
          {this.renderLastYearFactors(lastYear)}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Suggested orders for this week: {thisYear.qty + 120}</Text>
          {this.renderThisYearFactors(thisYear)}
        </View>

        <View style={styles.card}>
          <Text style={styles.total}>Total - editable</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.props.navigator.pop()} style={styles.saveButton}>
              <Text style={styles.centeredText}>Save and Return</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigator.push(Routes[3])} style={styles.checkoutButton}>
              <Text style={styles.centeredText}>Save and Checkout</Text>
            </TouchableOpacity>
            <OrderButton
              navigator={this.props.navigator}
              route={3}
              text="Call Rep"
              onPress={this.callRep}
            />
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
  brandName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
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
    fontSize: 18,
    fontWeight: '500',
  },
  factor: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
  },
  total: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    fontWeight: '500'
  },
  saveButton:{
    height: 50,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    flex: 1,
  },
  checkoutButton:{
    height: 50,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    flex: 1,
  },
});
