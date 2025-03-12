import React from "react";
import { Heart, MapPin, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ListingCard = ({ image, title, description, price, location, tags, onFavorite }) => {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-lg hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />
      <CardContent className="p-4">
        <h3 className="text-xl font-bold truncate">{title}</h3>
        {price && <p className="text-lg font-semibold text-green-600">${price}</p>}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <MapPin size={16} /> <span>{location}</span>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-gray-200 rounded-md">
                <Tag size={12} className="inline-block mr-1" /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button onClick={onFavorite} className="text-gray-500 hover:text-red-500">
            <Heart size={20} />
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;