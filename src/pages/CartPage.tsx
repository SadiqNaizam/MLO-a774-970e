import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'p1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60' },
  { id: 'a1', name: 'Garlic Bread', price: 6.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1627308594079-a38384104c1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60' },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      ).filter(item => item.quantity > 0) // Optionally remove if quantity becomes 0
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      variant: "destructive"
    })
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example delivery fee
  const taxes = subtotal * 0.1; // Example 10% tax
  const total = subtotal + deliveryFee + taxes;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
        toast({
            title: "Empty Cart",
            description: "Please add items to your cart before proceeding to checkout.",
            variant: "destructive"
        });
        return;
    }
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Your Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                <Button onClick={() => navigate('/')}>Continue Shopping</Button>
              </div>
            ) : (
              <>
                <ScrollArea className="h-[300px] mb-6"> {/* Adjust height as needed */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Item</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img src={item.imageUrl || 'https://via.placeholder.com/50'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, -1)}><Minus className="h-3 w-3" /></Button>
                              <span>{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, 1)}><Plus className="h-3 w-3" /></Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                              <Trash2 className="h-5 w-5 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Separator className="my-6" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Add a Note (Optional)</h3>
                    <Textarea placeholder="Special instructions for your order..." className="min-h-[80px]" />
                    <h3 className="text-lg font-semibold mt-4 mb-2">Promo Code</h3>
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={() => console.log('Applied promo code:', promoCode)}>Apply</Button>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span><span>${deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Taxes (10%):</span><span>${taxes.toFixed(2)}</span></div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <CardFooter className="mt-6">
              <Button size="lg" className="w-full" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;