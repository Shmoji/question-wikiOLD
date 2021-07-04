import React, { Component } from 'react';
import classnames from 'classnames';
import styles from 'cssModules/QuestionPage.module.css';

class AnswerModeMenu extends Component {
    render() {
        return (
            <div className={ classnames(styles.qpLeftMargin, styles.actionBtns) }>
                <div className={ styles.btn } onClick={ this.props.answerBtnPressed }>
                    <i className="fas fa-plus-square fa-md" style={{ marginRight: 7 }}></i>
                    <span>{ this.props.isAnswerMode ? '[Save Answer]' : 'Answer' }</span>
                </div>
                <div className={ styles.btn } onClick={ this.props.editBtnPressed }>
                    <i className="fas fa-edit fa-md" style={{ marginRight: 7 }}></i>
                    <span>{ this.props.isEditMode ? '[Stop Editing]' : 'Edit' }</span>
                </div>
                <div className={ styles.btn } onClick={ this.props.changeOrderBtnPressed }>
                    <i className="fas fa-random fa-md" style={{ marginRight: 7 }}></i>
                    <span>{ this.props.isSortMode ? '[Save Row Order]' : 'Change Row Order' }</span>
                </div>
            </div>
        );
    }
}

export default AnswerModeMenu;
