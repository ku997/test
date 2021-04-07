import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { authUser } from "../../actions/users/getAuthUser";
import { editUser } from "../../actions/users/editUser";
import Modal from "../Modal/index";
import "./style.scss";
const listItems = [
  { id: 0, url: "/", text: "Пользователи" },
  { id: 1, url: "/posts", text: "Посты" },
  { id: 2, url: "/comments", text: "Комментарии" },
];
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: "",
      email: "",
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      name: this.props.user.name,
      email: this.props.user.email,
    });
  }

  handleModalInputChange(key, evt) {
    evt.preventDefault();
    this.setState({ [key]: evt.target.value });
  }

  handleModalSubmit(evt) {
    evt.preventDefault();
    if (this.state.email !== "" && this.state.name !== "") {
      this.setState({
        editUser: !this.state.editUser,
      });
      if (this.props.user.email !== this.state.email || this.props.user.name !== this.state.name) {
        let payload = {
          id: this.props.user.id,
          name: this.state.name,
          email: this.state.email,
        };
        this.props.editUser(payload);
      }
    }
    this.toggleModal();
  }
  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
    });
    if (Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object) this.props.authUser();
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <ul className="menu">
            {listItems.map((item) => {
              return (
                <li className="menu__item" key={item.id}>
                  <NavLink
                    exact
                    activeClassName="menu__link--active"
                    className="menu__link"
                    to={item.url}
                    key={item.id}
                  >
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="header__user" onClick={this.toggleModal}>
            <div className="header__user-img">
              <img
                src="https://memepedia.ru/wp-content/uploads/2016/03/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg"
                alt="user image"
              />
            </div>
            <p className="header__user-name">{this.props.user.name}</p>
          </div>
        </div>
        {this.state.showModal && (
          <Modal modalCloseFoo={this.toggleModal}>
            <form className="user-edit">
              <div className="user-edit__image">
                <img
                  src="https://memepedia.ru/wp-content/uploads/2016/03/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg"
                  alt=""
                />
              </div>
              <input
                required
                autoComplete="off"
                defaultValue={this.props.user.name}
                onChange={this.handleModalInputChange.bind(this, 'name')}
                type="text"
                name="Name"
                className="user-edit__name"
              />
              <input
                required
                autoComplete="off"
                defaultValue={this.props.user.email}
                onChange={this.handleModalInputChange.bind(this, 'email')}
                type="text"
                name="Email"
                className="user-edit__email"
              />
              <button type="submit" className="user-edit__btn-submit" onClick={this.handleModalSubmit}>
                Сохранить
              </button>
            </form>
          </Modal>
        )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authUser,
  };
}
const mapDispathToProps = {
  authUser,
  editUser,
};

export default connect(mapStateToProps, mapDispathToProps)(Header);
