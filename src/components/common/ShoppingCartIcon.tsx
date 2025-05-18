
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, X, Trash, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShoppingCartIcon = () => {
  const {
    cart,
    removeItem,
    updateQuantity,
    clearCart
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleCart}
        className="relative p-2"
      >
        <ShoppingCart className="h-5 w-5" />
        {cart.items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.items.length}
          </span>
        )}
      </Button>
      

      {isOpen && <div className="absolute right-0 top-12 w-96 max-w-[90vw] bg-white rounded-md shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Winkelwagen</h3>
            <Button variant="ghost" size="sm" onClick={toggleCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {cart.items.length === 0 ? <div className="text-center py-8">
              <p className="text-gray-500">Uw winkelwagen is leeg</p>
            </div> : <>
              <div className="max-h-96 overflow-auto">
                {cart.items.map(item => <div key={item.product.id} className="flex justify-between items-start py-3 border-b">
                    <div className="flex-grow mr-4">
                      <h4 className="font-medium text-sm">{item.product.title}</h4>
                      <p className="text-brand-darkGreen font-medium">{item.product.price}</p>
                      
                      <div className="flex items-center mt-2">
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1" onClick={() => removeItem(item.product.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>)}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-bold mb-4">
                  <span>Totaal</span>
                  <span>€ {cart.total.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={clearCart}>
                    Wissen
                  </Button>
                  <Link to="/offerte" className="flex-1">
                    <Button className="w-full bg-brand-darkGreen hover:bg-brand-green">
                      Offerte aanvragen
                    </Button>
                  </Link>
                </div>
              </div>
            </>}
        </div>}
    </div>
  );
};

export default ShoppingCartIcon;
