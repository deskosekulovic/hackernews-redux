import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchKids, setItems } from '../actions';
import ComponentAnimation from '../styles/ComponentAnimation.jsx';
import CommentItem from './CommentItem.jsx';
import { connect } from 'react-redux';

import { store } from '../store/configureStore';

import Spinner from './Spinner.jsx';

class CommentItems extends Component {
    constructor(props) {
        super(props);

        this.toggleVisible = this.toggleVisible.bind(this);
    }

    componentDidMount(){
        const { fetchKids, items } = this.props;
        fetchKids(items);
    }

    toggleVisible(id){
        let el = store.getState().stories.items[id];
        el = Object.assign({}, el, {visible: !el.visible});
        this.props.setItems('SET_ITEMS', {[el.id]:el});
    }

    render(){
        const { data, index, loading } = this.props;
        if(this.props.kids===undefined){
            return <ComponentAnimation>No comments!</ComponentAnimation>;
        }
        return(
            loading ? <Spinner /> :
                <div>
                    {this.props.kids!==undefined && this.props.kids.map(item=>{
                        if(data[item]===undefined) return null;
                        if(!data[item].id) return null;
                        return(
                            index==data[item].parent && <CommentItem key={data[item].id} id={data[item].id} index={data[item].parent} data={data} item={data[item]} toggleVisible={this.toggleVisible} />
                        );
                    })}
                </div>
        );
    }
}

const mapStateToProps = state =>({
    data: state.stories.items,
    loading: state.stories.loading
});

const mapDispatchToProps = {
    fetchKids,
    setItems
};

CommentItems.propTypes = {
    kids: PropTypes.arrayOf(PropTypes.number.isRequired),
    fetchKids: PropTypes.func,
    setItems: PropTypes.func,
    index: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItems);
