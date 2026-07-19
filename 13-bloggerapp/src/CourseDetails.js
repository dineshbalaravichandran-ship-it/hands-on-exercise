import React from 'react';

// Way 3: Ternary operator
function CourseDetails({ seatsLeft }) {
  return (
    <div>
      <h3>Full Stack Java Course</h3>
      <p>{seatsLeft > 0 ? `${seatsLeft} seats left. Enroll now!` : 'Course is fully booked.'}</p>
    </div>
  );
}

export default CourseDetails;
