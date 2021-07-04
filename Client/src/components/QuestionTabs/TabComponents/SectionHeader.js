import React, { Component } from 'react';
import styles from 'cssModules/QuestionPage.module.css';
import classnames from 'classnames';
import client from 'utils/client';

class SectionHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            hasError: false,
            newSectionTitle: this.props.title,
            isEditing: false,
            isReadOnly: this.props.title === 'Main',
        };
    }

    componentDidUpdate() {
        if (this.state.isOpen && this.isChangingSections()) {
            this.toggleOpenClosed();
        }
    }

    toggleOpenClosed = () => {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.onToggle();
    }

    isChangingSections = () => {
        return this.props.isEditMode || this.props.isSortMode;
    }

    enterToSave = (event) => {
        if (event.key === 'Enter' && this.state.newSectionTitle.length > 0) {
            this.saveEditSection();
        }
    }

    editSection = () => {
        if (this.state.isEditing && this.state.newSectionTitle.length > 0) {
            this.saveEditSection();
        } else {
            this.setState({ isEditing: true });
        }
    }

    saveEditSection = () => {
        this.setState({ isEditing: false, hasError: false });
        client.patch('/api/section/indepthwiki', {
            id: this.props.sectionId,
            title: this.state.newSectionTitle,
        })
        .then(res => {
            this.props.editHandler();
        })
        .catch(err => {
            console.log(err);
            this.setState({ hasError: true });
        });
    }

    deleteSection = () => {
        client.delete('/api/section/indepthwiki', {
            data: {
                id: this.props.sectionId,
            }
        })
        .then(res => {
            this.props.deleteHandler();
        });
    }

    render() {
        return (
            <div
                className={ classnames(styles.newSectionFormCentered, styles.qpInDepthSection) }
                onClick={ this.toggleOpenClosed }
            >
                <div className="row">
                    <div className="col-8">
                        {
                            this.state.isEditing && this.props.isEditMode && !this.state.isReadOnly ?
                            <input
                                type="text"
                                value={ this.state.newSectionTitle }
                                onChange={ e => this.setState({ newSectionTitle: e.target.value }) }
                                onKeyDown={ this.enterToSave }
                                className={ classnames("form-control", {invalid: this.state.hasError}) }
                            /> :
                            <p className={ styles.qpSectionTitle }>
                                <i className={ classnames('fas', {
                                    'fa-arrow-up': !this.state.isOpen,
                                    'fa-arrow-down': this.state.isOpen,
                                }) } style={{ marginRight: 10 }}></i>
                                { this.props.title }:
                            </p>
                        }
                    </div>
                    {
                        this.props.isEditMode === false || this.state.isReadOnly ? null :
                        <div className="col-2 text-right">
                            <button
                                className="btn btn-info"
                                onClick={ this.editSection }
                            >{ this.state.isEditing ? 'Save' : 'Edit' }</button>
                        </div>
                    }
                    {
                        this.props.isEditMode === false || this.state.isReadOnly ? null :
                        <div className="col-2 text-right">
                            <button
                                className="btn btn-danger"
                                onClick={ this.deleteSection }
                            >Delete</button>
                        </div>
                    }
                    {
                        this.props.isSortMode === false || this.state.isReadOnly ? null :
                        <div className="col-4 text-right">
                            <i className="fas fa-sort fa-2x text-muted" style={{ cursor: 'pointer' }}></i>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SectionHeader;
