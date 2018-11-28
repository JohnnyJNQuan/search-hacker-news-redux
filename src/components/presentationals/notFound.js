import React from 'react';
import Style from '../../styles/styles';
import PropTypes from 'prop-types';
import '../../styles/search-page.css';
class NotFound extends React.Component {
  render() {
    return <div >
      <div id='notFound' style={Style.notFound}>
        No stories matching <b style={Style.keyWordSpan}>{this.props.keyWord}</b>
      </div>

    </div>;
  }

}

NotFound.propTypes = {
  keyWord: PropTypes.string
};


export default NotFound;