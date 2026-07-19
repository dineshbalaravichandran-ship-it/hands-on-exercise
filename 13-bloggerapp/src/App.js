import React from 'react';
import BookDetails from './BookDetails';
import BlogDetails from './BlogDetails';
import CourseDetails from './CourseDetails';

function App() {
  return (
    <div>
      <h1>Blogger App</h1>

      {/* Way 1: if/else inside component */}
      <BookDetails available={true} />

      {/* Way 2: && operator */}
      <BlogDetails published={true} />

      {/* Way 3: ternary operator */}
      <CourseDetails seatsLeft={0} />

      {/* Way 4: switch-case style using a variable */}
      {(() => {
        switch (true) {
          case seatsAvailable():
            return <p>Seats are available (switch-case rendering).</p>;
          default:
            return <p>No seats available (switch-case rendering).</p>;
        }
      })()}
    </div>
  );
}

function seatsAvailable() {
  return true;
}

export default App;
