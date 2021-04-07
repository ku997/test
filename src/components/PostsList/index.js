import { Component } from 'react';
import Post from '../Post/index.js'
import './style.scss';

class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="postslist">{
                this.props.posts
                    .map(elem => {
                        return <Post
                            {...elem}
                            key={elem.id}
                        />
                    })
            }</div>
        );
    }
}
export default PostsList;