import React from "react";
import styles from "../cssModules/AskModal.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'; // withRouter lets you use this.props.history

import NotRegistered from "./NotRegistered";
import client from "../utils/client";

class AskModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onClose = e => {
    this.setState({ value: '' });
    this.props.onClose && this.props.onClose(e);
  };

  handleChange(event) {    this.setState({value: event.target.value});  }

  handleSubmit(event) {
    event.preventDefault();

    client.get(`/api/questions`)
      .then(response => { 
        const numQuestions = response.data.data.length;
        const questionData = {
          id: numQuestions + 1,
          user_id: this.props.auth.user.id,
          view_count: 1,
          title: this.state.value
        }

        client
          .post(`/api/new-question`, questionData)
          .then(res => {
            this.setState({ value: '' });
            this.onClose();
            
            const urlTitle = questionData.title.replace('?', '').replace(' ', '-');
            const questionPage = `/${questionData.id}/${urlTitle}/Simple`;
            this.props.history.push(questionPage);
          }) 
          .catch(err =>
            console.log('Issue posting new question')
          );

          })
  }

  render() {
    // This makes it so modal is only shown when meant to (based on state of other component taken in as props here)
    if (!this.props.show) {
      return null;
    }

    if (!this.props.auth.isAuthenticated) {
      return (
        // Little weird having a Modal inside of a Modal..but it okay
        <NotRegistered onClose={ this.onClose } show={ this.props.show } />
      );
    }
    
    return (
      <div className={ styles.modal }>
        <h2>Ask Question</h2>
        <div className={ styles.content }>

          <div className={ styles.infouser }>
            <div className={ styles.userimg }>
              <img src={ process.env.PUBLIC_URL + '/images/avatar.png' } alt="MISSING img" width="40px" height="40px"></img> {/* User's image */}
            </div>
            <div className={ styles.usertxt }>
              <p>{ this.props.auth.user.firstname + ' ' + this.props.auth.user.lastname }</p>
            </div>
          </div>

          <br />

          <textarea placeholder="Start typing your question..." autoFocus={true}
            value={ this.state.value } onChange={ this.handleChange } />

        </div>
        <div className={ styles.actions }>
          <button onClick={ this.onClose }>Cancel</button>
          <button onClick={ this.handleSubmit }>Ask Question</button>
        </div>
      </div>
    );
  }

}

AskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(AskModal));

