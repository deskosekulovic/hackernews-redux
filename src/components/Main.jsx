import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems.jsx';
import Paginator from './Paginator.jsx';
import { setTitle, watchList } from '../utilities/helper.jsx';
import { fetchItemsFromTypes } from '../actions';
import { connect } from 'react-redux';

import Spinner from './Spinner.jsx';
import Delay from './DelayComponent.jsx';

// const getData = (basePath, name, fetchItemsFromTypes, page) => {
//     fetchItemsFromTypes(basePath, name, page, false);
//     setInterval(()=>{
//         console.log("timer");
//         fetchItemsFromTypes(basePath, name, page, true);
//     }, 60000);
// };


class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const page = parseInt(this.props.match.params.ids,10) || 1;
        const { basePath, name, fetchItemsFromTypes } = this.props;

        setTitle(page, basePath);
        fetchItemsFromTypes(basePath, name, page, false, null);

        this.unwatch = watchList(name, ids=>fetchItemsFromTypes(basePath, name, page, true, ids));
        // this.timer = setInterval(()=>{
        //     console.log('timer');
        //     fetchItemsFromTypes(basePath, name, page, true);
        // }, 60000);
        // getData(basePath, name, fetchItemsFromTypes, page);
    }

    componentWillReceiveProps(nextProps){
        const nextPage = parseInt(nextProps.match.params.ids,10) || 1;
        const page = parseInt(this.props.match.params.ids,10) || 1;
        const { basePath, name, fetchItemsFromTypes } = nextProps;
        if(page !== nextPage) {
            this.unwatch();
            fetchItemsFromTypes(basePath, name, nextPage, false, null);

            this.unwatch = watchList(name, ids=>fetchItemsFromTypes(basePath, name, nextPage, true, ids));
            // this.timer = setInterval(()=>{
            //     console.log('timer');
            //     fetchItemsFromTypes(basePath, name, nextPage, true);
            // }, 60000);
            // getData(basePath, name, fetchItemsFromTypes, nextPage);
        }
    }

    componentWillUnmount(){
        this.unwatch();
    }

    render(){
        const { data, totalItems, loading, basePath } = this.props;
        const page = parseInt(this.props.match.params.ids,10) || 1;
        return(
            <main>
                {loading===true ? <Delay wait={200}><Spinner /></Delay> :
                    <div>
                        <ListItems page={page} data={data} />
                        <Paginator page={page} totalItems={totalItems} basePath={basePath} />
                    </div>
                }
            </main>
        );
    }

}

const mapStateToProps = (state, props) =>{
    let { activeItems, items, loading } = state.stories;
    let data = activeItems.map(i => items[i]).filter(i => !!i && !!i.id);
    return {
        data,
        loading,
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
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
