'use client';

import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/about-hero.jpg"
          alt="Dream Bride store"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Dream Bride</h1>
          <p className="text-xl md:text-2xl">Your Premier Destination for Elegant Clothing Rentals</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Story</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-800 mb-6">
              Founded in 2015, Dream Bride began with a simple yet powerful vision: to make luxury fashion accessible to everyone. What started as a small boutique has grown into a premier destination for clothing rentals, serving thousands of customers across the country.
            </p>
            <p className="text-gray-800 mb-6">
              Our journey began when our founder, Dilani Vithanage, noticed a gap in the market for high-quality, affordable clothing rentals. With her background in fashion and business, she set out to create a service that would allow people to wear designer pieces without the hefty price tag.
            </p>
            <p className="text-gray-800">
              Today, we're proud to offer an extensive collection of carefully curated pieces, from wedding dresses to evening gowns, all maintained to the highest standards. Our commitment to quality, sustainability, and customer satisfaction has made us the go-to destination for special occasions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Person Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/founder.jpg"
                  alt="Dilani Vithanage - Founder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Meet Our Founder</h2>
              <h3 className="text-xl text-blue-600 font-semibold mb-4">Dilani Vithanage</h3>
              <p className="text-gray-800 mb-6">
                With over 15 years of experience in the fashion industry, Dilani has revolutionized the way people think about clothing ownership. Her vision and leadership have made Dream Bride a household name in the rental fashion industry.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-2xl font-bold text-blue-600">15+</p>
                  <p className="text-gray-800">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">10k+</p>
                  <p className="text-gray-800">Happy Customers</p>
                </div>
              </div>
              <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800">
                "Fashion should be accessible to everyone. Our mission is to make luxury clothing available to all, while promoting sustainable fashion practices."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality</h3>
              <p className="text-gray-800">
                We maintain the highest standards in our collection and service
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Sustainability</h3>
              <p className="text-gray-800">
                Promoting eco-friendly fashion through our rental model
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Customer Care</h3>
              <p className="text-gray-800">
                Dedicated to providing exceptional service to our clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Experience Dream Bride?</h2>
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
            Browse our collection of elegant dresses and outfits for your special occasions.
            From weddings to parties, we have everything you need to look your best.
          </p>
          <a
            href="/collections"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Explore Our Collection
          </a>
        </div>
      </section>
    </div>
  );
} 