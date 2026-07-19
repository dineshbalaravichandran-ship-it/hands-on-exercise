import React from 'react';

// Way 2: Logical && operator (element variable)
function BlogDetails({ published }) {
  return (
    <div>
      <h3>React Hooks Explained</h3>
      {published && <p>This blog post is live and published.</p>}
      {!published && <p>This blog post is still a draft.</p>}
    </div>
  );
}

export default BlogDetails;
