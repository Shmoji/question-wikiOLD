import React, { Component } from 'react';
import classnames from 'classnames';
import styles from 'cssModules/QuestionPage.module.css';

class SectionModeMenu extends Component {
    render() {
        return (
            <div className={ classnames(styles.qpLeftMargin, styles.actionBtns) }>
                <div className={ styles.btn } onClick={ this.props.editBtnPressed }>
                    <i className="fas fa-edit fa-md" style={{ marginRight: 7 }}></i>
                    <span>{ this.props.isEditMode ? '[Stop Editing Sections]' : 'Edit Sections' }</span>
                </div>
                <div className={ styles.btn } onClick={ this.props.changeOrderBtnPressed }>
                    <i className="fas fa-random fa-md" style={{ marginRight: 7 }}></i>
                    <span>{ this.props.isSortMode ? '[Save Section Order]' : 'Change Section Order' }</span>
                </div>
            </div>
        );
    }
}

export default SectionModeMenu;
