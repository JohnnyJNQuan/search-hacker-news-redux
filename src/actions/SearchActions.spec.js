import * as ActionCreators from './SearchActions';

describe('verify the functions in Actions', () => {


    it('should create an action to make an initial query', () => {

        // expect this to return a function since it is a thunk
        expect(typeof (ActionCreators.initialQuery())).toEqual('function');

    });

    it('should create an action to make queries', () => {

        expect(typeof (ActionCreators.query())).toEqual('function');

    });

    it('should create an action to make pagination', () => {

        expect(typeof (ActionCreators.pagination())).toEqual('function');

    });

    it('should create an action to make sorting', () => {

        expect(typeof (ActionCreators.sortBy())).toEqual('function');

    });

    it('should create an action to make filtering', () => {

        expect(typeof (ActionCreators.filter())).toEqual('function');

    });

});
