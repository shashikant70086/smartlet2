import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    clearCart
  } = useContext(CartContext);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart panel */}
      <div className="relative ml-auto w-full max-w-md">
        <div className="h-full flex flex-col bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              Your Cart ({cart.length})
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setIsCartOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <X size={20} />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-gray-900"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-gray-900"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart size={48} className="mb-4 opacity-30" />
                <p>Your cart is empty</p>
                <button
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;