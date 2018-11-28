import React from 'react';
import { shallow } from 'enzyme';
import Pagination from 'material-ui-flat-pagination';
import NoFound from '../presentationals/NotFound';
import LinearProgress from '@material-ui/core/LinearProgress';

describe('render elements in SearchPage', () => {

    it('should render <Pagination />', () => {
        const wrapper = shallow(<Pagination />);
        expect(wrapper.text()).toBe('<Pagination />');
    });

    it('should render <NoFound /> with No stories matching', () => {
        const wrapper = shallow(<NoFound />);
        expect(wrapper.text()).toBe('No stories matching ');
    });

    it('should render <LinearProgress />', () => {
        const wrapper = shallow(<LinearProgress />);
        expect(wrapper.text()).toBe('<LinearProgress />');
    });


});
