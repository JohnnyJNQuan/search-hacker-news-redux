import { INITIAL_QUERY_SEARCH_LIST, QUERY_SEARCH_LIST, PAGINATION_SEARCH_LIST, SORT_SEARCH_LIST, FILTER_SEARCH_LIST } from '../constants/actionTypes';

import initialState from './initialState';

export default function searchReducer(state = initialState.searchModel, action) {

  switch (action.type) {
    case INITIAL_QUERY_SEARCH_LIST:
    case QUERY_SEARCH_LIST:
    case PAGINATION_SEARCH_LIST:
    case SORT_SEARCH_LIST:
    case FILTER_SEARCH_LIST:
      return Object.assign({}, state, {
        searchModel: action.payload
      });

    default:
      return state;
  }
}
