'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AreaSpline from '../charts/AreaSpline';
import Pie from '../charts/Pie';

// import Theme from './js/theme';
// import data from './resources/data';

// type State = {
//   activeIndex: number,
//   spendingsPerWeek: any
// }

const Theme = {
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ]
}

const data = {

  spendingsPerWeek: [
    {week: 2016, value: 3.24},
    {week: 2015, value: 3.24},
    {week: 2014, value: 10.35},
    {week: 2013, value: -10.84},
    {week: 2012, value: 9.92},
    {week: 2011, value: 45.80},
    {week: 2010, value: 19.47},
    {week: 2009, value: -30.24},
    {week: 2008, value: 10.35},
    {week: 2007, value: 10.84},
    {week: 2006, value: 19.92},
    {week: 2005, value: 60.80},
    {week: 2004, value: 19.47},
    {week: 2003, value: 34.24},
    {week: 2001, value: 45.35},
    {week: 2000, value: -30.84},
    {week: 1999, value: 60.92},
    {week: 1998, value: -21.80},
    {week: 1997, value: 19.47},
    {week: 1996, value: 3.24},
    {week: 1995, value: 10.35},
    {week: 1994, value: 20.84},
    {week: 1993, value: 60.92},
    {week: 1992, value: -60.80},
  ],

  spendingsLastMonth: [
    {"number": 1144, "name": 'Labbat'},
    {"number": 376, "name": 'Budweiser'},
    {"number": 331, "name": 'Alexander Keiths Red'},
    {"number": 328, "name": 'Shock Top'},
    {"number": 1, "name": 'Alexander Keiths IPA'},
    {"number": 1, "name": 'Becks'},
  ],
};

export default class App extends Component {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerWeek: data.spendingsPerWeek,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  _onPieItemSelected(newIndex){
    this.setState({...this.state, activeIndex: newIndex, spendingsPerWeek: this._shuffle(data.spendingsPerWeek)});
  }

  _shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }

  render() {
    const height = 200;
    const width = 500;

    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>Distribution of spending this month</Text>
          <Pie
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={data.spendingsLastMonth} />
          <Text style={styles.chart_title}>Spending per week in {data.spendingsLastMonth[this.state.activeIndex].name}</Text>
          <AreaSpline
            width={width}
            height={height}
            data={this.state.spendingsPerWeek}
            color={Theme.colors[this.state.activeIndex]} />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 21,
    // height: 500,
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:'white',
    color: 'grey',
    fontWeight:'bold',
  }
}
