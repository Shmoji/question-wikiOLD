import React from 'react';
import { connect } from "react-redux";
import styles from 'cssModules/QuestionPage.module.css'; // Need to put .module for CSS module files


class DiscussionTab extends React.Component {

  render() {
    return (
      <div className={ styles.qpPersonal }>
        <p>Dive right in and chat with people on this topic. Learn from each other!</p>
        <p>{ this.props.discussions.length } Discussions</p>
        <hr />
        {
          this.props.discussions.map((item, ind) => {
            return (
              <div className={ styles.qpPersonalAnswer } key={ ind }>
                <div className={ styles.infouser }>
                  <div className={ styles.userimg }>
                    <img src={ process.env.PUBLIC_URL + '/images/avatar.png' } alt="MISSING img" width="40px" height="40px"></img> {/* User's image */}
                  </div>
                  <div className={ styles.usertxt }>
                    <p>{ item.firstname + ' ' + item.lastname }, { item.user_title }</p>
                    <p>Answered on { new Date(Date.parse(item.post_date)).toDateString() }</p>
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
                      <button>More Options</button>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  discussions: state.curQuestionData.discussions
});

export default connect(mapStateToProps)(DiscussionTab);