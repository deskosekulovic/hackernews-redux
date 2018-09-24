import React from 'react';
import PropTypes from 'prop-types';
import CommentItems from './CommentItems.jsx';
import CommentMeta from './CommentMeta.jsx';
import StyledComments from '../styles/Comments.jsx';
import WithFetchData from './WithFetchDataHOC.jsx';

const Comments = props => {
    const { items, match } = props;
    const index = match.params.ids;
    return (
        items[index]!==undefined &&
            <StyledComments key={index}>
                <CommentMeta data={items[index]} />
                <CommentItems
                    index={index}
                    items={[items[index]]}
                    kids={items[index].kids}
                />
            </StyledComments>
    );
};


Comments.propTypes = {
    match: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

export default WithFetchData(Comments);
