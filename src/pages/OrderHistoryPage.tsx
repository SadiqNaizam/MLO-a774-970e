import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTrackerStepper from '@/components/OrderTrackerStepper';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}
interface Order {
  id: string;
  date: string;
  restaurantName: string;
  restaurantImageUrl?: string;
  items: OrderItem[];
  total: number;
  status: "PLACED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
}

const mockOrders: Order[] = [
  {
    id: 'ORD12345',
    date: '2024-07-25',
    restaurantName: "Luigi's Pizzeria",
    restaurantImageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60",
    items: [
      { id: 'p1', name: 'Margherita Pizza', quantity: 1, price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=60&q=60' },
      { id: 's1', name: 'Coke', quantity: 2, price: 1.99 },
    ],
    total: 16.97,
    status: 'DELIVERED',
  },
  {
    id: 'ORD67890',
    date: '2024-07-28',
    restaurantName: 'Taco Fiesta',
    restaurantImageUrl: 'https://images.unsplash.com/photo-1606756790139-9e5830e61230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWV4aWNhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60',
    items: [
      { id: 't1', name: 'Chicken Tacos (3)', quantity: 1, price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1565299585323-BA4d69957a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=60&q=60' },
      { id: 'd1', name: 'Jarritos Mango', quantity: 1, price: 2.50 },
    ],
    total: 12.00,
    status: 'OUT_FOR_DELIVERY',
  },
    {
    id: 'ORD11223',
    date: '2024-07-29',
    restaurantName: 'Curry House',
    restaurantImageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60',
    items: [
      { id: 'c1', name: 'Chicken Tikka Masala', quantity: 1, price: 14.00 },
      { id: 'n1', name: 'Garlic Naan', quantity: 2, price: 3.00 },
    ],
    total: 20.00,
    status: 'PREPARING',
  },
];

const OrderHistoryPage = () => {
  console.log('OrderHistoryPage loaded');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={0} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
            <Button variant="outline" onClick={() => navigate('/')}>
                <ShoppingBag className="mr-2 h-4 w-4" /> Order Again
            </Button>
        </div>

        {mockOrders.length === 0 ? (
          <Card className="text-center py-10 shadow-md">
            <CardContent>
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No orders yet.</p>
                <p className="text-gray-500 mb-6">Looks like you haven't placed any orders. Start exploring restaurants!</p>
                <Button onClick={() => navigate('/')}>Discover Restaurants</Button>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {mockOrders.map(order => (
                <AccordionItem value={order.id} key={order.id} className="bg-white rounded-lg shadow-md border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                            <img src={order.restaurantImageUrl || 'https://via.placeholder.com/60'} alt={order.restaurantName} className="w-12 h-12 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{order.restaurantName}</h3>
                                <p className="text-sm text-gray-500">Order ID: {order.id} &bull; {order.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-gray-800">${order.total.toFixed(2)}</p>
                            <Badge variant={order.status === 'DELIVERED' ? 'default' : (order.status === 'CANCELLED' ? 'destructive' : 'secondary')} 
                                   className={`${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : ''} 
                                              ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : ''}
                                              ${order.status === 'OUT_FOR_DELIVERY' ? 'bg-blue-100 text-blue-700' : ''}
                                              ${order.status === 'PREPARING' ? 'bg-yellow-100 text-yellow-700' : ''}
                                              ${order.status === 'PLACED' ? 'bg-gray-100 text-gray-700' : ''}
                                              mt-1`}>
                                {order.status.replace('_', ' ')}
                            </Badge>
                        </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2 text-gray-700">Order Items:</h4>
                      <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                        {order.items.map(item => (
                          <li key={item.id}>
                            {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
                          </li>
                        ))}
                      </ul>
                    </div>
                    {order.status !== 'CANCELLED' && (
                        <div className="mb-6">
                            <h4 className="text-md font-semibold mb-3 text-gray-700">Order Status:</h4>
                            <OrderTrackerStepper currentStatus={order.status} />
                        </div>
                    )}
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">View Invoice</Button>
                      {order.status === 'DELIVERED' && <Button variant="default" size="sm" onClick={() => navigate(`/restaurant/${order.restaurantName.toLowerCase().replace(/\s+/g, '-')}` /* Placeholder ID */)}>Reorder</Button>}
                      {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && <Button variant="secondary" size="sm">Contact Support</Button>}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;