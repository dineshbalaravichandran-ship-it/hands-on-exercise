import React from 'react';

class Getuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      firstname: '',
      picture: ''
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        const user = data.results[0];
        this.setState({
          title: user.name.title,
          firstname: user.name.first,
          picture: user.picture.large
        });
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }

  render() {
    return (
      <div>
        <h2>Random User</h2>
        {this.state.picture && <img src={this.state.picture} alt="user" />}
        <p>Title: {this.state.title}</p>
        <p>First Name: {this.state.firstname}</p>
      </div>
    );
  }
}

export default Getuser;
