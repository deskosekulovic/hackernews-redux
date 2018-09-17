import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTitle } from '../utilities/helper.jsx';
import { fetchData } from '../actions';

const WithFetchData = MyComponent => {
    class Container extends Component {
        
        componentDidMount(){
            const { match, name, fetchData } = this.props;
            window.scrollTo(0, 0);
            setTitle(match.params.ids, match.params.ids);
            fetchData(name, match.params.ids);
        }

        render(){
            return <MyComponent {...this.props}  />;
        }
    }

    Container.propTypes = {
        match: PropTypes.object.isRequired,
        fetchData: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        name: PropTypes.string.isRequired
    };

    const mapStateToProps = state => state.stories;

    const mapDispatchToProps = {
        fetchData
    };

    return connect(mapStateToProps, mapDispatchToProps)(Container);

};


export default WithFetchData;
