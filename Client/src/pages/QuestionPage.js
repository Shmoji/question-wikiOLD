import React, { Component } from 'react';
import styles from 'cssModules/QuestionPage.module.css';
import { connect } from "react-redux";
import { setQuestionData, setSimpleData, setSectionsData,
  setAnswersData, setDiscussData, setEditsData,
  setHelpData, clearQuestionData } from "actions/curQuestionActions";

import Tabs from 'components/QuestionTabs/Tabs';
import Menu from 'components/QuestionTabs/Menu';
import client from "utils/client";

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.props.clearQuestionData();
  }

  fetchData = () => {
    
    client.get(`/api/question/${this.state.questionId}`)
    .then(response => {
      this.props.setQuestionData( response.data.data[0] );
    });
      
    client.get(`/api/question/${this.state.questionId}/simplewiki`)
    .then(response => { 
      this.props.setSimpleData( response.data.data );
    });
    
    client.get(`/api/question/${this.state.questionId}/indepthwiki/sections`)
    .then(response => { 
      this.props.setSectionsData( response.data.data );
    });
    
    client.get(`/api/question/${this.state.questionId}/personal`)
    .then(response => {
      this.props.setAnswersData( response.data.data );
    });
    
    client.get(`/api/question/${this.state.questionId}/discussions`)
    .then(response => {
      this.props.setDiscussData( response.data.data );
    });
    
    client.get(`/api/question/${this.state.questionId}/edits`)
    .then(response => {
      this.props.setEditsData( response.data.data );
    });
    
    client.get(`/api/question/${this.state.questionId}/help`)
    .then(response => {
      this.props.setHelpData( response.data.data );
    });
  }

  render() {
    return (
      <React.Fragment>
        <Menu
          questionId={ this.state.questionId }
          title={ this.props.match.params.title.replace('?', '').replace(' ', '-') }
        ></Menu>
        <p className={ styles.qpTitle }>
          { this.props.curQuestionData.title }
        </p>
        <Tabs
          tab={ this.props.tab }
          fetchData={ this.fetchData }
          questionId={ this.state.questionId }
        ></Tabs>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  curQuestionData: state.curQuestionData.questionData
});

const mapActionsToProps = {
  setQuestionData, setSimpleData, setSectionsData,
  setAnswersData, setDiscussData, setEditsData,
  setHelpData, clearQuestionData
}

export default connect(mapStateToProps, mapActionsToProps)(QuestionPage);