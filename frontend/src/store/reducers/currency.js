import {
  ADD_CURRENCY_LOADING,
  ADD_CURRENCY,
  ADD_CURRENCY_ERROR,
  UPDATE_CURRENCY_LOADING,
  UPDATE_CURRENCY,
  UPDATE_CURRENCY_ERROR,
} from '../actions/types';

import isEmpty from '../../validation/is-empty';
const initialState = {
  currency: {},
  currencyList: [],
  isCurrencySelected: false,
  loading: false
};

export default function (state = initialState, action) {


  switch (action.type) {

    case ADD_CURRENCY_LOADING:
      return;


    case ADD_CURRENCY:
      return;



    case ADD_CURRENCY_ERROR:
      return;

    default:
      return state;
  }
}
