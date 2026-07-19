import React from 'react';
import styles from './CohortDetails.module.css';

function CohortDetails({ cohort }) {
  const statusColor = cohort.status === 'ongoing' ? 'green' : 'blue';

  return (
    <div className={styles.box}>
      <h3 style={{ color: statusColor }}>{cohort.code}</h3>
      <dl>
        <dt>Trainer</dt>
        <dd>{cohort.trainer}</dd>
        <dt>Status</dt>
        <dd>{cohort.status}</dd>
        <dt>Start Date</dt>
        <dd>{cohort.startDate}</dd>
      </dl>
    </div>
  );
}

export default CohortDetails;
