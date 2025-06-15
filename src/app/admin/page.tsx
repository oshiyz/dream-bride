'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

const AdminPage = () => {
  const [dressDetails, setDressDetails] = useState({
    name: '',
    description: '',
    category: '',
    pricePerDay: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [dresses, setDresses] = useState<any[]>([]);
  const [editingDress, setEditingDress] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchDresses();
      }
    };
    checkUser();
  }, []);

  const fetchDresses = async () => {
    try {
      const { data, error } = await supabase
        .from('dresses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDresses(data || []);
    } catch (error) {
      console.error('Error fetching dresses:', error);
      setMessage({
        type: 'error',
        text: 'Error fetching dresses. Please try again.',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dress?')) return;

    try {
      const { error } = await supabase
        .from('dresses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessage({
        type: 'success',
        text: 'Dress deleted successfully!',
      });
      fetchDresses();
    } catch (error) {
      console.error('Error deleting dress:', error);
      setMessage({
        type: 'error',
        text: 'Error deleting dress. Please try again.',
      });
    }
  };

  const handleEdit = (dress: any) => {
    setEditingDress(dress);
    setDressDetails({
      name: dress.name,
      description: dress.description,
      category: dress.category,
      pricePerDay: dress.price_per_day.toString(),
    });
    setImages([]);
    setPreviewUrls([]);
    setCurrentView('edit');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrls = editingDress.images || [];

      if (images.length > 0) {
        const newImageUrls = await Promise.all(
          images.map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { data, error } = await supabase.storage
              .from('dresses')
              .upload(fileName, file);

            if (error) throw error;
            return data.path;
          })
        );

        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const { error } = await supabase
        .from('dresses')
        .update({
          name: dressDetails.name,
          description: dressDetails.description,
          category: dressDetails.category,
          price_per_day: parseFloat(dressDetails.pricePerDay),
          images: imageUrls,
        })
        .eq('id', editingDress.id);

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Dress updated successfully!',
      });
      setCurrentView('list');
      setEditingDress(null);
      setDressDetails({
        name: '',
        description: '',
        category: '',
        pricePerDay: '',
      });
      setImages([]);
      setPreviewUrls([]);
      fetchDresses();
    } catch (error) {
      console.error('Error updating dress:', error);
      setMessage({
        type: 'error',
        text: 'Error updating dress. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const imageUrls = await Promise.all(
        images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { data, error } = await supabase.storage
            .from('dresses')
            .upload(fileName, file);

          if (error) throw error;
          return data.path;
        })
      );

      const { error } = await supabase
        .from('dresses')
        .insert([
          {
            name: dressDetails.name,
            description: dressDetails.description,
            category: dressDetails.category,
            price_per_day: parseFloat(dressDetails.pricePerDay),
            images: imageUrls,
          },
        ]);

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Dress added successfully!',
      });
      setCurrentView('list');
      setDressDetails({
        name: '',
        description: '',
        category: '',
        pricePerDay: '',
      });
      setImages([]);
      setPreviewUrls([]);
      fetchDresses();
    } catch (error) {
      console.error('Error adding dress:', error);
      setMessage({
        type: 'error',
        text: 'Error adding dress. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Error signing in:', error);
      setMessage({
        type: 'error',
        text: 'Error signing in. Please check your credentials.',
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removePreviewImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeCurrentImage = async (imageUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!editingDress) return;

    try {
      // Remove from Supabase storage
      const { error } = await supabase.storage
        .from('dresses')
        .remove([imageUrl]);

      if (error) throw error;

      // Update the dress in the database
      const updatedImages = editingDress.images.filter((url: string) => url !== imageUrl);
      const { error: updateError } = await supabase
        .from('dresses')
        .update({ images: updatedImages })
        .eq('id', editingDress.id);

      if (updateError) throw updateError;

      // Update local state
      setEditingDress(prev => ({
        ...prev,
        images: updatedImages
      }));

      setMessage({
        type: 'success',
        text: 'Image removed successfully!',
      });
    } catch (error) {
      console.error('Error removing image:', error);
      setMessage({
        type: 'error',
        text: 'Error removing image. Please try again.',
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={authLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {authLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'add':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Dress</h2>
              <button
                onClick={() => setCurrentView('list')}
                className="px-4 py-2 text-sm text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Back to List
              </button>
            </div>
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                  Dress Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={dressDetails.name}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={dressDetails.category}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                >
                  <option value="">Select a category</option>
                  <option value="wedding">Wedding Dresses</option>
                  <option value="party">Party Dresses</option>
                  <option value="formal">Formal Wear</option>
                  <option value="casual">Casual Wear</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={dressDetails.description}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-800 mb-1">
                  Price per Day ($)
                </label>
                <input
                  type="number"
                  id="pricePerDay"
                  value={dressDetails.pricePerDay}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, pricePerDay: e.target.value }))}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-800"
                />
                {previewUrls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">New Images:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={url}
                            alt={`Preview ${index + 1}`}
                            width={150}
                            height={150}
                            className="rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => removePreviewImage(index, e)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  className="px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? 'Adding Dress...' : 'Add Dress'}
                </button>
              </div>
            </form>
          </div>
        );

      case 'edit':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Dress</h2>
              <button
                onClick={() => setCurrentView('list')}
                className="px-4 py-2 text-sm text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Back to List
              </button>
            </div>
            <form onSubmit={handleUpdate} className="max-w-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                  Dress Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={dressDetails.name}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={dressDetails.category}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                >
                  <option value="">Select a category</option>
                  <option value="wedding">Wedding Dresses</option>
                  <option value="party">Party Dresses</option>
                  <option value="formal">Formal Wear</option>
                  <option value="casual">Casual Wear</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={dressDetails.description}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-800 mb-1">
                  Price per Day ($)
                </label>
                <input
                  type="number"
                  id="pricePerDay"
                  value={dressDetails.pricePerDay}
                  onChange={(e) => setDressDetails(prev => ({ ...prev, pricePerDay: e.target.value }))}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-800"
                />
                {editingDress && editingDress.images && editingDress.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Current Images:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {editingDress.images.map((imageUrl: string, index: number) => (
                        <div key={index} className="relative group">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dresses/${imageUrl}`}
                            alt={`Current Image ${index + 1}`}
                            width={150}
                            height={150}
                            className="rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => removeCurrentImage(imageUrl, e)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {previewUrls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">New Images:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={url}
                            alt={`Preview ${index + 1}`}
                            width={150}
                            height={150}
                            className="rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => removePreviewImage(index, e)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  className="px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? 'Updating Dress...' : 'Update Dress'}
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Dress List</h2>
              <button
                onClick={() => {
                  setCurrentView('add');
                  setDressDetails({
                    name: '',
                    description: '',
                    category: '',
                    pricePerDay: '',
                  });
                  setImages([]);
                  setPreviewUrls([]);
                }}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add New Dress
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Price/Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dresses.map((dress) => (
                    <tr key={dress.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{dress.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{dress.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">${dress.price_per_day}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(dress)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dress.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            <button
              onClick={() => setCurrentView('list')}
              className={`w-full px-4 py-2 text-left ${
                currentView === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Dress List
            </button>
            <button
              onClick={() => {
                setCurrentView('add');
                setDressDetails({
                  name: '',
                  description: '',
                  category: '',
                  pricePerDay: '',
                });
                setImages([]);
                setPreviewUrls([]);
              }}
              className={`w-full px-4 py-2 text-left ${
                currentView === 'add' ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Add New Dress
            </button>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
            >
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {message.text && (
            <div className={`p-4 m-4 rounded-lg ${
              message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {message.text}
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 