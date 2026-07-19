import React from 'react';

function LoginControl({ isLoggedIn, onLoginClick, onLogoutClick }) {
  if (isLoggedIn) {
    return <button onClick={onLogoutClick}>Logout</button>;
  }
  return <button onClick={onLoginClick}>Login</button>;
}

export default LoginControl;
