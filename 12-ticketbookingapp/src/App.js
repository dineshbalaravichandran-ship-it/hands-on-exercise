import React, { useState } from 'react';
import GuestPage from './GuestPage';
import UserPage from './UserPage';
import LoginControl from './LoginControl';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>Flight Ticket Booking</h1>
      <LoginControl
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoggedIn(true)}
        onLogoutClick={() => setIsLoggedIn(false)}
      />
      {isLoggedIn ? <UserPage /> : <GuestPage />}
    </div>
  );
}

export default App;
