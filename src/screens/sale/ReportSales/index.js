// @format
// @flow

import React, {
  Fragment, useState,
} from 'react';
import {
  Button, Text, SafeAreaView, Picker,
} from 'react-native';

import styles from './styles';
import { helpers } from '../../../flow/exports';
import DrawerTouchableOpacity from '../../../components/UI/DrawerTouchableOpacity';

function ReportSalesScreen() {
  const defaultPrefixURL = 'http://hn.algolia.com/api/v1/search?query=';
  const [queryDate, setQueryDate] = useState('redux');
  const [state, doFetch] = helpers.useAxiosApi(
    defaultPrefixURL + queryDate, { hits: [] },
  );

  helpers.consoleLog('TESTING Main consolelog');
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>
Select Time
          {'\n'}
          {'\n'}
        </Text>
        <Text> {queryDate}{'\n'}{'\n'}</Text>


        {state.isLoading ? (
          <Text>
            {'\n'}
            Loading ...
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>
        ) : (Object.keys(state.data).length === 0 && state.data.constructor === Object || !(state.data.hits.length > 0))   ? (

          <Text>
            {'\n'}
           No data available
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>

        ) : (<Text style={[styles.verticalText, styles.titleText]}>
          {'\n'}
          {' '}
          {state.data.hits.slice(0, 1).map(item => (

            <Text>
              {'\n'}
              {item.title}
            </Text>

          ))}
          {/*
            {state.data.hits.map(item => (

              <Text>{item.title}{'\n'}</Text>

          ))}
          */}

          {'\n'}
          {'\n'}
          {'\n'}
        </Text>) }
        {state.isLoading ? (
          <Button title="Search" disabled />) : (<Button title="Search" onPress={() => { helpers.consoleLog(`TESTING 3 consolelog, queryDate - ${queryDate}`); doFetch(`http://hn.algolia.com/api/v1/search?query=${queryDate}`); }} />)}


        <Picker
          selectedValue={queryDate}
          style={{
            backgroundColor: '#F5FCFF',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onValueChange={(itemValue, itemIndex) => setQueryDate(itemValue)}
        >
          <Picker.Item label="Today" value="Today" />
          <Picker.Item label="Yesterday" value="Yesterday" />
          <Picker.Item label="Prior Third Date" value="Prior_Third_Date" />
          <Picker.Item label="Prior Fourth Date" value="Prior_Fourth_Date" />
          <Picker.Item label="Prior Fifth Date" value="Prior_Fifth_Date" />
          <Picker.Item label="Prior Sixth Date" value="Prior_Sixth_Date" />
          <Picker.Item label="Last 7 days" value="Last_7_days" />
          <Picker.Item label="Last 14 days" value="Last_14_days" />
          <Picker.Item label="Last 21 days" value="Last_21_days" />
          <Picker.Item label="Last Month" value="Last_Month" />
          <Picker.Item label="Last 3 Months" value="Last_3_Months" />
          <Picker.Item label="Last 4 Months" value="Last_4_Months" />
          <Picker.Item label="Last 6 Months" value="Last_6_Months" />
        </Picker>

      </SafeAreaView>

    </Fragment>
  );
}

ReportSalesScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Sales Report'),
  headerLeft: (
    <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
  ),
});

export default ReportSalesScreen;
