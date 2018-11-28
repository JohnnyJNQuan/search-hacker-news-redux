import axios from 'axios';
import { algoliaAPI } from '../constants/const';
import * as types from '../constants/actionTypes';

export const initialQuery = () => {
	return async (dispatch) => {
		try {
			const result = await axios.get(`${algoliaAPI}search?tags=story`)
			dispatch({ type: types.INITIAL_QUERY_SEARCH_LIST, payload: result.data })

		} catch (err) {
			throw (err);
		}
	};
};

export const query = (obj) => {
	return async (dispatch) => {
		try {
			const param = `${obj.searchBy}tags=story${obj.query ? `&query=${obj.query}` : ''}${obj.searchTimeSpan}`;
			const result = await axios.get(`${algoliaAPI}${param}`);
			if (result.data.query === obj.query) {
				dispatch({ type: types.QUERY_SEARCH_LIST, payload: result.data })
			}
		} catch (err) {
			throw (err);
		}
	};
};

export const pagination = (obj) => {
	return async (dispatch) => {
		try {
			const param = `${obj.searchBy}tags=story${obj.keyWord ? `&query=${obj.keyWord}` : ''}${obj.offset ? `&page=${obj.offset}` : ''}${obj.searchTimeSpan}`
			const result = await axios.get(`${algoliaAPI}${param}`)
			dispatch({ type: types.PAGINATION_SEARCH_LIST, payload: result.data })

		} catch (err) {
			throw (err);
		}
	};
};

export const sortBy = (obj) => {
	return async (dispatch) => {
		try {
			const param = `${obj.searchBy}tags=story${obj.keyWord ? `&query=${obj.keyWord}` : ''}${obj.searchTimeSpan}`;
			const result = await axios.get(`${algoliaAPI}${param}`)
			dispatch({ type: types.SORT_SEARCH_LIST, payload: result.data })

		} catch (err) {
			throw (err);
		}
	};
};

export const filter = (obj) => {
	return async (dispatch) => {
		try {
			const param = `${obj.searchBy}tags=story${obj.keyWord ? `&query=${obj.keyWord}` : ''}${obj.searchTimeSpan}`;
			const result = await axios.get(`${algoliaAPI}${param}`)
			dispatch({ type: types.FILTER_SEARCH_LIST, payload: result.data })

		} catch (err) {
			throw (err);
		}
	};
};


