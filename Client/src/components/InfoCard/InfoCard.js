import React from 'react';
import styles from 'cssModules/Home.module.css';
import { Link } from "react-router-dom";

function InfoCard(props) {
  /* If this props.question has no answers, say that instead */
  let body = <p style={{ margin: '1em 1em 0.5em 1em' }}>No answer yet</p>; // Just used style here because was having issues
  if (props.question.body !== undefined) { 
    body = <div className={ styles.infouser }>
            <div className={ styles.userimg }>
              <img src={ process.env.PUBLIC_URL + '/images/avatar.png' } alt="MISSING img" width="40px" height="40px"></img> {/* User's image */}
            </div>
            <div className={ styles.usertxt }>
              <p>{ props.question.firstname + ' ' + props.question.lastname }, { props.question.user_title }</p>
              <p>Answered on { new Date(Date.parse(props.question.answer_date)).toDateString() }</p>
            </div>
            <p className={ styles.infotext }>
              {/* If more than 300 chars, it cuts off note description */}
              { (props.question.body.length > 300) ? props.question.body.slice(0, 300) + '...' : props.question.body }
            </p>
           </div>
  }

  return (
    <div className={ styles.infocard } key={ props.question.id }>
      {/* Turn all spaces in title into dashes and take out ? */}
      <Link to={{
        pathname: '/' + props.question.id + '/'
          + props.question.title.replace(/\?/g, '').replace(/ /g, '-') + '/Simple'
      }} >
        <p className={ styles.infotitle }>
          { props.question.title }
        </p>
      </Link>

      {
        body
      }

    </div>
  )
}

export default InfoCard;