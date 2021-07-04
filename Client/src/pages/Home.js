import React from 'react';
import styles from 'cssModules/Home.module.css';
import InfoCard from 'components/InfoCard/InfoCard';
import ReactPaginate from 'react-paginate';
import client from "utils/client";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsData: {},
    }
  }
  
  componentDidMount() {
    client.get(`/api/answers-for-home`)
      .then(response => {
        console.log('respnse.data==', response.data)
        this.setState({ questionsData: response.data.answers }) 
      })
  }

  handlePageClick = data => {
    client.get(`/api/answers-for-home?page=${data.selected + 1}`)
      .then(response => {
        this.setState({ questionsData: response.data.answers });
      });
  };

  render() {
    const questionList = this.state.questionsData.data;

    return (
      <React.Fragment>
        <div className="container">
    
          <input type="text" placeholder="What is your question?" className={ styles.ask }></input>

          { questionList &&
            questionList.map((question) => {
              return <InfoCard question={ question } key={ question.id } />;
            })}

          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={ parseInt(this.state.questionsData.total) / 10 } // I dont think this is a real state variable, i just pasted this in
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={ this.handlePageClick }
            containerClassName={'pagination'} /* Notice that the styles are defined inside of App.css */
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
          
        </div>
      </React.Fragment>
    );
  }
}

export default Home;