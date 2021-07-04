import React from 'react';

import styles from 'cssModules/EmailListPage.module.css';

function EmailListPage(props) {
  return (
    <div className={ styles.pageWrapper }>
      <h1>Join the Email List For Updates on Question Wiki</h1>
      <iframe title="Mailing List" src="https://docs.google.com/forms/d/e/1FAIpQLSc5oSenWsIVC_9gmP0eSKqa9Mo9ysS_Zn3xzCu1AMhSwi2gBQ/viewform?embedded=true"
        width="640" height="415" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
    </div>
  );
}

export default EmailListPage;