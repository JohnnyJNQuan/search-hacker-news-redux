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
import { convertTimeScope, convertHighlightedText } from '../../utils/convert';

export class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValues: Object.assign({}, this.props.searchModel),
            loading: false,
            keyWord: '',
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
                this.setState({ initialLoading: false, });
            }
            );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.searchModel.query === this.state.keyWord) {
            this.setState({ searchValues: Object.assign({}, nextProps.searchModel) })
        }
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
        this.props.searchActions.query(queryModel).then(() => {
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

        this.props.searchActions.pagination(queryModel).then(() => {
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
        this.props.searchActions.sortBy(queryModel).then(() => {
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

        this.props.searchActions.filter(queryModel).then(() => {
            this.setState({ loading: false, pageNumber: 0 });
        }
        )

    }

    render() {
        const { keyWord, pageNumber, searchBy, searchFor, loading, initialLoading, searchValues } = this.state;
        // build inner html to highlight search result
        const highlightedItemList = (searchValues && searchValues.hits) ? searchValues.hits.map((item) => {
            const r = Object.assign({}, item);
            r.rawUrl = r.url;
            if (keyWord) {
                if (r._highlightResult.title.value) {
                    r.title = <span dangerouslySetInnerHTML={{ __html: convertHighlightedText(r._highlightResult.title.value) }} />;
                }
                if (r._highlightResult.url ? r._highlightResult.url.value : false) {
                    r.url = <span dangerouslySetInnerHTML={{ __html: convertHighlightedText(r._highlightResult.url.value) }} />;
                }
                if (r._highlightResult.author ? r._highlightResult.author.value : false) {
                    r.author = <span dangerouslySetInnerHTML={{ __html: convertHighlightedText(r._highlightResult.author.value) }} />;
                }
                if (r.story_text) {
                    r.story_text = <span dangerouslySetInnerHTML={{ __html: convertHighlightedText(r.story_text) }} />;
                }
            } else {
                if (r.story_text) {
                    r.story_text = <span dangerouslySetInnerHTML={{ __html: r.story_text }} />;
                }
            }

            return r;
        }) : [];
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
                    total={searchValues ? searchValues.nbPages : 0}
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

