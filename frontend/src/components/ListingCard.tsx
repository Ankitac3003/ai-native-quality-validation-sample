import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = () => {
    navigate(`/listing/${listing._id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          loading="lazy"
          src={
            listing.images?.[currentImageIndex] ||
            'https://via.placeholder.com/500x500?text=No+Image'
          }
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/500x500?text=No+Image';
          }}
        />

        {/* Guest Favorite Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-md">
          Guest favorite
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:scale-110"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-700 text-lg" />
          )}
        </button>

        {/* Navigation */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 group-hover:flex"
            >
              <FaChevronLeft className="text-xs" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 group-hover:flex"
            >
              <FaChevronRight className="text-xs" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {listing.images.map((_, index) => (
                <span
                  key={index}
                  className={`transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'h-2 w-2 rounded-full bg-white'
                      : 'h-1.5 w-1.5 rounded-full bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Listing Details */}
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="truncate pr-2 text-[15px] font-semibold text-gray-900">
            {listing.location.city}, {listing.location.state}
          </h3>

          {listing.rating && (
            <div className="flex items-center gap-1 text-sm">
              <FaStar className="text-[11px]" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
          )}
        </div>

        <p className="truncate text-sm text-gray-500">
          {listing.propertyType} · {listing.bedrooms}{' '}
          {listing.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
        </p>

        <p className="text-sm text-gray-500">
          {listing.maxGuests} {listing.maxGuests === 1 ? 'guest' : 'guests'} ·{' '}
          {listing.bathrooms}{' '}
          {listing.bathrooms === 1 ? 'bath' : 'baths'}
        </p>

        <div className="pt-1">
          <span className="text-[15px] font-semibold text-gray-900">
            ${listing.price}
          </span>
          <span className="ml-1 text-[15px] text-gray-700">night</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
