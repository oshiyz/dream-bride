import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Elegant wedding dress"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Dream Bride
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your Premier Destination for Elegant Clothing Rentals
          </p>
          <a
            href="/collections"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Explore Our Collection
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Dream Bride?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Curated Collection</h3>
              <p className="text-gray-700">
                Carefully selected pieces for every special occasion
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Assured</h3>
              <p className="text-gray-700">
                Premium quality garments maintained to perfection
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Rental</h3>
              <p className="text-gray-700">
                Simple booking process and flexible rental terms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Find Your Perfect Outfit?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Browse our collection of elegant dresses and outfits for your special occasions.
            From weddings to parties, we have everything you need to look your best.
          </p>
          <a
            href="/collections"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            View Our Collection
          </a>
        </div>
      </section>
    </div>
  );
}
