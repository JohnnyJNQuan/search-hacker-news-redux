import * as React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import SearchAppBar from './SearchAppBar';
import Toolbar from '@material-ui/core/Toolbar';



describe("<SearchAppBar />", () => {

    it("should contain <Toolbar />", () => {
      const wrapper = shallow(
        <SearchAppBar
        searching={jest.fn()}
        handleSearchByChange={jest.fn()}
        handleSearchForChange={jest.fn()}
        searchBy={'search?'}
        searchFor={'All Time'}
        loading={false}
    />
      );
  
      expect(wrapper.find(Toolbar).length).toEqual(1);
    });

});
