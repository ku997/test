import {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SinglePost from "../SinglePost/index.js";
import Header from '../../components/Header/index.js';
import Users from '../Users/index.js';
import Posts from '../Posts/index.js';
import Comments from '../Comments/index.js';

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={Users} />
                    <Route exact path='/posts/:id' component={SinglePost}/>
                    <Route path='/posts' component={Posts} />
                    <Route exact path='/comments' component={Comments} />
                </Switch>
            </Router>
        );
    }
}


export default App;