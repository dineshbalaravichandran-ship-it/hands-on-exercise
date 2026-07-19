import React from 'react';
import Cart from './Cart';

class OnlineShopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [
        new Cart('Wireless Mouse', 599),
        new Cart('Mechanical Keyboard', 2499),
        new Cart('USB-C Hub', 1299),
        new Cart('Laptop Stand', 899),
        new Cart('Webcam', 1799)
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Online Shopping Cart</h1>
        <ul>
          {this.state.cartItems.map((item, index) => (
            <li key={index}>
              {item.itemname} - Rs. {item.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OnlineShopping;
