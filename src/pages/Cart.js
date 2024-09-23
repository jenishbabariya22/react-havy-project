import React from 'react';
import { useCart } from '../pages/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Calculate total quantity and total price
  const totalQuantity = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      {totalQuantity === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border-b py-4 flex justify-between items-center mb-4">
              <Link to={`/detail/${item.id}`} className="flex items-center">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4 shadow-md"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-600">Cuisine: {item.cuisine}</p>
                  <p className="text-lg text-green-600 font-bold">Price: ₹ {item.price.toFixed(2)}</p>
                </div>
              </Link>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4 p-4 bg-white rounded shadow-md">
            <h2 className="font-bold text-xl">Order Summary</h2>
            <h3 className="font-semibold">Total Items: <span className="text-green-500">{totalQuantity}</span></h3>
            <h3 className="font-semibold">Total Price: <span className="text-green-500"> ₹ {totalPrice}</span></h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
