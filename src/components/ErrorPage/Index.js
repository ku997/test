import {Component} from 'react';
import "./style.scss";

class ErrorPage extends Component {
    render() {
        return (
            <div className="errorpage">
                <div className="errorpage__image"><img src="https://c.tenor.com/KLM8keUQpSwAAAAj/google-error404robot-error404.gif" alt=""/></div>
                <p className="errorpage__text">Что-то пошло не так... Попробуйте перезагрузить страницу.</p>
            </div>
        );
    }
}


export default ErrorPage;