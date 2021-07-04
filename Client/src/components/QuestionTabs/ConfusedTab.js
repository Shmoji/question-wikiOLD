import React from 'react';
import { connect } from "react-redux";
import styles from 'cssModules/QuestionPage.module.css';
import AnswerSection from './TabComponents/AnswerSection';
import client from 'utils/client';

class ConfusedTab extends React.Component {
  constructor(props) {
    super(props);

    // This always has exact same 2 sections for ALL questions
    this.state = {
      initialized: false,
      sections: [
        { id: 0, title: 'Common Confusion', type: 'common_confusion', answers: [] },
        { id: 1, title: 'Still Confused? Try this', type: 'still_confused', answers: [] }
      ]
    } 
  }

  componentDidMount() {
    this._init();
  }

  componentDidUpdate() {
    this._init();
  }

  submitAnswer = (answer, successCallback, index) => {
    client.post('/api/answer/help', {
      answer,
      question_id: this.props.questionId,
      sort_order: this.state.sections[index].answers.length,
      type: this.state.sections[index].type,
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
    client.patch('/api/answer/help', {
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
      client.patch('/api/answer/help/order', item)
      .then(res => {
        this._updateAnswersFromServer();
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  deleteAnswer = (answerId) => {
    client.delete('/api/answer/help', {
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
    if (this.state.initialized === false && this.props.help.forEach !== undefined) {
      this._setAnswers(this.props.help);
    }
  }

  _updateAnswersFromServer = () => {
    client.get(`/api/question/${this.props.questionId}/help`)
    .then(response => {
      this._setAnswers(response.data.data);
    });
  }

  _setAnswers(dataFromServer) {
    let commonConfusion = [];
    let stillConfused = [];
    dataFromServer.forEach(answer => {
      if (answer.type === 'common_confusion') {
        commonConfusion.push(answer);
      } else {
        stillConfused.push(answer);
      }
    });

    this.setState({
      initialized: true,
      sections:[
        {
          ...this.state.sections[0],
          answers: commonConfusion,
        },
        {
          ...this.state.sections[1],
          answers: stillConfused,
        },
      ]
    });
  }

  render() {
    return (
      <div className={ styles.qpSimple }>
        <p>Help Page</p>
        <p>Help your confused fellow man/woman! Sometimes topics seem like a different topic.
          I mean, is a zebra <span style={{fontStyle:'italic'}}>really</span> a horse of a different color?</p>
        <hr />
        {
          this.state.sections.map((section, index) => {
            return (
              <AnswerSection
                key={ index }
                index={ index }
                title={ section.title }
                items={ section.answers }
                showHeader={ true }
                submitAnswer={ this.submitAnswer }
                saveSortOrder={ this.saveSortOrder }
                deleteAnswer={ this.deleteAnswer }
                saveEditAnswer={ this.saveEditAnswer }
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  help: state.curQuestionData.help
});

export default connect(mapStateToProps)(ConfusedTab);