import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CuisineCarouselItemProps {
  id: string | number;
  name: string;
  imageUrl: string;
  onClick?: (id: string | number) => void;
}

const CuisineCarouselItem: React.FC<CuisineCarouselItemProps> = ({
  id,
  name,
  imageUrl,
  onClick,
}) => {
  console.log("Rendering CuisineCarouselItem:", name);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className="w-full overflow-hidden cursor-pointer transition-all hover:shadow-md"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <AspectRatio ratio={16 / 9}>
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      </AspectRatio>
      <CardContent className="p-3">
        <h3 className="text-sm font-medium text-center truncate">{name}</h3>
      </CardContent>
    </Card>
  );
};

export default CuisineCarouselItem;