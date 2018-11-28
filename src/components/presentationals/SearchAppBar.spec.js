import * as React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Clear from '@material-ui/icons/Clear';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

describe('render Material UI in searchAppBar', () => {

    it('should render <Toolbar />', () => {
        const wrapper = shallow(<Toolbar />);
        expect(wrapper.text()).toBe('<Toolbar />');
    });

    it('should render <SearchIcon />', () => {
        const wrapper = shallow(<SearchIcon />);
        expect(wrapper.text()).toBe('<SearchIcon />');
    });

    it('should render <IconButton />', () => {
        const wrapper = shallow(<IconButton />);
        expect(wrapper.text()).toBe('<IconButton />');
    });

    it('should render <Typography />', () => {
        const wrapper = shallow(<Typography />);
        expect(wrapper.text()).toBe('<Typography />');
    });

    it('should render <InputBase />', () => {
        const wrapper = shallow(<InputBase />);
        expect(wrapper.text()).toBe('<InputBase />');
    });

    it('should render <MenuItem />', () => {
        const wrapper = shallow(<MenuItem />);
        expect(wrapper.text()).toBe('<MenuItem />');
    });

    it('should render <Clear />', () => {
        const wrapper = shallow(<Clear />);
        expect(wrapper.text()).toBe('<ClearIcon />');
    });

    it('should render <MoreIcon />', () => {
        const wrapper = shallow(<MoreIcon />);
        expect(wrapper.text()).toBe('<MoreVertIcon />');
    });

    it('should render <Avatar />', () => {
        const wrapper = shallow(<Avatar />);
        expect(wrapper.text()).toBe('<Avatar />');
    });
});
