import React from 'react';

const playersData = [
  { name: 'Rohit Sharma', score: 85 },
  { name: 'Virat Kohli', score: 92 },
  { name: 'KL Rahul', score: 45 },
  { name: 'Shreyas Iyer', score: 60 },
  { name: 'Hardik Pandya', score: 55 },
  { name: 'Ravindra Jadeja', score: 30 },
  { name: 'MS Dhoni', score: 78 },
  { name: 'Jasprit Bumrah', score: 12 },
  { name: 'Mohammed Shami', score: 8 },
  { name: 'Yuzvendra Chahal', score: 5 },
  { name: 'Shubman Gill', score: 68 }
];

function ListofPlayers() {
  const players = playersData.map((player, index) => (
    <li key={index}>
      {player.name} - {player.score}
    </li>
  ));

  const lowScorers = playersData.filter((player) => player.score < 70);

  return (
    <div>
      <h2>List of Players</h2>
      <ul>{players}</ul>

      <h2>Players with score below 70</h2>
      <ul>
        {lowScorers.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListofPlayers;
