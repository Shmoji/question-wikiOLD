import React from 'react';

import styles from 'cssModules/CreateAdminPost.module.css';
import AdminRichTE from 'components/AdminRichTE';

class CreateAdminPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
      <div className={ styles.pageWrapper }>
        <AdminRichTE />
      </div>
    );
  }
}

export default CreateAdminPost;