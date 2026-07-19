import React from 'react';

// Way 1: if / else statement inside the component function
function BookDetails({ available }) {
  if (available) {
    return <p>Book: "Clean Code" is available in the library.</p>;
  } else {
    return <p>Book: "Clean Code" is currently checked out.</p>;
  }
}

export default BookDetails;
