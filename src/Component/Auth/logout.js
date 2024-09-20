import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../Redux/authActionCretors';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <Redirect to="/" />
        )
    }
}


export default connect(null, mapDispatchToProps)(Logout);