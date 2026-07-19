import React from 'react';
import CohortData from './Cohort';
import CohortDetails from './CohortDetails';

function App() {
  return (
    <div>
      <h1>Cognizant Academy - Cohort Dashboard</h1>
      {CohortData.map((cohort) => (
        <CohortDetails key={cohort.id} cohort={cohort} />
      ))}
    </div>
  );
}

export default App;
