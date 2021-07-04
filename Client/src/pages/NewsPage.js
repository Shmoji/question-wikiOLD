import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

import styles from 'cssModules/PreviewHome.module.css';
import client from "utils/client";

class NewsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsData: []
    }
  }

  componentDidMount() {
    // When PreviewHome page loads, load all BlogPost data
    client.get(`/api/blogposts`)
      .then(response => { 
        // Set all BlogPosts data
        this.setState({ postsData: response.data.posts.data }) 
      })
  }

  handlePageClick = data => {
    client.get(`/api/blogposts?page=${data.selected + 1}`)
      .then(response => {
        // Set state to contain all next page's question data
        this.setState({ postsData: response.data.posts.data });
      });
  };
  
  render() {
    let newsBtn = null;
    if (this.props.auth.user.is_admin) {
      newsBtn = <Link to="/NewPost"><button className="btn btn-primary">Create new blog post</button></Link>
    } else {
      newsBtn = <Link to="/EmailList"><button className="btn btn-primary">Join email list</button></Link>
    }

    return (
      <div className={ styles.homeContainer  }>
        <p>Email us at: questionwikiofficial@gmail.com</p>    
        <h1 style={{ marginTop: '5px' }}>News and Updates</h1>
        {
          newsBtn
        }
        {
          this.state.postsData
            .map((post, index) => {
              return (
                <div className={ styles.infocard } key={ index }>
                  
                  <Link to={ "/NewsDetailPage/" + post.id }><p className={ styles.infotitle }>{ post.title }</p></Link>

                  <div className={ styles.infouser }>
                    <p className={ styles.cardDate }>Posted on { post.post_date === null ? "???" : new Date(Date.parse(post.post_date)).toDateString() }</p>
                    <p className={ styles.infotext }>
                      { (post.body.length > 300) ? post.body.slice(0, 300) + '...(click title to read the rest)' : post.body }
                    </p>
                  </div>

                </div>
              );
            })
        }
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={ this.handlePageClick }
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NewsPage);