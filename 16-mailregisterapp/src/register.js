import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateField(fieldName, value) {
    switch (fieldName) {
      case 'name':
        return value.length >= 5 ? '' : 'Name must be at least 5 characters long.';
      case 'email':
        return value.includes('@') && value.includes('.')
          ? ''
          : 'Email must contain "@" and ".".';
      case 'password':
        return value.length >= 8 ? '' : 'Password must be at least 8 characters long.';
      default:
        return '';
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = this.validateField(name, value);

    this.setState((prevState) => ({
      [name]: value,
      errors: { ...prevState.errors, [name]: errorMessage }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const nameError = this.validateField('name', this.state.name);
    const emailError = this.validateField('email', this.state.email);
    const passwordError = this.validateField('password', this.state.password);

    this.setState({
      errors: { name: nameError, email: emailError, password: passwordError }
    });

    if (!nameError && !emailError && !passwordError) {
      alert('Registration successful for ' + this.state.name);
    }
  }

  render() {
    const { name, email, password, errors } = this.state;

    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name: </label>
            <input type="text" name="name" value={name} onChange={this.handleChange} />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
          <div>
            <label>Email: </label>
            <input type="text" name="email" value={email} onChange={this.handleChange} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
