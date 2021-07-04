import React, { Component } from 'react';
import classnames from 'classnames';
import styles from 'cssModules/QuestionPage.module.css';
import AnswerModeMenu from './AnswerModeMenu';
import AnswerRow from './AnswerRow';
import SectionHeader from './SectionHeader';
import { ReactSortable } from 'react-sortablejs';

class AnswerSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      hasError: false,
      newAnswer: '',
      isAnswerMode: false,
      isEditMode: false,
      isSortMode: false,
      answersList: [],
      prevItems: this.props.items,
    }
  }

  answerBtnPressed = () => {
    if (this.state.isAnswerMode && this.state.newAnswer.length > 0) {
      this.props.submitAnswer(this.state.newAnswer, () => {
          this.setState({ newAnswer: '' });
      }, this.props.index);
    }
    this.setState({
      isAnswerMode: !this.state.isAnswerMode,
      isEditMode: false,
      isSortMode: false,
    });
  }

  editBtnPressed = () => {
    this.setState({
      isAnswerMode: false,
      isEditMode: !this.state.isEditMode,
      isSortMode: false,
    });
  }

  changeOrderBtnPressed = () => {
    if (this.state.isSortMode) {
      this.props.saveSortOrder(this.state.answersList);
    }

    this.setState({
      isAnswerMode: false,
      isEditMode: false,
      isSortMode: !this.state.isSortMode,
    });
  }

  handleAnswerKeydown = (event) => {
    if (event.key === "Enter") {
      this.answerBtnPressed();
    }
  }

  componentDidUpdate = () => {
    if ((this.props.items !== undefined &&
        this.props.items.length > 0 &&
        this.state.answersList !== undefined &&
        this.state.answersList.length === 0
    ) ||
      this.state.prevItems !== this.props.items
    ) {
      this.setState({
          answersList: this.props.items,
          prevItems: this.props.items,
      });
    }
  }

  render() {
    const AnswerRows = 
      this.state.answersList.map((answer, ind) => {
        return (
          <AnswerRow
            key={ answer.id }
            answerBody={ answer.body }
            answerId={ answer.id }
            deleteCallback={ this.props.deleteAnswer }
            editAnswerCallback={ this.props.saveEditAnswer }
            showEditButtons={ this.state.isEditMode }
            showOrderGrip={ this.state.isSortMode }
          />
        )
      });

    return (
      <div>
        {
          this.props.showHeader === false ? null :
          <SectionHeader
              title={ this.props.title }
              sectionId={ this.props.sectionId }
              deleteHandler={ this.props.deleteSectionCallback }
              editHandler={ this.props.editSectionCallback }
              isEditMode={ !!this.props.isSectionEditMode }
              isSortMode={ !!this.props.isSectionSortMode }
              onToggle={ () => this.setState({ isOpen: !this.state.isOpen }) }
          />
        }
        {
          this.state.isOpen === false || this.state.answersList.map === undefined ? null :
          <div>
              <AnswerModeMenu
                answerBtnPressed={ this.answerBtnPressed }
                editBtnPressed={ this.editBtnPressed }
                changeOrderBtnPressed={ this.changeOrderBtnPressed }
                isEditMode={ this.state.isEditMode }
                isSortMode={ this.state.isSortMode }
                isAnswerMode={ this.state.isAnswerMode }
              />
              <ul>
                {
                  this.state.isSortMode ? 
                  <ReactSortable
                    list={ this.state.answersList }
                    setList={newState => this.setState({ answersList: newState })}
                  >{ AnswerRows }</ReactSortable>
                  : AnswerRows
                }
              </ul>
              {
                this.state.isAnswerMode ?
                <div className={ classnames('input-group', styles.formCentered) }>
                    <input
                        type="text"
                        name="answer"
                        placeholder="Enter an Answer"
                        className={ classnames("form-control", {invalid: this.state.hasError}) }
                        onKeyDown={ this.handleAnswerKeydown }
                        onChange={ e => this.setState({ newAnswer: e.target.value }) }
                        value={ this.state.newAnswer }
                    />
                    <div className="input-group-append">
                        <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={ () => this.setState({ isAnswerMode: false }) }
                        >Cancel</button>
                    </div>
                </div>
                : null
              }
          </div>
        }
      </div>
    );
  }
}

export default AnswerSection;
