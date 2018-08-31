import React from 'react';
import PropTypes from 'prop-types';
import CommentItems from './CommentItems.jsx';
import CommentMeta from './CommentMeta.jsx';
import StyledComments from '../styles/Comments.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/App.jsx';
import WithFetchData from './WithFetchDataHOC.jsx';

const Comments = props => {
    const { items } = props;
    const index = props.match.params.ids;
    return (
        items[index]!==undefined &&
        <ThemeProvider theme={theme}>
            <StyledComments key={index}>
                <CommentMeta data={items[index]} />
                <CommentItems index={index} items={[items[index]]} kids={items[index].kids} />
            </StyledComments>
        </ThemeProvider>
    );
};


Comments.propTypes = {
    match: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

export default WithFetchData(Comments);
