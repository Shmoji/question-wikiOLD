import React from 'react';
import { connect } from "react-redux";
import styles from 'cssModules/QuestionPage.module.css'; // Need to put .module for CSS module files
import AnswerSection from './TabComponents/AnswerSection';
import client from "utils/client";

class SimpleTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      answersList: [],
    };
  }

  componentDidUpdate() {
    this._init();
  }

  componentDidMount() {
    this._init();
  }

  submitAnswer = (answer, successCallback) => {
    client.post('/api/answer/simple', {
      answer: answer,
      sort_order: this.state.answersList.length,
      question_id: this.props.questionId,
    })
    .then(res => {
      this._updateAnswersFromServer();
      successCallback();
    })
    .catch(err => {
      console.log(err);
    });
  }

  saveEditAnswer = (answerId, body, success, fail) => {
      client.patch('/api/answer/simple', {
          id: answerId,
          body,
      })
      .then(res => {
        success();
        this._updateAnswersFromServer();
      })
      .catch(err => {
        fail();
        console.log(err);
      });
  }

  saveSortOrder = (answers) => {
    answers.forEach((item, index) => {
      item.sort_order = index;
      client.patch('/api/answer/simple/order', item)
      .then(res => {
        this._updateAnswersFromServer();
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  deleteAnswer = (answerId) => {
    client.delete('/api/answer/simple', {
      data: {
        id: answerId,
      },
    })
    .then(res => {
      this._updateAnswersFromServer();
    })
    .catch(err => {
      console.log(err);
    });
  }

  _init() {
    if (this.state.initialized === false && this.props.simpleData.map !== undefined) {
      this._setAnswers(this.props.simpleData);
    }
  }

  _updateAnswersFromServer = () => {
    client.get(`/api/question/${this.props.questionId}/simplewiki`)
    .then(response => {
      this._setAnswers(response.data.data);
    });
  }

  _setAnswers(dataFromServer) {
    this.setState({
      initialized: true,
      answersList: dataFromServer,
    });
  }

  render() {
    return (
      <div className={ styles.qpSimple }>
        <p>Quick and Simple Answer</p>
        <p>Looking for the TL;DR version of the answer? You found it!</p>
        <hr />
        <AnswerSection
          index={ 0 }
          items={ this.state.answersList }
          showHeader={ false }
          submitAnswer={ this.submitAnswer }
          saveSortOrder={ this.saveSortOrder }
          deleteAnswer={ this.deleteAnswer }
          saveEditAnswer={ this.saveEditAnswer }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  simpleData: state.curQuestionData.simpleData
});

export default connect(mapStateToProps)(SimpleTab);