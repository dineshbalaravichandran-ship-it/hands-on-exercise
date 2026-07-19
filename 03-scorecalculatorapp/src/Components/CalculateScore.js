import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore(props) {
  const { name, school, total, goal } = props;
  const average = (total / goal).toFixed(2);
  const passed = average >= 50;

  return (
    <div className="score-card">
      <h2>Score Calculator</h2>
      <p>Name: {name}</p>
      <p>School: {school}</p>
      <p>Total Marks: {total}</p>
      <p>Number of Subjects: {goal}</p>
      <p className={passed ? 'average-pass' : 'average-fail'}>
        Average Score: {average}
      </p>
    </div>
  );
}

export default CalculateScore;
