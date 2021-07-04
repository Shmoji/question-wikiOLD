import React from 'react';
import { connect } from "react-redux";
import styles from 'cssModules/QuestionPage.module.css'; // Need to put .module for CSS module files

import RichTextEditor from 'components/RichTextEditor';
import NotRegistered from 'components/NotRegistered';
import client from "utils/client";

class PersonalTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answering: false, // Turns true once user presses button to answer the question. Only way back to false is page refresh
      isModalShown: false, // The NotRegistered Modal
      options: { isOpen: false, ansInd: -1 },  // The more options button on each answer
    }
  }

  // Set the NotRegistered Modal to shown or not shown
  showModal = () => {
    this.setState(state => {
      return {
        isModalShown: !state.isModalShown
      }
    });
  };

  // Called when Answer button, beside the follow button, is pressed
  answerBtnPressed = () => {
    // If user is logged in, show box to answer. ELSE-> show NotRegistered Modal
    if (!this.props.auth.isAuthenticated) {
      this.showModal();
    }
    else {
      this.setState(state => {
        return {
          answering: true
        }
      });
    }
  }

  // The more options button on each answer
  handleOptionsClick = (ansInd) => {
    this.setState(state => {
      return {
        options: { isOpen: !state.options.isOpen, ansInd: ansInd }
      }
    });
  }

  deleteAnswer = (ansId) => {
    client
      // IMPORTANT: for axios deleting, need to use data key with objects, just like so
      .delete(`/api/answer/personal`, { data: { id: ansId } })
      .then(res => {
        this.setState(state => {
          return {
            options: { isOpen: false, ansInd: -1 }
          }
        });
        // Passed all the way from QuestionPage.js
        this.props.fetchData(); 
        console.log('axios delete successful');
      }) 
      .catch(err =>
        console.log('Issue deleting answer')
      );
  }

  render() {
    const cssAnsBtn = this.state.answering ? styles.ansBtnActivated : styles.btn;
    
    return (
      <div className={ styles.qpPersonal }>
        <p>Read everyone's individual opinions on the matter to get a well-rounded view of the topic.</p>
        {/* This div contains the btns at the top for FOLLOW, ANSWER, etc */}
        <div className={ styles.actionBtns }>
          <p>{ this.props.answers.length } Answers: </p>
          <div className={ cssAnsBtn } onClick={ this.answerBtnPressed }>
            <i className="fas fa-edit fa-md" style={{ marginRight: 7 }}></i>
            <span>Answer</span>
          </div>
          <div className={ styles.btn }>
            <i className="fas fa-eye fa-md" style={{ marginRight: 7 }}></i>
            <span>Follow</span>
          </div>
        </div>

        {/* This div contains the box to answer the question after pressing answer button */}
        {
          // This syntax says "if btn clicked, show answer box (defined in parenthesis). ELSE: do not"
          this.state.answering && (
            <div>
              <RichTextEditor fetchData={ this.props.fetchData } />
            </div>
          )
        }

        <hr />
        {
          this.props.answers.map((item, ind) => {

            let optionsDD = null;
            // User can only delete THEIR answers
            if (this.props.auth.isAuthenticated && this.props.auth.user.id === item.user_id) {
              optionsDD = <div className={ styles.dropdown }>
                            <ul>
                              <li onClick={ () => this.deleteAnswer(item.id) }>Delete Your Answer</li>
                            </ul>
                          </div>
            }
            else {
              optionsDD = <div className={ styles.dropdown }>
                            <ul>
                              <li>Do something #1</li>
                              <li>Do something #2</li>
                              <li>Do something #3</li>
                            </ul>
                          </div>
            }
            
            return (
              <div className={ styles.qpPersonalAnswer } key={ ind }>
                <div className={ styles.infouser }>
                  <div className={ styles.userimg }>
                    <img src={ process.env.PUBLIC_URL + '/images/avatar.png' } alt="MISSING img" width="40px" height="40px"></img> {/* User's image */}
                  </div>
                  <div className={ styles.usertxt }>
                    <p>{ item.firstname + ' ' + item.lastname }, { item.user_title }</p>
                    <p>Answered on { new Date(Date.parse(item.answer_date)).toDateString() }</p>
                  </div>
                  <p className={ styles.infotext }>
                    { item.body }
                  </p>
                  <div className={ styles.answerBtns }>
                    <div className={ styles.left }> {/* Left aligned */}
                      <i className={`fas fa-caret-up fa-3x ${ styles.upvote }`}></i>
                      <span>Upvote ~ { item.upvotes }</span> {/* Number of upvotes */}
                      <i className="fas fa-share"></i>
                      <span>Share ~ { item.shares }</span>
                    </div>
                    <div className={ styles.right }> {/* Right aligned */}
                      <i className={`fas fa-caret-down fa-3x ${ styles.upvote }`}></i>
                      <span>Downvote</span> 
                      {/* We pass our ref to the ref prop on our DOM element. Used to click on screen and cancel the popup */}
                      <div className={ styles.ddContainer } ref={ this.container } onClick={ () => this.handleOptionsClick(ind) }>
                        <p>More Options</p>
                        {
                          // This syntax says "if this answer's btn clicked, show dropdown. ELSE: do not"
                          this.state.options.isOpen && (this.state.options.ansInd === ind) && (
                            optionsDD
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className={ styles.comments }>
                    <input placeholder="Add a comment..."></input>
                    <span>Recommended</span>
                    <span>All</span>
                  </div>
                </div>
              </div>
            )
          })
        }

        <NotRegistered onClose={ this.showModal } show={ this.state.isModalShown } />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  answers: state.curQuestionData.answers
});

export default connect(mapStateToProps)(PersonalTab);