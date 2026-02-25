import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';

interface WishlistButtonProps {
  onClick: () => void;
}

export default function WishlistButton({ onClick }: WishlistButtonProps) {
  const { wishlistCount } = useWishlist();

  if (wishlistCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label={`Open wishlist (${wishlistCount} saved)`}
    >
      <Heart size={22} className="fill-matte-black text-matte-black" />
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#111111] border border-gold text-gold text-xs font-inter font-medium rounded-full flex items-center justify-center">
        {wishlistCount}
      </span>
    </button>
  );
}
