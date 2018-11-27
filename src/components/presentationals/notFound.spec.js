import * as React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';
import { mockKeyWord } from '../../constants/const';

const notFound = shallow(<NotFound keyWord={mockKeyWord} />);


describe('Show not found page with a non-sense keyword', () => {
    let notFoundInfo = '';

    beforeEach(() => {
        notFoundInfo = 'No stories matching non-sense keyword';
    });
    it('check not found info shown in the page', () => {
        expect(notFound.find('#notFound').text()).toEqual(notFoundInfo);
    });


});






