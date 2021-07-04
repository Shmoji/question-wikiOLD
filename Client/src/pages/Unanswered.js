import React from 'react';
import styles from 'cssModules/AnswerMe.module.css'; // Need to put .module for CSS module files
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import client from "utils/client";

class SideCard extends React.Component {
  render() {
    return (
      <div className={ styles.sidecard }>
        
      </div>
    );
  }
}

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsData: [],
    }
  }
  
  componentDidMount() {
    client.get('/api/unanswered')
      .then(response => {
        this.setState({ questionsData: response.data.questions.data })
      });
  }

  handlePageClick = data => {
    client.get(`/api/unanswered?page=${data.selected + 1}`)
      .then(response => {
        this.setState({ questionsData: response.data.questions.data });
      });
  };
  
  render() {
    return (
      <div className={ styles.cardscontainer }>
        {
          this.state.questionsData.map((question) => {
            return (
              <div className={ styles.infocard } key={ question.id }>
                <Link to={{
                  pathname: `/${question.id}/${question.title.replace('?', '').replace(' ', '-')}/Simple`
                }} >
                  <p className={ styles.infotitle }>
                    { question.title }
                  </p>
                </Link>
                <p className={ styles.infotext }>No answer yet</p>
              </div>
            )
          })
        }

        <ReactPaginate
          previousLabel={ 'previous' }
          nextLabel={ 'next' }
          breakLabel={ '...' }
          breakClassName={ 'break-me' }
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={ this.handlePageClick }
          containerClassName={ 'pagination' }
          subContainerClassName={ 'pages pagination' }
          activeClassName={ 'active' }
        />
      </div>
    );
  }
}

class Unanswered extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              
            </div>

            <div className="col-sm-8">
              <InfoCard></InfoCard>
            </div>

            <div className="col-sm-2">
              <SideCard></SideCard>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Unanswered;