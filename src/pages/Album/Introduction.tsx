import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

const mapStateToProps =({album}:RootState)=>{
  return {
    introduction:album?.introduction
  }
}
const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>

class Introduction extends React.Component< ModelState > {
  render() {
    const {introduction} = this.props
    return ( 
      <View style={styles.container}>
        <Text style={styles.title}>简介</Text>
        <Text>{introduction}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    paddingBottom:20
  },
});

export default connector(Introduction);
