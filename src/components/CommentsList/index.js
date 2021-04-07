import { Component } from 'react';
import Comment from '../Comment/index.js'
import './style.scss';

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="commentslist">{
                this.props.comments.length !==0 ? this.props.comments
                    .map(elem => {
                        return <Comment
                            {...elem}
                            key={elem.id}
                        />
                    }) : 'Комментариев не найдено'
            }</div>
        );
    }
}
export default CommentList;