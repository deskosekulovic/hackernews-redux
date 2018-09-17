import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import ComponentAnimation from '../styles/ComponentAnimation.jsx';
import { TextToggle, ToggleMeta } from '../styles/CommentItem.jsx';
import { connect } from 'react-redux';
import { toggleVisible } from '../actions';


const CommentItem = ({ data, item, toggleVisible }) => {
    const { by, time, text, id, kids, visible } = item;
    return(
        <ComponentAnimation key={id} id={id}>
            <div>
                <ToggleMeta onClick={()=>toggleVisible(id)} >{visible ? '[-]' : '[+]'} </ToggleMeta><Link to={`/user/${by}`} ><b>{by}</b></Link>{'  '}
                <span><TimeAgo date={new Date(time*1000)} /></span>
            </div>
            <TextToggle visible={visible}>
                <div className='text' dangerouslySetInnerHTML={{ __html: text }} />
                <p>reply</p>
                {
                    kids && kids.map(kid=> data[kid]!==undefined &&
                            <CommentItem key={kid} id={kid} item={data[kid]} index={data[kid].parent} data={data} toggleVisible={toggleVisible} />
                    )
                }
            </TextToggle>
        </ComponentAnimation>
    );
};

CommentItem.propTypes = {
    kids: PropTypes.arrayOf(PropTypes.number.isRequired),
    item: PropTypes.object,
    data:PropTypes.object,
    by: PropTypes.string,
    time: PropTypes.number,
    text: PropTypes.string,
    id: PropTypes.number,
    visible: PropTypes.bool,
    toggleVisible: PropTypes.func.isRequired
};

export default connect(null, { toggleVisible })(CommentItem);
