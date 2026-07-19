import React from 'react';

const team = ['Rohit Sharma', 'Virat Kohli', 'KL Rahul', 'Shreyas Iyer', 'Hardik Pandya', 'Ravindra Jadeja'];

// Destructuring: split into odd (1st, 3rd, 5th...) and even (2nd, 4th, 6th...) team players
const [odd1, even1, odd2, even2, odd3, even3] = team;
const oddTeamPlayers = [odd1, odd2, odd3];
const evenTeamPlayers = [even1, even2, even3];

const t20Players = ['Suryakumar Yadav', 'Ishan Kishan', 'Arshdeep Singh'];
const ranjiTrophyPlayers = ['Sarfaraz Khan', 'Mukesh Kumar', 'Yash Dhull'];

// Merge feature of ES6 - spread operator
const mergedPlayers = [...t20Players, ...ranjiTrophyPlayers];

function IndianPlayers() {
  return (
    <div>
      <h2>Odd Team Players</h2>
      <ul>
        {oddTeamPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Even Team Players</h2>
      <ul>
        {evenTeamPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>T20 + Ranji Trophy Players (Merged)</h2>
      <ul>
        {mergedPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default IndianPlayers;
