import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import Spinner from './Spinner.jsx';
import ComponentAnimation from '../styles/ComponentAnimation.jsx';
import { UserItem } from '../styles/User.jsx';
import WithFetchData from './WithFetchDataHOC.jsx';

const User = props => {
    const { items, loading } = props;
    const index = props.match.params.ids;
    return (
        loading ? <Spinner /> :
            items[index]!==undefined && <ComponentAnimation>
                <UserItem>user: <b>{items[index].id}</b></UserItem>
                <UserItem>created: <TimeAgo date={items[index].created*1000} /></UserItem>
                <UserItem>karma: {items[index].karma}</UserItem>
                {items[index].about && <UserItem>about: <span dangerouslySetInnerHTML={{ __html: items[index].about }} /></UserItem>}
            </ComponentAnimation>
    );
};

User.propTypes = {
    match: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

export default WithFetchData(User);
