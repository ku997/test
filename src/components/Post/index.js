import {Component} from 'react';
import './style.scss';
import {Link} from "react-router-dom";

class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post">
                <Link className="post__title" to = {'posts/'+this.props.id}>{this.props.title}</Link>
                <p className="post__text">{this.props.body.slice(0, 100) + '...'}</p>
                <p className="post__email">{this.props.userEmail}</p>
            </div>
        );
    }
}
export default Post;