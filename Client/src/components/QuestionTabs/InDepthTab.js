import React from 'react';
import { connect } from "react-redux";
import styles from 'cssModules/QuestionPage.module.css';
import client from 'utils/client';
import AnswerSection from './TabComponents/AnswerSection';
import SectionModeMenu from './TabComponents/SectionModeMenu';
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';

class InDepthTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      newSection: '',
      sections: [],
      isSectionEditMode: false,
      isSectionSortMode: false,
    } 
  }

  componentDidMount() {
    this._init();
  }

  componentDidUpdate() {
    this._init();
  }

  submitAnswer = (answer, successCallback, index) => {
    client.post('/api/answer/indepthwiki', {
      answer,
      section_id: this.state.sections[index].id,
      sort_order: this.state.sections[index].answers.length,
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
    client.patch('/api/answer/indepthwiki', {
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
      client.patch('/api/answer/indepthwiki/order', item)
      .then(res => {
        this._updateAnswersFromServer();
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  deleteAnswer = (answerId) => {
    client.delete('/api/answer/indepthwiki', {
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

  handleNewSectionKeydown = (event) => {
    if (event.key === "Enter" && this.state.newSection.length > 0) {
      this._submitSection(this.state.newSection);
    }
  }

  handleEditSectionsClicked = () => {
    this.setState({
      isSectionEditMode: !this.state.isSectionEditMode,
      isSectionSortMode: false,
    });
  }

  handleReorderSectionsClicked = () => {
    if (this.state.isSectionSortMode) {
      const mainIndex = this._getMainIndex();
      let i = 1;
      this.state.sections.forEach((item, index) => {
        item.sort_order = index === mainIndex ? 0 : i++;
        client.patch('/api/section/indepthwiki/order', item)
        .then(res => {
          this._updateAnswersFromServer();
        })
        .catch(err => {
          console.log(err);
        });
      });
    }
    this.setState({
      isSectionEditMode: false,
      isSectionSortMode: !this.state.isSectionSortMode,
    });
  }

  getAnswersSection = () => {
    return (
      this.state.sections.map((section, index) => {
        return section.answers === undefined ? null : (
          <AnswerSection
            key={ section.id }
            index={ index }
            title={ section.title }
            items={ section.answers }
            showHeader={ true }
            editableHeaders={ true }
            submitAnswer={ this.submitAnswer }
            saveSortOrder={ this.saveSortOrder }
            deleteAnswer={ this.deleteAnswer }
            saveEditAnswer={ this.saveEditAnswer }
            isSectionEditMode={ this.state.isSectionEditMode }
            isSectionSortMode={ this.state.isSectionSortMode }
            deleteSectionCallback={ this._updateAnswersFromServer }
            editSectionCallback={ this._updateAnswersFromServer }
            sectionId={ section.id }
          />
        );
      })
    );
  }

  _getMainIndex = () => {
    for (let i = 0; i < this.state.sections.length; i++) {
      if (this.state.sections[i].title === 'Main') {
        return i;
      }
    }
  }

  _submitSection = (title) => {
    this.setState({ hasError: false });
    client.post('/api/section/indepthwiki', {
      title,
      question_id: this.props.questionId,
      sort_order: this.state.sections.length,
    })
    .then(res => {
      this.setState({ newSection: '' });
      this._updateAnswersFromServer();
    })
    .catch(err => {
      this.setState({ hasError: true });
      console.log(err);
    });
  }

  _init() {
    if (this.state.initialized === false) {
      this._updateAnswersFromServer();
      this.setState({ initialized: true });
    }
  }

  _updateAnswersFromServer = () => {
    client.get(`/api/question/${this.props.questionId}/indepthwiki/sections`)
    .then(response => {
      this.setState({ sections: response.data.data });
      this._setAnswers();
    });
  }

  _setAnswers = () => {
    this.state.sections.forEach((section, index) => {
      client.get(`/api/section/${section.id}/indepthwiki`)
      .then(response => {
        let sections = this.state.sections;
        sections[index].answers = response.data.data;
        this.setState({ sections });
      });
    });
  }

  render() {
    return (
      <div>
        <SectionModeMenu
          editBtnPressed={ this.handleEditSectionsClicked }
          changeOrderBtnPressed={ this.handleReorderSectionsClicked }
          isEditMode={ this.state.isSectionEditMode }
          isSortMode={ this.state.isSectionSortMode }
        />
        <div className={ styles.qpSimple }>
          <p>In-Depth Answer</p>
          <p>Ready to dig in deep to truly understand the topic at hand? BONZAIIIII!</p>
          <hr />
          {
            this.state.isSectionSortMode ?
            <ReactSortable
              list={ this.state.sections }
              setList={newState => this.setState({ sections: newState })}
            >
              { this.getAnswersSection() }
            </ReactSortable>
            :
            this.getAnswersSection()
          }
          {
            this.state.isSectionEditMode || this.state.isSectionSortMode ? null :
            <div className={ styles.qpInDepthNewSection }>
              <div className={ styles.newSectionFormCentered }>
                  <input
                      type="text"
                      name="section"
                      placeholder="Create a new section..."
                      className={ classnames("form-control", {invalid: this.state.hasError}) }
                      onKeyDown={ this.handleNewSectionKeydown }
                      onChange={ e => this.setState({ newSection: e.target.value }) }
                      value={ this.state.newSection }
                  />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sectsData: state.curQuestionData.sectsData
});

export default connect(mapStateToProps)(InDepthTab);