import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.scss";
import { authUser } from "../../actions/users/getAuthUser";
import { getPostById } from "../../actions/posts/getPostById";
import { getUserById } from "../../actions/users/getUserById";
import { getCurrentPostId } from "../../actions/posts/getCurrentPost";
import { getCommentsByPost } from "../../actions/comments/getCommentsByPost";
import { newComment } from "../../actions/comments/newComment";
import Preloader from "../../components/Preloader/index";
import Modal from "../../components/Modal/index";
class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postComments: [],
      commentText: "",
      isOpenModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.popupOpener = this.popupOpener.bind(this);
  }

  handleChange(val) {
    this.setState({
      commentText: val.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const ADDED_COMMENT = {
      id: Math.random(),
      postTitle: this.props.currentPost.title,
      postId: this.props.match.params.id,
      body: this.state.commentText,
      email: this.props.user.email,
      userId: this.props.user.id,
    };
    this.props.newComment(ADDED_COMMENT);
    this.setState({
      commentText: "",
    });
    this.popupOpener();
  }

  popupOpener() {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  }

  componentDidMount() {
    const POST_ID = this.props.match.params.id;
    this.props.getCurrentPostId(POST_ID);
    if (!this.props.isFullPosts && !this.props.posts.some((element) => element.id == POST_ID))
      this.props.getPostById(POST_ID);
    if (!this.props.isFullComments && !this.props.comments.some((element) => element.postId == POST_ID))
      this.props.getCommentsByPost(POST_ID);
  }
  render() {
    let comments = this.props.comments
      .concat(this.props.addedComments)
      .filter((elem) => elem.postId == this.props.match.params.id);
    if (this.props.postsStatus !== "ready" || this.props.commentsStatus !== "ready" || !this.props.currentPost)
      return <Preloader />;
    return (
      <div className="singlepost container">
        <h2 className="singlepost__title_disable">{this.props.currentPost.title}</h2>
        <p className="singlepost__text">{this.props.currentPost.body}</p>
        <p className="singlepost__email">{this.props.currentPost.userEmail}</p>
        <h2 className="singlepost__comments-title">Комментарии:</h2>
        <div className="singlepost__comments">
          {comments.map((elem) => {
            return (
              <div className="singlepost__comments-comment" key={elem.id}>
                <p className="singlepost__comments-email">{elem.email}</p>
                <p className="singlepost__comments-text">{elem.body}</p>
              </div>
            );
          })}
        </div>
        <form className="singlepost__comment-form">
          <textarea
            required
            placeholder="Комментарий"
            value={this.state.commentText}
            className="singlepost__add-text"
            cols="30"
            rows="10"
            onChange={this.handleChange.bind(this)}
          />
          <button className="singlepost__form-submit" onClick={this.handleSubmit}>
            Комментировать
          </button>
        </form>
        {this.state.isOpenModal && (
          <Modal modalCloseFoo={this.popupOpener}>
            <div className="comment-popup">
              <p className="comment-popup-text">Комментарий успешно добавлен</p>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const CURRENT_POST = state.posts.loadedPosts.filter((elem) => elem.id == state.posts.currentPost)[0];
  return {
    user: state.authUser,
    posts: state.posts.loadedPosts,
    postsStatus: state.posts.status,
    isFullPosts: state.posts.isFull,
    currentPostId: +state.posts.currentPost,
    isFullComments: state.comments.isFull,
    comments: state.comments.loadedComments,
    commentsStatus: state.comments.status,
    currentPost: CURRENT_POST,
    addedComments: state.comments.addedComments,
  };
}
const mapDispathToProps = {
  authUser,
  getPostById,
  getUserById,
  getCurrentPostId,
  getCommentsByPost,
  newComment,
};
export default withRouter(connect(mapStateToProps, mapDispathToProps)(SinglePost));
