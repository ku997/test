import React, { createElement } from 'react';
import './style.scss';

class Comment extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <div className="comment">
                <h2 className="comment__post-title">{this.props.postTitle}</h2>
                <p className="comment__email">{this.props.email}</p>
                <p className="comment__text">Комментирует: {this.props.body}</p>
            </div>
        );
    }
}
export default Comment;