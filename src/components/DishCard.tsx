import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface DishCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
  // onShowDetails?: (id: string | number) => void; // Optional: if clicking card shows dialog
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  // onShowDetails,
}) => {
  console.log("Rendering DishCard:", name);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click if any
    onAddToCart(id);
    // Consider adding a toast notification here via useToast hook
    // e.g., toast({ title: "Added to cart!", description: name });
  };

  // const handleCardClick = () => {
  //   if (onShowDetails) onShowDetails(id);
  // };

  return (
    <Card className="w-full flex flex-col overflow-hidden"> {/* onClick={handleCardClick} if card click opens details */}
      {imageUrl && (
        <CardHeader className="p-0">
            <AspectRatio ratio={16/9}>
                <img
                src={imageUrl}
                alt={name}
                className="object-cover w-full h-full"
                onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
                />
            </AspectRatio>
        </CardHeader>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-md font-semibold">{name}</CardTitle>
        {description && (
          <CardDescription className="text-xs text-gray-600 mt-1 line-clamp-2">
            {description}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">${price.toFixed(2)}</span>
        <Button size="sm" onClick={handleAddToCart}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DishCard;