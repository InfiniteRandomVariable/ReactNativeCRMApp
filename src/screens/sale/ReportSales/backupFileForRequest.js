// @format
// @flow

import React, {
  Fragment, useState,
} from 'react';
import {
  TextInput, Button, FlatList, Text, SafeAreaView,
} from 'react-native';

import styles from './styles';
// import axios from 'axios';
import { helpers } from '../../../flow/exports';

// const dataFetchReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_INIT':
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         data: action.payload,
//       };
//     case 'FETCH_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     default:
//       throw new Error();
//   }
// };

// const useAxiosApi = (initialURL: string, initialData) => {
//   // const [data, setData] = useState(initialData);
//   const [url, setUrl] = useState(initialURL);
//   //  const [isLoading, setIsLoading] = useState(false);
//   //  const [isError, setIsError] = useState(false);
//
//   const [state, dispatch] = useReducer(dataFetchReducer, {
//     isLoading: false,
//     isError: false,
//     data: initialData,
//   });
//
//
//   useEffect(() => {
//     const fetchData = async () => {
//       //  setIsError(false);
//       //  setIsLoading(true);
//       dispatch({ type: 'FETCH_INIT' });
//       try {
//         const result = await axios(url);
//         dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
//       //  setData(result.data);
//       } catch (error) {
//       //  setIsError(true);
//         dispatch({ type: 'FETCH_FAILURE' });
//       }
//
//     //  setIsLoading(false);
//     };
//
//     if (state.isLoading === false) {
//       fetchData();
//     }
//
//   //  fetchData();
//   }, [url]);
//
//   return [state, setUrl];
// };

// function useFetchData(search, handler, setIsLoading, isLoading) {
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const result = await axios(
//         `http://hn.algolia.com/api/v1/search?query=${search}`,
//       );
//       helpers.consoleLog('Request 1: Result');
//       helpers.consoleLog(result.data);
//       // const theData = result.data;
//       handler(result.data);
//       setIsLoading(false);
//       // setData(result.data);
//     };
//
//     if (isLoading === false) {
//       fetchData();
//     }
//   }, [search]);
// }


function ReportSalesScreen() {
  const defaultPrefixURL = 'http://hn.algolia.com/api/v1/search?query=';
  const [queryDate, setQueryDate] = useState('redux');
  // const [search, setSearch] = useState('redux');
  //  const [data, setData] = useState({ hits: [{ title: 'Title2' }, { title: 'TTIELE3' }] });
  //  const [isLoading, setIsLoading] = useState(false);
  // const testData = ({ hits: [{ title: 'Title2' }, { title: 'TTIELE3' }] });

  const [state, doFetch] = helpers.useAxiosApi(
    defaultPrefixURL + queryDate, { hits: [] },
  );

  // const handler = useCallback(
  //   (result) => {
  //     helpers.consoleLog('Request 2: Result');
  //     helpers.consoleLog(result);
  //     setData(result);
  //   },
  //   [],
  // );

  // useFetchData(search, handler, setIsLoading, isLoading);


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
