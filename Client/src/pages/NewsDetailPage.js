import React from 'react';
import styles from 'cssModules/NewsDetailPage.module.css';
import client from "utils/client";

class NewsDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    client.get(`/api/blogpost/${id}`)
      .then(response => {
        this.setState({ post: response.data.post[0] }) 
      })
  }

  render() {
    return (
      <div className={"container my-4 " }>
        <h1 className="text-center mb-4">{ this.state.post.title }</h1>
        <div className={ "px-3 py-3 mx-auto " + styles.cardWrapper }>
          <p>{ this.state.post.body }</p>
        </div>
      </div>
    );
  }
}

export default NewsDetailPage;