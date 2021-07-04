import React from 'react';
import styles from '../cssModules/TopHeader.module.css'; // Need to put .module for CSS module files
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import AskModal from './AskModal';

class TopHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userBtnOpen: false,
      showAskModal: false,
    }

    // We will need the raw DOM element for detecting clicks so we will need to use refs
    this.container = React.createRef();
  }

  showAskModal = e => {
    this.setState(state => {
      return {
        // TODO: may need to keep rest of state here too
        showAskModal: !state.showAskModal
        }
    });
  };

  // These are needed to detect clicks outside dropdowns (to close the dropdowns on click)
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    /* We need to check to make sure that our current is actually filled in with a DOM element.
       Then using the DOM method contains we ask our container if we have the event.target which is the
       DOM element that was clicked */
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        userBtnOpen: false,
      });
    }
  };

  handleUserBtnClick = () => {
    this.setState(state => {
      return {
        userBtnOpen: !state.userBtnOpen,
      };
    });
  };

  onLogoutClick = e => {
    // On logout clicked, this prevents page refresh
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    let accountTitle = "";
    let accountDD = null;
    // If user logged in, account dropdown shows several different account options (just logout for now)
    if (this.props.auth.isAuthenticated) {
      accountTitle = "Account";
      accountDD = <div className={ styles.dropdown }>
                    <ul>
                      <Link to='/' onClick={ this.onLogoutClick }><li>Logout</li></Link>
                    </ul>
                  </div>
    } else {
      // Else if not logged in, show register and login buttons
      accountTitle = "Not logged in";
      accountDD = <div className={ styles.dropdown }>
                    <ul>
                      <Link to='/Login'><li>Login</li></Link>
                      <Link to='/Register'><li>Register</li></Link>
                    </ul>
                  </div>
    }

    return (
      <div className={ styles.header }>
        <Link to='/' className={ styles.brand }>Question Wiki</Link>
        <Link to='/'>
          <div className={ styles.btn }>
            <i className="fas fa-home fa-lg" style={{ marginRight: 6 }}></i>
            <span>Home</span>
          </div>
        </Link>
        <Link to='/unanswered'>
          <div className={ styles.btn }>
            <i className="far fa-edit fa-lg" style={{ marginRight: 6 }}></i>
            <span>Answer</span>
          </div>
        </Link>
        <div className={ styles.notbtn }>
          <i className="far fa-bell fa-lg" style={{ marginRight: 6 }}></i>
          <span>Notifications</span>
        </div>
        <input type="text" placeholder="Search.." className={ styles.searchbar }></input>
        <div className={ styles.btn } onClick={e => { this.showAskModal(e); }}>
          <i className="far fa-question-circle fa-lg" style={{ marginRight: 6 }}></i>
          <span>Ask Question</span>
        </div>
        {/* We pass our ref to the ref prop on our DOM element and we will have access to container div later */}
        <div className={ styles.ddContainer } ref={ this.container } onClick={ this.handleUserBtnClick }>
          <i className="fas fa-user-circle fa-lg" style={{ marginRight: 6 }}></i>
          { accountTitle }
          {
            // This syntax says "if btn clicked, show dropdown. ELSE: do not"
            this.state.userBtnOpen && (
              accountDD
            )
          }
        </div>

        <AskModal onClose={ this.showAskModal } show={ this.state.showAskModal } />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(TopHeader);