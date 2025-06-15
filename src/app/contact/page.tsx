'use client';

import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    alert('Thank you for your message. We will get back to you soon!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Address</h3>
                  <p className="text-gray-800">
                    123 Fashion Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Phone</h3>
                  <p className="text-gray-800">
                    Main: (555) 123-4567<br />
                    Support: (555) 987-6543
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
                  <p className="text-gray-800">
                    info@dreambride.com<br />
                    support@dreambride.com
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Business Hours</h3>
                  <p className="text-gray-800">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Facebook
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Instagram
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="rental">Rental Information</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-100">
        <div className="h-full w-full">
          {/* Add your map component or iframe here */}
          <div className="h-full w-full flex items-center justify-center text-gray-800">
            Map will be displayed here
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 