import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems.jsx';
import Paginator from './Paginator.jsx';
import { setTitle } from '../utilities/helper.jsx';
import { watchList } from '../api';
import { fetchItemsFromTypes } from '../actions';
import { connect } from 'react-redux';
import Spinner from './Spinner.jsx';
import Delay from './DelayComponent.jsx';

class Main extends Component {
  componentDidMount() {
    const { basePath, name, match, fetchItemsFromTypes, itemsPerPage } = this.props;
    const page = parseInt(match.params.ids, 10) || 1;

    setTitle(page, basePath);
    fetchItemsFromTypes(basePath, name, page, itemsPerPage, false, null);

    this.unwatch = watchList(name, ids =>
      fetchItemsFromTypes(basePath, name, page, itemsPerPage, true, ids)
    );
  }

  componentWillReceiveProps(nextProps) {
    const nextPage = parseInt(nextProps.match.params.ids, 10) || 1;
    const page = parseInt(this.props.match.params.ids, 10) || 1;
    const { basePath, name, fetchItemsFromTypes, itemsPerPage } = nextProps;
    if (page !== nextPage) {
      window.scrollTo(0, 0);
      this.unwatch();
      fetchItemsFromTypes(basePath, name, nextPage, itemsPerPage, false, null);

      this.unwatch = watchList(name, ids =>
        fetchItemsFromTypes(basePath, name, nextPage, itemsPerPage, true, ids)
      );
    }
  }

  componentWillUnmount() {
    this.unwatch();
  }

  render() {
    const { data, totalItems, loading, itemsPerPage, basePath, match } = this.props;
    const page = parseInt(match.params.ids, 10) || 1;
    return (
      <main>
        {loading === true ? (
          <Delay wait={200}>
            <Spinner />
          </Delay>
        ) : (
          <React.Fragment>
            <ListItems page={page} data={data} itemsPerPage={itemsPerPage} />
            <Paginator
              page={page}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              basePath={basePath}
            />
          </React.Fragment>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  let { activeItems, items, loading, itemsPerPage } = state.stories;
  let data = activeItems.map(i => items[i]).filter(i => !!i && !!i.id);
  return {
    data,
    loading,
    itemsPerPage,
    totalItems: state.stories[props.basePath].length
  };
};

const mapDispatchToProps = {
  fetchItemsFromTypes
};

Main.propTypes = {
  name: PropTypes.string.isRequired,
  totalItems: PropTypes.number,
  title: PropTypes.string,
  match: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
  fetchItemsFromTypes: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  fetching: PropTypes.object,
  items: PropTypes.object,
  itemsPerPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
