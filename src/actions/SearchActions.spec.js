import * as ActionCreators from './SearchActions';

describe('Actions', () => {


  it('should create an action to make an initial query', () => {

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.initialQuery())).toEqual('function');

  });

  it('should create an action to make queries', () => {

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.Query())).toEqual('function');

  });

  it('should create an action to make pagination', () => {

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.Pagination())).toEqual('function');

  });

  it('should create an action to make sorting', () => {

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.SortBy())).toEqual('function');

  });

  it('should create an action to make filtering', () => {

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.Filter())).toEqual('function');

  });

});
