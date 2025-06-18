import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/components/ui/use-toast";
// For a real form, you'd use Form from "@/components/ui/form" with react-hook-form and zod
// For this example, we'll create a simple structure.

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted');
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your order. You will be redirected to order history.",
    });
    // Simulate API call and redirect
    setTimeout(() => {
      navigate('/order-history'); // Or an order confirmation page
    }, 2000);
  };

  // Mock order summary items - in a real app, this would come from cart state
  const orderItems = [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Garlic Bread', quantity: 2, price: 6.99 },
  ];
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const taxes = subtotal * 0.10;
  const total = subtotal + deliveryFee + taxes;


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header cartItemCount={0} /> {/* Cart should be empty or not shown here */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Delivery & Payment */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (Optional)</Label>
                    <Input id="apartment" placeholder="Apt 4B" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Anytown" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State / Province</Label>
                      <Input id="state" placeholder="CA" required />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input id="zip" placeholder="90210" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="credit-card" className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card">Credit/Debit Card</Label>
                      </div>
                      <div className="space-y-3 pl-6"> {/* Indent card fields */}
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="•••" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod">Cash on Delivery</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  <div className="mt-6 flex items-center space-x-2">
                    <Checkbox id="savePayment" />
                    <Label htmlFor="savePayment" className="text-sm font-normal">Save payment information for next time</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24"> {/* Sticky summary */}
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48 mb-4 pr-2"> {/* Scroll for many items */}
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span><span>${deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Taxes:</span><span>${taxes.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full" type="submit">
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;