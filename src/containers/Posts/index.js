import { Component } from "react";
import { connect } from "react-redux";
import "./style.scss";
import PostList from "../../components/PostsList/index.js";
import ReactPaginate from "react-paginate";
import { getFullPosts } from "../../actions/posts/getFullPosts";
import { getPagState } from "../../actions/pagination/getPagState";
import Preloader from "../../components/Preloader/index";
import ErrorPage from "../../components/ErrorPage/Index.js";

const POSTS_COUNT = 10;

class Posts extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(data) {
    let selected = data.selected;
    if (window.location.href.match(/posts/, "gi")) this.props.getPagState(selected);
  }
  componentDidMount() {
    if (!this.props.isFullPosts || !this.props.isFullPost) {
      this.props.getFullPosts();
    }
  }

  componentWillUnmount() {
    if (!window.location.href.match(/posts/, "gi")) this.props.getPagState(0);
  }
  render() {
    if (!this.props.postsStatus || this.props.postsStatus === "loading") return <Preloader />;
    if (this.props.postsStatus === "error") return <ErrorPage />;
    return (
      <div className="posts">
        <div className="container">
          <div className="posts__inner">
            <h1>Посты</h1>
            <PostList
              posts={this.props.posts.slice(
                this.props.currentPagPage * POSTS_COUNT,
                (this.props.currentPagPage + 1) * POSTS_COUNT
              )}
            />
            {Math.ceil(this.props.posts.length / POSTS_COUNT) > 1 && (
              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={Math.ceil(this.props.posts.length / POSTS_COUNT)}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__prev"}
                nextLinkClassName={"pagination__next"}
                pageClassName={"pagination__num"}
                breakClassName={"pagination__break"}
                disabledClassName={"pagination__num--disabled"}
                activeClassName={"pagination__num_active"}
                forcePage={this.props.currentPagPage}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts.loadedPosts,
    postsStatus: state.posts.status,
    isFullPosts: state.posts.isFull,
    isFullPost: state.posts.isFullPost,
    users: state.users.loadedUsers,
    usersStatus: state.users.status,
    currentPagPage: state.pagState,
  };
}
const mapDispathToProps = {
  getFullPosts,
  getPagState,
};
export default connect(mapStateToProps, mapDispathToProps)(Posts);
