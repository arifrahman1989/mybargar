import React, { Component } from 'react';
import { Formik } from 'formik';
import './Auth.css';
import { auth } from '../../Redux/authActionCretors';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}
class Auth extends Component {
    state = {
        mode: "Sign Up",
    }
    swithHandle = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" });
    }
    render() {
        let err = null;
        if (this.props.authFailedMsg != null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            confirmpassword: "",
                        }
                    }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }
                    const validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 4) {
                            errors.password = 'Push Minimum Four Charactar';
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.confirmpassword) {
                                errors.confirmpassword = 'Required';
                            } else if (values.password !== values.confirmpassword) {
                                errors.confirmpassword = 'Password Field Does not Match';
                            }
                        }

                        //console.log('Error:', errors);
                        return errors;

                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (<div>

                        <button className="btn btn-lg btn-success dbutton" onClick={this.swithHandle}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"} </button>
                        <form onSubmit={handleSubmit}>
                            <input
                                name='email'
                                placeholder='Enter Your Email(ar@gmail.com)'
                                className='form-control'
                                value={values.email}
                                onChange={handleChange}
                            />
                            <span className='warning'>{errors.email}</span>
                            <br />
                            <input
                                type="password"
                                name="password"
                                placeholder='112233'
                                onChange={handleChange}
                                className='form-control'
                                value={values.password}
                            />
                            <span className='warning'>{errors.password}</span>
                            <br />
                            {this.state.mode === "Sign Up" ? <div>
                                <input
                                    type = 'password'
                                    name='confirmpassword'
                                    placeholder='Confirm Password'
                                    className='form-control'
                                    value={values.confirmpassword}
                                    onChange={handleChange}
                                />
                                <span className='warning'>{errors.confirmpassword}</span>
                                <br />
                            </div> : null}

                            <button type='submit' className='btn btn-success'>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                        </form>
                    </div>)}
                </Formik>
            )
        }
        return (
            <div className='formsidbar'>
                {err}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
