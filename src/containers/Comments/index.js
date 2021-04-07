import { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import CommentsList from "../../components/CommentsList/index.js";
import "./style.scss";
import { getFullComments } from "../../actions/comments/getFullComments";
import { getPagState } from "../../actions/pagination/getPagState";
import { getFilterCommentsState } from "../../actions/comments/getFilterCommentsState";
import { removeFilterCommentsState } from "../../actions/comments/removeFilterCommentsState";
import Preloader from "../../components/Preloader/index";
import ErrorPage from "../../components/ErrorPage/Index.js";

const COMMENTS_COUNT = 10;

class Comments extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.createComments = this.createComments.bind(this);
  }
  createComments() {
    let comments = Object.assign([], this.props.comments);
    for (let key in this.props.filters) {
      if (this.props.filters[key] !== null) {
        comments = comments.filter((elem) => elem[key] === this.props.filters[key]);
      }
    }
    return comments;
  }

  handleChange(field, selectedOption) {
    this.handlePageClick({ selected: 0 });
    let filter = Object.assign({}, this.props.filters);
    let newState = Object.assign(filter, {
      [field]: selectedOption !== null ? selectedOption.value : null,
    });
    this.props.getFilterCommentsState(newState);
  }

  setOptions(option) {
    let arr = [];
    this.props.comments
      .map((elem) => elem[option])
      .filter((item, pos, arr) => arr.indexOf(item) == pos)
      .forEach((elem) => {
        arr.push({
          value: elem,
          label: elem,
        });
      });
    return arr;
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.props.getPagState(selected);
  }
  componentDidMount() {
    if (!this.props.isFullComments) {
      this.props.getFullComments();
    }
  }
  componentWillUnmount() {
    this.props.getPagState(0);
    this.props.removeFilterCommentsState();
  }
  render() {
    if (!this.props.commentsStatus || this.props.commentsStatus === "loading" || !this.props.isFullComment)
      return <Preloader />;
    if (this.props.commentsStatus === "error") return <ErrorPage />;
    let comments = this.createComments();
    return (
      <div className="comments">
        <div className="container">
          <h1>Комментарии</h1>
          <div className="comments__filters">
            <Select
              className="comments__filter"
              isClearable={true}
              value={
                this.props.filters.email !== null
                  ? { value: this.props.filters.email, label: this.props.filters.email }
                  : null
              }
              onChange={this.handleChange.bind(this, "email")}
              options={this.setOptions("email")}
              placeholder={"Email"}
            />
            <Select
              className="comments__filter"
              isClearable={true}
              value={
                this.props.filters.postTitle !== null
                  ? { value: this.props.filters.postTitle, label: this.props.filters.postTitle }
                  : null
              }
              onChange={this.handleChange.bind(this, "postTitle")}
              options={this.setOptions("postTitle")}
              placeholder={"Заголовок поста"}
            />
          </div>

          <CommentsList
            comments={comments.slice(
              this.props.currentPagPage * COMMENTS_COUNT,
              (this.props.currentPagPage + 1) * COMMENTS_COUNT
            )}
          />
          {Math.ceil(comments.length / COMMENTS_COUNT) > 1 && (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={Math.ceil(comments.length / COMMENTS_COUNT)}
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
    );
  }
}
function mapStateToProps(state) {
  return {
    comments: state.comments.loadedComments,
    commentsStatus: state.comments.status,
    isFullComment: state.comments.isFullComment,
    isFullComments: state.comments.isFull,
    currentPagPage: state.pagState,
    filters: state.filterСommentsState,
  };
}
const mapDispathToProps = {
  getFullComments,
  getPagState,
  getFilterCommentsState,
  removeFilterCommentsState
};
export default connect(mapStateToProps, mapDispathToProps)(Comments);
