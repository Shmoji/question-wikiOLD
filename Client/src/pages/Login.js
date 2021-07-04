import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "actions/authActions";
import classnames from "classnames";

import styles from 'cssModules/LoginRegister.module.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth !== prevState.auth && nextProps.errors !== prevState.errors) {
      if (nextProps.auth.isAuthenticated) {
        nextProps.history.push("/");
      }
      return { ...prevState, auth: nextProps.auth, errors: nextProps.errors };
    } else if (nextProps.auth !== prevState.auth) {
      if (nextProps.auth.isAuthenticated) {
        nextProps.history.push("/");
      }
      return { ...prevState, auth: nextProps.auth };
    } else if (nextProps.errors !== prevState.errors) {
      return { ...prevState, errors: nextProps.errors };
    } else {
      return null;
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    
    this.props.loginUser(userData);
  };
  
  render() {
    const { errors } = this.state;
    
    return (
      <div className={ styles.wrapper }>
          <div className={ styles.formWrapper }>
            <div>
              <h4>
                <b>Login</b> below
              </h4>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={ this.onSubmit }>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <span >
                  { errors.email }
                  { errors.emailnotfound }
                </span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.email }
                  error={ errors.email }
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <span >
                  { errors.password }
                  { errors.passwordincorrect }
                </span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.password }
                  error={ errors.password }
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
              </div>
              <div>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className=""
                >
                  Login
                </button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);