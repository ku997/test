import { Component } from "react";
import { connect } from "react-redux";
import UsersList from "../../components/UsersList/index.js";
import UserSearch from "../../components/UserSearch/index.js";
import "./style.scss";
import { getUsers } from "../../actions/users/getUsers";
import { getSearchState } from "../../actions/users/getSearchState";
import { getUsersPagState } from "../../actions/users/getUsersPagState";
import { resetUsersPagState } from "../../actions/users/resetUsersPagState";
import Preloader from "../../components/Preloader/index";
import ErrorPage from "../../components/ErrorPage/Index.js";

const USERS_TO_SHOW = 10;

class Users extends Component {
  constructor(props) {
    super(props);
    this.showMoreUsers = this.showMoreUsers.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.usersSearch = this.usersSearch.bind(this);

    this.state = {
      isSearch: false,
    };
  }

  usersSearch() {
    let value = !this.props.search ? '' : this.props.search;
    if (value === "") return this.props.users;
    let users = Object.assign([], this.props.users);
    users = users.filter((elem) => {
      if (elem.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        return elem;
      }
    });
    return users;
  }
  searchValue(value, isSearch) {
    this.props.getSearchState({ users: value });
    this.setState({
      isSearch: isSearch,
    });
    if(!isSearch){this.props.resetUsersPagState(USERS_TO_SHOW)}
  }
  showMoreUsers() {
    this.props.getUsersPagState(USERS_TO_SHOW);
  }

  componentDidMount() {
    if (!this.props.status || this.props.status === "error") this.props.getUsers();
    if (this.props.search && this.props.search !== "") this.searchValue(this.props.search, true);
    if (this.props.pagState == 0) {
      this.props.getUsersPagState(USERS_TO_SHOW);
    }
  }
  componentWillUnmount() {
    this.props.getSearchState({ users: "" });
  }
  render() {
    if (this.props.status === "loading") return <Preloader />;
    if (this.props.status === "error") return <ErrorPage />;
    let search = this.usersSearch();
    return (
      <div className="users">
        <div className="container">
          <h1 className="">Пользователи</h1>
          <p className="users__count">{`Всего пользователей: ${this.props.users.length}`}</p>
          <UserSearch
            searchValue={this.searchValue}
            findUsers={search.length}
            isSearch={this.state.isSearch}
            defaultValue={this.props.search}
          />
          <UsersList users={search.slice(0, this.props.pagState)} />
          {this.props.pagState < search.length && (
            <div className="more-users" onClick={this.showMoreUsers}>
              Показать еще
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.users.loadedUsers,
    status: state.users.status,
    search: state.searchState.users,
    pagState: state.usersPagState,
  };
}
const mapDispathToProps = {
  getUsers,
  getSearchState,
  getUsersPagState,
  resetUsersPagState
};
export default connect(mapStateToProps, mapDispathToProps)(Users);
