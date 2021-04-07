import { Component } from "react";
import "./style.scss";

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defaultValue,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(evt) {
    evt.preventDefault();
    this.setState({ inputValue: evt.target.value }, () => {
      if (this.state.inputValue === "") {
        this.props.searchValue("");
      }
    });
  }
  render() {
    return (
      <form className="user-search">
        <input
          autoComplete="off"
          type="search"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          className="user-search__input"
        />
        <div
          className="user-search__button"
          onClick={() => {
            this.props.searchValue(this.state.inputValue, this.state.inputValue !== "" ? true : false);
          }}
        >
          Искать
        </div>
        {this.props.isSearch && (
          <p className="user-search__result-count">Найдено пользователей: {this.props.findUsers}</p>
        )}
      </form>
    );
  }
}
export default UserSearch;
