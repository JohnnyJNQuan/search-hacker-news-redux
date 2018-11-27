import React from 'react';
import Style from '../../styles/styles';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import '../../styles/search-page.css';
class SearchList extends React.Component {
    render() {
        // console.log(this.props.highlightedItemList);
        const { highlightedItemList } = this.props;
        return <div >
            <ul style={Style.ul}>
                {highlightedItemList.length > 0 && highlightedItemList.map((item, index) => (
                    <li key={index}>
                        <ListItem
                            item={item}
                        />
                    </li>
                ))}
            </ul>
        </div>;
    }

}

SearchList.propTypes = {
    highlightedItemList: PropTypes.Object
};


export default SearchList;