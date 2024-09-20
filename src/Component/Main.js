import React, { Component } from 'react';
import Header from './Header/Header';
import Burgar from './Burgar/Burgar';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/checkout';
import Auth from './Auth/Auth';
import Logout from './Auth/logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheck } from '../Redux/authActionCretors';

const mapStateToProps = state => {
    return {

        token: state.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;

        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/order" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={Burgar} />
                    <Redirect to="/" />
                </Switch>
            )


        }
        return (
            <div>
                <Header />
                <div class='container'>
                    {routes}
                </div>

            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);