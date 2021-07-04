import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "actions/authActions";
import classnames from "classnames";

import styles from 'cssModules/LoginRegister.module.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to Home screen
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Only update if not already equal
    if (nextProps.errors !== prevState.errors) {
      return { ...prevState, errors: nextProps.errors };
    }
    else return null; // Triggers no change in the state
  }
  
  // Depracated so have to use BS above
  /*componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }*/
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    // On submit button clicked, this prevents page refresh
    e.preventDefault();
    
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    
    this.props.registerUser(newUser, this.props.history); 
  };
  
  render() {
    const { errors } = this.state;
    
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.formWrapper }>
            <div>
              <h4>
                <b>Register</b> below
              </h4>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={ this.onSubmit }>
              <div>
                <label htmlFor="firstname">First Name</label>
                <br />
                <span>{ errors.firstname }</span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.firstname }
                  error={ errors.firstname }
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
              </div>
              <div>
                <label htmlFor="lastname">Last Name</label>
                <br />
                <span >{ errors.lastname }</span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.lastname }
                  error={ errors.lastname }
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <span >{ errors.email }</span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.email }
                  error={ errors.email }
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <span >{ errors.password }</span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.password }
                  error={ errors.password }
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
              </div>
              <div>
                <label htmlFor="password2">Confirm Password</label>
                <br />
                <span >{ errors.password2 }</span>
                <input
                  onChange={ this.onChange }
                  value={ this.state.password2 }
                  error={ errors.password2 }
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
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
                  Sign up
                </button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string
  ]),
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));