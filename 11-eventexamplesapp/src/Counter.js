import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.sayHello = this.sayHello.bind(this);
  }

  increment() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  sayHello() {
    alert('Hello, this is a static welcome message!');
  }

  handleIncrement() {
    this.increment();
    this.sayHello();
  }

  handleDecrement() {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  }

  sayWelcome(message) {
    alert(message);
  }

  handlePress = (event) => {
    // event is a React SyntheticEvent
    alert('I was clicked');
  };

  render() {
    return (
      <div>
        <h2>Counter: {this.state.count}</h2>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>

        <br />
        <br />
        <button onClick={() => this.sayWelcome('welcome')}>Say Welcome</button>

        <br />
        <br />
        <button onClick={this.handlePress}>OnPress</button>
      </div>
    );
  }
}

export default Counter;
