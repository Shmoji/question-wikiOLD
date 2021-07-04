/* This is meant to just be a Modal that appears in certain circumstances to show user is not registered
   Currently it appears when pressing ask button on header and pressing answer button on QPPersonal page. */
import React from "react";
import styles from "../cssModules/NotRegistered.module.css";
import { Link } from 'react-router-dom';

class NotRegistered extends React.Component {

  render() {
    // This makes it so modal is only shown when meant to (based on state of other component taken in as props here)
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={ styles.modal }>
        <div className={ styles.content }>
          <p>You need an account to ask and answer questions.</p>
          <Link to='/Register' onClick={ this.props.onClose }><button className={ styles.regBtn }>Create Account</button></Link>
          
          <Link to='/Login' onClick={ this.props.onClose }><button className={ styles.loginBtn }>Login</button></Link>
          <button onClick={ this.props.onClose } className={ styles.loginBtn }>Close</button>
        </div>
      </div>
    );
  }
}

export default NotRegistered;