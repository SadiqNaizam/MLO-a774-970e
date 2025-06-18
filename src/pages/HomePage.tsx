import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Carousel from '@/components/Carousel';
import CuisineCarouselItem from '@/components/CuisineCarouselItem';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

const placeholderCuisines = [
  { id: 'italian', name: 'Italian', imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
  { id: 'mexican', name: 'Mexican', imageUrl: 'https://images.unsplash.com/photo-1565299585323-BA4d69957a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
  { id: 'indian', name: 'Indian', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a058387cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60' },
  { id: 'chinese', name: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
  { id: 'sushi', name: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
];

const placeholderRestaurants = [
  { id: 'r1', name: 'Luigi\'s Pizzeria', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', cuisine: 'Italian', rating: 4.7, deliveryTime: '25-35 min' },
  { id: 'r2', name: 'Taco Fiesta', imageUrl: 'https://images.unsplash.com/photo-1606756790139-9e5830e61230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWV4aWNhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', cuisine: 'Mexican', rating: 4.5, deliveryTime: '20-30 min' },
  { id: 'r3', name: 'Curry House', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisine: 'Indian', rating: 4.8, deliveryTime: '30-40 min' },
  { id: 'r4', name: 'Dragon Wok', imageUrl: 'https://images.unsplash.com/photo-1623341268888-e5520161679f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', cuisine: 'Chinese', rating: 4.3, deliveryTime: '25-35 min' },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleCuisineClick = (id: string | number) => {
    console.log(`Cuisine ${id} clicked`);
    // Navigate to a filtered list or apply filter, for now just log
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log(`Restaurant ${id} clicked`);
    navigate(`/restaurant/${id}`);
  };

  const cuisineSlides = placeholderCuisines.map(cuisine => (
    <CuisineCarouselItem
      key={cuisine.id}
      id={cuisine.id}
      name={cuisine.name}
      imageUrl={cuisine.imageUrl}
      onClick={handleCuisineClick}
    />
  ));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={0} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Next Meal</h1>
          <p className="text-lg text-gray-600 mb-6">Discover local restaurants and enjoy delicious food delivered to your door.</p>
          <div className="max-w-xl mx-auto relative">
            <Input
              type="search"
              placeholder="Search for restaurants, cuisines, dishes..."
              className="pl-10 pr-4 py-3 text-base rounded-lg shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Explore Cuisines</h2>
          <Carousel slides={cuisineSlides} options={{ align: 'start' }} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Popular Restaurants</h2>
          <ScrollArea className="w-full"> {/* Potentially wrap grid in ScrollArea if many items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  cuisine={restaurant.cuisine}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;