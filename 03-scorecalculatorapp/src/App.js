import React from 'react';
import CalculateScore from './Components/CalculateScore';

function App() {
  return (
    <div>
      <CalculateScore name="Ravi Kumar" school="Cognizant Public School" total={430} goal={5} />
    </div>
  );
}

export default App;
