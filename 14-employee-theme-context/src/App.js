import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import EmployeesList from './EmployeesList';

const employees = [
  { id: 1, name: 'Anita Sharma', designation: 'Software Engineer' },
  { id: 2, name: 'Rahul Verma', designation: 'Senior Software Engineer' },
  { id: 3, name: 'Deepa Nair', designation: 'Tech Lead' }
];

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h1>Employee Management App</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme (current: {theme})
        </button>
        <EmployeesList employees={employees} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
