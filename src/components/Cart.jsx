import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalItems } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({totalItems} items)</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-contain mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="font-bold">{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${calculateTotal()}</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-lg mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;