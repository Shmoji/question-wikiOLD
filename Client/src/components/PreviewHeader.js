import React from 'react';
import styles from '../cssModules/TopHeader.module.css'; // Need to put .module for CSS module files
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class TopHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userBtnOpen: false,
    }

    // We will need the raw DOM element for detecting clicks so we will need to use refs
    this.container = React.createRef();
  }

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
    let accountDD = null;
    let accountTitle = "";
    if (this.props.auth.isAuthenticated) {
      accountTitle = "Account";
      accountDD = <div className={ styles.dropdown }>
                    <ul>
                      <Link to='/' onClick={ this.onLogoutClick }><li>Logout</li></Link>
                    </ul>
                  </div>
    } 

    return (
      <div className={ styles.headerSpacer }>
        <div className={ styles.header }>
          <Link to='/' className={ styles.brand }>Question Wiki</Link>
          <Link to='/'><div className={ styles.btn }>
            <i className="fas fa-home fa-lg" style={{ marginRight: 6 }}></i>
            <span>Home</span>
          </div></Link>

          <Link to='/NewsPage'><div className={ styles.btn }>
            <i className="fas fa-pizza-slice fa-lg" style={{ marginRight: 6 }}></i>
            <span>News</span>
          </div></Link>

          <Link to="/EmailList"><div className={ styles.btn }>
            <i className="far fa-envelope fa-lg" style={{ marginRight: 6 }}></i>
            <span>Join Email List</span>
          </div></Link>

          <a href="https://twitter.com/QuestionWiki" target="_blank" rel="noopener noreferrer">
            <div className={ styles.btn }>
              <i className="fab fa-twitter fa-lg" style={{ marginRight: 6 }}></i>
            </div>
          </a>

          <a href="https://www.facebook.com/groups/247683586544796/" target="_blank" rel="noopener noreferrer">
            <div className={ styles.btn }>
              <i className="fab fa-facebook fa-lg" style={{ marginRight: 6 }}></i>
            </div>
          </a>

          <a href="https://www.youtube.com/channel/UCucDAIamDmDZNiDCgcNHO0A" target="_blank" rel="noopener noreferrer">
            <div className={ styles.btn }>
              <i className="fab fa-youtube fa-lg" style={{ marginRight: 6 }}></i>
            </div>
          </a>

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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(TopHeader);