'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Dress {
  id: number;
  name: string;
  description: string;
  category: string;
  price_per_day: number;
  images: string[];
}

const CollectionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('dresses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching dresses:', error);
          throw error;
        }

        setDresses(data || []);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load dresses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  const filteredDresses = selectedCategory === 'all'
    ? dresses
    : dresses.filter(dress => {
        console.log('Dress category:', dress.category);
        console.log('Selected category:', selectedCategory);
        console.log('Match:', dress.category === selectedCategory);
        return dress.category === selectedCategory;
      });

  console.log('All dresses:', dresses);
  console.log('Filtered dresses:', filteredDresses);

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'Wedding Dresses', name: 'Wedding Dresses' },
    { id: 'Party Dresses', name: 'Party Dresses' },
    { id: 'Formal Wear', name: 'Formal Wear' },
    { id: 'Casual Wear', name: 'Casual Wear' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Our Collections</h1>
            <p className="text-xl text-gray-200">
              Discover our curated selection of elegant outfits
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredDresses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No dresses found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDresses.map((dress) => (
              <div key={dress.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  {dress.images && dress.images[0] && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dresses/${dress.images[0]}`}
                      alt={dress.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{dress.name}</h3>
                  <p className="text-gray-600 mb-4">{dress.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      ${dress.price_per_day}/day
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage; 