import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating?: number;
  deliveryTime?: string; // e.g., "20-30 min"
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className="w-full overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-1.5">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <p className="text-sm text-gray-600 truncate">{cuisine}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          {rating && (
            <span className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
              {rating.toFixed(1)}
            </span>
          )}
          {deliveryTime && (
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {deliveryTime}
            </span>
          )}
        </div>
         {/* Example: <Badge variant="outline" className="mt-1">Promoted</Badge> */}
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;