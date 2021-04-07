import { Component } from 'react';
import User from "../User/index.js";
import './style.scss';

class UsersList extends Component {
  constructor(props) {
    
    super(props);
    
  }

  render() {
    return (
      <div className="UsersList">{
        this.props.users.map(elem => {
            return <User {...elem} key={elem.id} />
          })
      }</div>
    );
  }
}

export default UsersList;