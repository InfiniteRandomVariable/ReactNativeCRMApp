// @flow
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
export default class Foo {}
export type MyObject = { name: string };
// export interface MyInterface { /* ... */ };

// https://flow.org/en/docs/types/modules/
// https://www.robinwieruch.de/react-hooks-fetch-data/
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};


export const helpers = {
  didFillAllExcept(
    object: { [string]: string },
    except?: Array<string>,
  ): boolean {
    let didFillAllCounter: boolean = true;

    const keys = Object.keys(object);
    //    var finalIndex = keys.length;
    keys.forEach((key) => {
      const value = object[key];
      //  finalIndex = index;
      let didFindException = false;

      if (except && Array.isArray(except)) {
        console.log(`key 1: ${key}`);
        for (let i = 0; i < except.length; i++) {
          if (key === except[i]) {
            console.log(`key 2: ${key}`);
            didFindException = true;
            break;
          }
        }
      }

      if (value.toString().length <= 0 && didFindException === false) {
        didFillAllCounter = false;
        // console.log(
        //   "key 3: " +
        //     key +
        //     " index: " +
        //     index +
        //     " didFillAllCounter: " +
        //     didFillAllCounter
        // );
      }
    });

    // if (except && Array.isArray(except)) {
    //   var eLength = except.length;
    //   console.log(" except.length: " + eLength);
    //   finalIndex = finalIndex - except.length;
    // }
    // console.log(
    //   "finalIndex: " + finalIndex + " didFillAllCounter:" + didFillAllCounter
    // );
    return didFillAllCounter;
  },
  isValidNumber(str: string): boolean {
    if (!str || isNaN(str)) return false;
    const n = Number.parseFloat(str);
    if (n <= 0) return false;
    return true;
  },
  convertToDecimalNumber(value: string, toFixed: number): string {
    const n = Number.parseFloat(value);
    if (!this.isValidNumber(value)) return '';
    return n.toFixed(toFixed);
    // return 3;
  },
  consoleLog(msg: string) {
    console.log(msg);
  },
  consoleWarn(msg: string) {
    console.warn(msg);
  },
  consoleError(msg: string) {
    console.error(msg);
  },
  useAxiosApi(initialURL: string, initialData) {
    // const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialURL);
    //  const [isLoading, setIsLoading] = useState(false);
    //  const [isError, setIsError] = useState(false);

    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });


    useEffect(() => {
      const fetchData = async () => {
        //  setIsError(false);
        //  setIsLoading(true);
        this.consoleLog(`useAxioApi calling dispatch INIT with URL: ${url}`);

        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await axios(url);
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        //  setData(result.data);
        } catch (error) {
        //  setIsError(true);
          dispatch({ type: 'FETCH_FAILURE' });
        }

      //  setIsLoading(false);
      };

      if (state.isLoading === false) {
        fetchData();
      }

    //  fetchData();
    }, [url]);

    return [state, setUrl];
  },
  helper3(param1: string, param2: number) {},
};
// import * as MainComponents from "./MyComponent";
// use MainComponents.MyComponent and MainComponents.MyComponent2
