import React, { Component } from 'react';
import styles from 'cssModules/QuestionPage.module.css';
import classnames from 'classnames';

class AnswerRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            body: this.props.answerBody,
            hasError: false,
        };
    }

    deleteAnswer = () => {
        this.props.deleteCallback(this.props.answerId);
    }

    changeAnswer = (event) => {
        this.setState({ body: event.target.value, hasError: false });
    }

    editAnswer = () => {
        if (this.state.isEditing && this.state.body.length > 0) {
            this.saveEditAnswer();
        } else {
            this.setState({ isEditing: !this.state.isEditing })
        }
    }

    enterToSave = (event) => {
        if (event.key === 'Enter' && event.target.value.length > 0) {
            this.saveEditAnswer();
        }
    }

    saveEditAnswer = () => {
        this.setState({ hasError: false });
        this.props.editAnswerCallback(this.props.answerId, this.state.body, () => {
            this.setState({ isEditing: false });
        }, () => {
            this.setState({ hasError: true });
        });
    }

    render () {
        return (
            <li className={ styles.qpSimpleAnswer }>
                <div className="row">
                    <div className="col-8">
                      {
                        this.state.isEditing ?
                        <input
                            type="text"
                            value={ this.state.body }
                            onChange={ e => this.changeAnswer(e) }
                            onKeyDown={ e => this.enterToSave(e) }
                            className={ classnames("form-control", {invalid: this.state.hasError}) }
                        /> :
                        this.props.answerBody
                      }
                    </div>
                    {
                        this.props.showEditButtons === false ? null :
                        <div className="col-2 text-right">
                            <button
                                className="btn btn-info"
                                onClick={ this.editAnswer }
                            >{ this.state.isEditing ? 'Save' : 'Edit' }</button>
                        </div>
                    }
                    {
                        this.props.showEditButtons === false ? null :
                        <div className="col-2 text-right">
                            <button
                                className="btn btn-danger"
                                onClick={ this.deleteAnswer }
                            >Delete</button>
                        </div>
                    }
                    {
                        this.props.showOrderGrip === false ? null :
                        <div className="col-4 text-right">
                            <i className="fas fa-sort fa-lg text-muted" style={{ cursor: 'pointer' }}></i>
                        </div>
                    }
                </div>
            </li>
        );
    }
}

export default AnswerRow;
