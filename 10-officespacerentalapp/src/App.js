import React from 'react';

const heading = <h1>Office Space Rentals</h1>;

const officeImageAttr = (
  <img
    src="https://via.placeholder.com/200x120.png?text=Office+Space"
    alt="Office space"
    width="200"
  />
);

const office = {
  name: 'Cognizant Business Park',
  rent: 75000,
  address: 'ECR, Chennai'
};

const officeList = [
  { name: 'Tech Tower A', rent: 45000, address: 'OMR, Chennai' },
  { name: 'Cognizant Business Park', rent: 75000, address: 'ECR, Chennai' },
  { name: 'Startup Hub', rent: 30000, address: 'T Nagar, Chennai' },
  { name: 'Corporate Square', rent: 90000, address: 'Anna Salai, Chennai' }
];

function App() {
  return (
    <div>
      {heading}
      {officeImageAttr}

      <h2>Featured Office</h2>
      <p>Name: {office.name}</p>
      <p style={{ color: office.rent < 60000 ? 'red' : 'green' }}>
        Rent: {office.rent}
      </p>
      <p>Address: {office.address}</p>

      <h2>All Office Spaces</h2>
      <ul>
        {officeList.map((item, index) => (
          <li key={index}>
            {item.name} - {item.address} -{' '}
            <span style={{ color: item.rent < 60000 ? 'red' : 'green' }}>
              Rs. {item.rent}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
