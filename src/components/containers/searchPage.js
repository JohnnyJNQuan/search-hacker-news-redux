import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pagination from 'material-ui-flat-pagination';
import SearchAppBar from '../presentationals/SearchAppBar';
import SearchList from '../presentationals/SearchList';
import NoFound from '../presentationals/NotFound';
import Style from '../../styles/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import '../../styles/search-page.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActions from '../../actions/SearchActions';
import { convertTimeScope } from '../../utils/convert';

export class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            keyWord: null,
            pageNumber: 0,
            searchBy: 'search?',
            searchFor: 'All Time',
            searchTimeSpan: '',
            initialLoading: true,
            error: ''
        };
    }


    componentDidMount() {
        this.props.searchActions.initialQuery()
            .then(() => {
                this.setState({ initialLoading: false });
            }
            );
    }

    // search query when Typing
    query = (query) => {

        this.setState({ keyWord: query, loading: true });
        const { searchTimeSpan, searchBy } = this.state;
        const queryModel = {
            searchBy: searchBy,
            searchTimeSpan: searchTimeSpan,
            query: query
        }
        this.props.searchActions.Query(queryModel).then(() => {
            this.setState({ loading: false });
        }
        )
    }
    // handle the event of clicking page number
    handleClick = (offset) => {
        this.setState({ pageNumber: offset, loading: true });
        const { keyWord, searchBy, searchTimeSpan } = this.state;
        const queryModel = {
            searchBy: searchBy,
            searchTimeSpan: searchTimeSpan,
            offset: offset,
            keyWord: keyWord
        }

        this.props.searchActions.Pagination(queryModel).then(() => {
            this.setState({ loading: false });
        }
        )
    }
    // handle the sorting-by searching
    handleSearchByChange = event => {
        this.setState({ searchBy: event.target.value, loading: true });
        const { keyWord, searchTimeSpan } = this.state;
        const queryModel = {
            searchBy: event.target.value,
            searchTimeSpan: searchTimeSpan,
            keyWord: keyWord
        }
        this.props.searchActions.SortBy(queryModel).then(() => {
            this.setState({ loading: false, pageNumber: 0 });
        }
        )

    }
    // handle the time scope searching
    handleSearchForChange = event => {
        let searchTimeSpan = convertTimeScope(event.target.value);
        this.setState({ searchTimeSpan, searchFor: event.target.value, loading: true });
        const { keyWord, searchBy } = this.state;
        const queryModel = {
            searchBy: searchBy,
            searchTimeSpan: searchTimeSpan,
            keyWord: keyWord
        }

        this.props.searchActions.Filter(queryModel).then(() => {
            this.setState({ loading: false, pageNumber: 0 });
        }
        )

    }

    render() {
        // console.log(this.state);
        // console.log(this.props);
        const { keyWord, pageNumber, searchBy, searchFor, loading, initialLoading } = this.state;
        const { searchModel } = this.props
        // build inner html to highlight search result
        // const highlightedItemList = convertingHighlightedHtml(searchModel, keyWord);
        const highlightedItemList = searchModel ? searchModel.hits.map((item) => {
            const r = Object.assign({}, item);
            r.rawUrl = r.url;
            if (keyWord) {
                if (r._highlightResult.title.value) {
                    const prefixReplace = r._highlightResult.title.value.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const titleUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.title = <span dangerouslySetInnerHTML={{ __html: titleUpdatedValue }} />;
                }
                if (r._highlightResult.url ? r._highlightResult.url.value : false) {
                    const prefixReplace = r._highlightResult.url.value.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const urlUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.url = <span dangerouslySetInnerHTML={{ __html: urlUpdatedValue }} />;
                }
                if (r._highlightResult.author ? r._highlightResult.author.value : false) {
                    const prefixReplace = r._highlightResult.author.value.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const authorUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.author = <span dangerouslySetInnerHTML={{ __html: authorUpdatedValue }} />;
                }
                if (r.story_text) {
                    const prefixReplace = r.story_text.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const storyUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.story_text = <span dangerouslySetInnerHTML={{ __html: storyUpdatedValue }} />;
                }
            } else {
                if (r.story_text) {
                    r.story_text = <span dangerouslySetInnerHTML={{ __html: r.story_text }} />;
                }
            }

            return r;
        }) : [];
        // console.log(highlightedItemList);
        if (initialLoading) {
            return <LinearProgress />;
        }
        return (
            <div className={'root'}>
                <SearchAppBar
                    searching={this.query}
                    handleSearchByChange={this.handleSearchByChange}
                    handleSearchForChange={this.handleSearchForChange}
                    searchBy={searchBy}
                    searchFor={searchFor}
                    loading={loading}
                />
                <div style={Style.topContent}> appbar </div>
                {highlightedItemList.length !== 0 && <SearchList
                    highlightedItemList={highlightedItemList}
                />}
                {highlightedItemList.length === 0 && <NoFound
                    keyWord={keyWord}
                />}
                <CssBaseline />
                <Pagination
                    limit={1}
                    offset={pageNumber}
                    total={searchModel ? searchModel.nbPages : 0}
                    onClick={(e, offset) => this.handleClick(offset)}
                />

            </div>
        );
    }
}
SearchPage.propTypes = {
    searchActions: PropTypes.object,
    searchModel: PropTypes.object
};

function mapStateToProps(state) {
    return {
        searchModel: state.searchState.searchModel
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);

