import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import styles from '../cssModules/PreviewHome.module.css';
import client from "../utils/client";

class PreviewHome extends React.Component {
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

  render() {
    let newsBtn = null;
    if (this.props.auth.user.is_admin) {
      newsBtn = <Link to="/NewPost"><button className="btn btn-primary">Create new blog post</button></Link>
    } else {
      newsBtn = <Link to="/EmailList"><button className="btn btn-primary">Join email list</button></Link>
    }

    return (
      <div className={ styles.homeContainer  }>
        <h1 className={ styles.topH1 }>Will this startup replace Wikipedia and Quora?</h1>
        <p>Email us at: questionwikiofficial@gmail.com</p>
        <iframe width="560" height="315" title="Channel iframe" src="https://www.youtube.com/embed/eS3U4AQa7wQ" frameBorder="0" allowFullScreen></iframe>      
        <h1 style={{ marginTop: '30px' }}>News and Updates</h1>
        {
          newsBtn
        }
        {/* Some sort of loop through blog posts sorted by most recent, but not showing entire post */}
        {
          this.state.postsData
            .slice(0, 6)  // Only show latest 6 posts
            .map((post, index) => {
              return (
                <div className={ styles.infocard } key={ index }>
                  {/* Turn all spaces in title into dashes and take out ? */}
                  
                  <Link to={ "/NewsDetailPage/" + post.id }><p className={ styles.infotitle }>{ post.title }</p></Link>

                  <div className={ styles.infouser }>
                    <p className={ styles.cardDate }>Posted on { post.post_date === null ? "???" : new Date(Date.parse(post.post_date)).toDateString() }</p>
                    <p className={ styles.infotext }>
                      {/* If more than 300 chars, it cuts off note description */}
                      { (post.body.length > 300) ? post.body.slice(0, 300) + '...(click title to read the rest)' : post.body }
                    </p>
                  </div>

                </div>
              );
            })
        }

        <Link to="/NewsPage" className="mb-5"><button className="btn btn-primary">View All Updates Here</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PreviewHome);