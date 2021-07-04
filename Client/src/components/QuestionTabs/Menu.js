import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from 'cssModules/QuestionPage.module.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.tabs = ['Simple', 'In-Depth', 'Personal', 'Discussion', 'Edits', 'Confused']
        this.state = {
            activeTab: props.location.pathname.split('/')[3],
        }
        
        this.id = this.props.questionId;
        this.title = this.props.title;
    }

    render() {
        return (
            <div className={ styles.qpMenu }>
            {
                this.tabs.map((tab, ind) => {
                return (
                    <Link to={`/${this.id}/${this.title}/${tab}`} key={ ind } 
                    onClick={ () => this.setState({ activeTab: tab }) }
                    style={{ textDecoration: 'none' }} >
                    <div className={ this.state.activeTab === tab ? styles.activeQPTab : styles.qpTab }>
                        <p className={ styles.tabText}>{ tab }</p>
                    </div>
                    </Link>
                )
                })
            }
            </div>
        );
    }
}

export default withRouter(Menu);
