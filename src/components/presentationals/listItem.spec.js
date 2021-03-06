import * as React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';
import { mockProps } from '../../constants/const';
import moment from 'moment';

const listItem = shallow(<ListItem item={mockProps} />);


describe('List items match with the search result props', () => {
    let title, point, author, createTime, url = '';

    beforeEach(() => {
        title = ' The Bilski Decision Is In: Buh-Bye [Most] Business Methods Patents ';
        point = ' 1 points ';
        author = ' | author: soundsop';
        createTime = ` | ${moment("2018-11-13T02:51:23.000Z").fromNow()} `;
        url = 'http://www.groklaw.net/article.php?story=20081030150903555'
    });
    it('check title string in search list item', () => {


        expect(listItem.find('#title').text()).toEqual(title);
    });

    it('check points string in search list item', () => {

        expect(listItem.find('#points').text()).toEqual(point);
    });


    it('check author string in search list item', () => {

        expect(listItem.find('#author').text()).toEqual(author);

    });

    it('check create time string in search list item', () => {

        expect(listItem.find('#created_at').text()).toEqual(createTime);

    });

    it('check url string in search list item', () => {
        expect(listItem.find('.alink').text()).toEqual(url);
    });

});






