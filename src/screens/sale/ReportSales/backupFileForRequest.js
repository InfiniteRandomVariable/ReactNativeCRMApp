// @format
// @flow

import React, {
  Fragment, useState,
} from 'react';
import {
  TextInput, Button, FlatList, Text, SafeAreaView,
} from 'react-native';

import styles from './styles';
import { helpers } from '../../../flow/exports';


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
      <TextInput
        value={queryDate}
        onChangeText={event => setQueryDate(event)}
      />
      <Button title="Search" onPress={() => { helpers.consoleLog(`TESTING 3 consolelog, queryDate - ${queryDate}`); doFetch(`http://hn.algolia.com/api/v1/search?query=${queryDate}`); }} />
      {state.isLoading ? (
        <Text>Loading ...</Text>
      ) : (

        <FlatList
          data={state.data.hits}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />

      )}
        </SafeAreaView>
    </Fragment>
  );
}


export default ReportSalesScreen;
