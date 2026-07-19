import React from 'react';

class ComplaintRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: '',
      complaint: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleComplaintChange = this.handleComplaintChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ employeeName: event.target.value });
  }

  handleComplaintChange(event) {
    this.setState({ complaint: event.target.value });
  }

  generateReferenceNumber() {
    return 'REF-' + Math.floor(100000 + Math.random() * 900000);
  }

  handleSubmit(event) {
    event.preventDefault();
    const refNumber = this.generateReferenceNumber();
    alert(
      `Complaint registered successfully for ${this.state.employeeName}.\nYour reference number is: ${refNumber}`
    );
    this.setState({ employeeName: '', complaint: '' });
  }

  render() {
    return (
      <div>
        <h2>Raise a Complaint</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Employee Name: </label>
            <input type="text" value={this.state.employeeName} onChange={this.handleNameChange} required />
          </div>
          <div>
            <label>Complaint: </label>
            <textarea value={this.state.complaint} onChange={this.handleComplaintChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ComplaintRegister;
