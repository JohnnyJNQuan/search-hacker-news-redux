import * as React from 'react';
import { shallow } from 'enzyme';
import { mockSearchList } from '../../constants/const';
import SearchList from './SearchList';
import ListItem from './ListItem';


describe('verify ListItem in SearchList', () => {

    it('should contain <ListItem />', () => {
        const wrapper = shallow(
            <SearchList
                highlightedItemList={mockSearchList}
            />
        );

        expect(wrapper.find(ListItem).length).toEqual(1);
    });

});
