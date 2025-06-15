'use client';

import { useState } from 'react';
import Image from 'next/image';

// Dummy data for categories
const categories = [
  { id: 'wedding', name: 'Wedding Dresses', icon: '👰' },
  { id: 'homecoming', name: 'Homecoming Dresses', icon: '🎓' },
  { id: 'party', name: 'Party Dresses', icon: '🎉' },
  { id: 'kids', name: 'Kids Collection', icon: '👶' },
  { id: 'formal', name: 'Formal Wear', icon: '👔' },
];

// Dummy data for clothing items
const clothingItems = [
  {
    id: 1,
    category: 'wedding',
    name: 'Elegant White Wedding Gown',
    price: 299,
    duration: '3 days',
    image: '/images/wedding-dress-1.jpg',
    description: 'Beautiful A-line wedding dress with lace details and train',
    size: 'S, M, L, XL',
  },
  {
    id: 2,
    category: 'wedding',
    name: 'Princess Ball Gown',
    price: 349,
    duration: '3 days',
    image: '/images/wedding-dress-2.jpg',
    description: 'Stunning ball gown with crystal embellishments',
    size: 'S, M, L',
  },
  {
    id: 3,
    category: 'homecoming',
    name: 'Sparkling Homecoming Dress',
    price: 149,
    duration: '2 days',
    image: '/images/homecoming-1.jpg',
    description: 'Glittering short dress perfect for homecoming',
    size: 'XS, S, M, L',
  },
  {
    id: 4,
    category: 'party',
    name: 'Cocktail Party Dress',
    price: 99,
    duration: '2 days',
    image: '/images/party-1.jpg',
    description: 'Elegant cocktail dress with floral pattern',
    size: 'S, M, L',
  },
  {
    id: 5,
    category: 'kids',
    name: 'Princess Party Dress',
    price: 49,
    duration: '2 days',
    image: '/images/kids-1.jpg',
    description: 'Adorable party dress for little princesses',
    size: '3-4Y, 5-6Y, 7-8Y',
  },
  {
    id: 6,
    category: 'formal',
    name: 'Evening Gown',
    price: 199,
    duration: '3 days',
    image: '/images/formal-1.jpg',
    description: 'Sophisticated evening gown for special occasions',
    size: 'S, M, L, XL',
  },
];

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? clothingItems
    : clothingItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Collections</h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Collections
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Clothing Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clothingItems
            .filter((item) => selectedCategory === 'all' || item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={item.id <= 3}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                  <p className="text-gray-800 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-blue-600 font-bold text-xl">${item.price}</p>
                      <p className="text-gray-800 text-sm">per {item.duration}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-800">Size:</span>
                      <span className="font-medium text-gray-800">{item.size}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition-colors">
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 