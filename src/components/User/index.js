import { Component } from 'react';
import './style.scss';

class User extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="user">
                <div className="user__image">
                    <img src='https://memepedia.ru/wp-content/uploads/2016/03/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg' alt="user image" />
                </div>
                <div className="user__data">
                    <p className="user__name">{this.props.name}</p>
                    <p className="user__email">{this.props.email}</p>
                    <p className="user__tel">{this.props.phone}</p>
                </div>
            </div>
        );
    }
}
export default User;