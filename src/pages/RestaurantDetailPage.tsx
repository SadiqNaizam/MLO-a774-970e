import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DishCard from '@/components/DishCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Star, Clock, MapPin, Info, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


// Mock data - in a real app, this would be fetched based on `id`
const mockRestaurantsData: { [key: string]: any } = {
  r1: {
    name: "Luigi's Pizzeria",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    address: "123 Pizza St, Flavor Town",
    operatingHours: "11:00 AM - 10:00 PM",
    menu: {
      appetizers: [
        { id: 'a1', name: 'Garlic Bread', description: 'Toasted bread with garlic, butter, and herbs.', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1627308594079-a38384104c1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
      ],
      pizzas: [
        { id: 'p1', name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella cheese.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
        { id: 'p2', name: 'Pepperoni Pizza', description: 'Topped with savory pepperoni and mozzarella.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
      ],
      pastas: [
         { id: 'pa1', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta and cheese.', price: 15.50, imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508066bf2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhZ2hldHRpJTIwY2FyYm9uYXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60' },
      ]
    },
    reviews: [
        {id: 'rev1', user: 'FoodieFan', rating: 5, comment: "Best pizza in town!"},
        {id: 'rev2', user: 'PizzaLover', rating: 4, comment: "Great taste, quick delivery."},
    ]
  },
  // Add more mock restaurants if needed
};


const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [selectedDish, setSelectedDish] = useState<any>(null); // For dish details dialog

  useEffect(() => {
    if (id && mockRestaurantsData[id]) {
      setRestaurant(mockRestaurantsData[id]);
    } else {
      // Handle restaurant not found, maybe navigate to a 404 page or show error
      console.error("Restaurant not found for ID:", id);
      // navigate('/not-found'); // Or some other handling
    }
  }, [id, navigate]);

  const handleAddToCart = (dishId: string | number) => {
    const dish = Object.values(restaurant.menu).flat().find((d: any) => d.id === dishId);
    console.log(`Added ${dish?.name} (ID: ${dishId}) to cart`);
    toast({
      title: "Item Added to Cart!",
      description: `${dish?.name} has been successfully added to your cart.`,
    });
    // Actual cart logic would go here (e.g., update context/state)
  };

  const handleDishClick = (dish: any) => {
    setSelectedDish(dish);
  };

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={0} />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <p>Loading restaurant details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={3} /> {/* Example cart count */}
      <main className="flex-grow">
        <section className="relative h-64 md:h-96">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm py-1 px-3">{restaurant.cuisine}</Badge>
              <span className="flex items-center text-white">
                <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor"/> {restaurant.rating.toFixed(1)}
              </span>
              <span className="flex items-center text-white">
                <Clock className="h-5 w-5 mr-1" /> {restaurant.deliveryTime}
              </span>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-1/2 mb-6">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
              <ScrollArea className="h-[calc(100vh-400px)] pr-3"> {/* Adjust height as needed */}
                {Object.entries(restaurant.menu).map(([category, dishes]: [string, any[]]) => (
                  <section key={category} className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">{category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dishes.map((dish: any) => (
                         <DialogTrigger asChild key={dish.id} onClick={() => handleDishClick(dish)}>
                            <div> {/* Wrap DishCard for DialogTrigger if DishCard itself does not propagate click correctly for dialog */}
                                <DishCard
                                    id={dish.id}
                                    name={dish.name}
                                    description={dish.description}
                                    price={dish.price}
                                    imageUrl={dish.imageUrl}
                                    onAddToCart={(e) => { handleAddToCart(dish.id);}}
                                />
                            </div>
                        </DialogTrigger>
                      ))}
                    </div>
                  </section>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="info">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Restaurant Information</h2>
                <div className="space-y-3 text-gray-700">
                  <p><MapPin className="inline h-5 w-5 mr-2 text-orange-500" /><strong>Address:</strong> {restaurant.address}</p>
                  <p><Clock className="inline h-5 w-5 mr-2 text-orange-500" /><strong>Hours:</strong> {restaurant.operatingHours}</p>
                  <p><Info className="inline h-5 w-5 mr-2 text-orange-500" /><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                  {/* Add more info as needed */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
                {restaurant.reviews && restaurant.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {restaurant.reviews.map((review: any) => (
                            <div key={review.id} className="border-b pb-3 last:border-b-0">
                                <div className="flex items-center mb-1">
                                    <strong className="mr-2">{review.user}</strong>
                                    <span className="flex items-center text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No reviews yet for this restaurant.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
         {selectedDish && (
            <Dialog open={!!selectedDish} onOpenChange={(isOpen) => !isOpen && setSelectedDish(null)}>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{selectedDish.name}</DialogTitle>
                    {selectedDish.imageUrl && <img src={selectedDish.imageUrl} alt={selectedDish.name} className="w-full h-48 object-cover rounded-md my-4"/>}
                    <DialogDescription>
                    {selectedDish.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-2">
                    <p className="text-lg font-semibold">Price: ${selectedDish.price.toFixed(2)}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedDish(null)}>Close</Button>
                    <Button onClick={() => { handleAddToCart(selectedDish.id); setSelectedDish(null); }}>Add to Cart</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;