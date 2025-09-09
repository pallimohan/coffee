import React, { useState, useEffect } from 'react';

const heroImages = [
  {
    image: "/head3.jpg",
    quote: "Experience the finest coffee crafted with passion."
  },
  {
    image: "/head2.jpg",
    quote: "Where every cup tells a story."
  },
  {
    image: "/head1.jpg",
    quote: "Specialty coffees brewed to perfection."
  },
];

const specialCoffees = [
  {
    name: "Espresso",
    description: "Strong and bold classic Italian coffee",
    image: "/head1.jpg"
  },
  {
    name: "Cappuccino",
    description: "Frothy delight with perfect milk balance",
    image: "/head2.jpg"
  },
  {
    name: "Latte",
    description: "Smooth and creamy, a cafe favorite",
    image: "/head3.jpg"
  },
];

const coffeeQuotes = [
  "Coffee is a hug in a mug.",
  "Life happens, coffee helps.",
  "Adventure in every sip.",
  "Coffee isn't just a drink, it's a lifestyle.",
  "Wake up, drink coffee, and chase your dreams.",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-96 overflow-hidden bg-gray-200">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={img.image}
              alt={img.quote}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-30 w-full h-full flex items-center justify-center">
              <h2
                className="text-[#3f998f] text-3xl sm:text-4xl font-bold text-center px-4"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7), 0 0 8px rgba(63, 153, 143, 0.5)' }}
              >
                {img.quote}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Special Coffees Section */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Special Coffees</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {specialCoffees.map((coffee, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4">
              <img
                src={coffee.image}
                alt={coffee.name}
                className="w-32 h-32 sm:w-28 sm:h-28 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{coffee.name}</h3>
              <p className="text-gray-700 text-center">{coffee.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coffee Quotes Section */}
      <div className="bg-[#2a4a46] py-10 px-4 overflow-hidden">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Coffee Quotes</h2>
        <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto scrollbar-hide px-4">
          {coffeeQuotes.map((quote, idx) => (
            <div key={idx} className="bg-transparent text-white italic text-center text-sm p-2 rounded min-w-[50px] sm:min-w-[200px]">
              "{quote}"
            </div>
          ))}
        </div>
      </div>

      <div className="my-10"></div>

      {/* About Coffee Section */}
      <div className="bg-white py-10 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Coffee</h2>
        <p className="text-gray-700 mb-4">
          Coffee is more than just a beverage—it’s a culture, a ritual, and a source of energy. From its rich aroma to its bold flavors, coffee helps us focus, stay productive, and connect with others. Every sip brings warmth and inspiration to your day.
        </p>
        <p className="text-gray-700">
          Explore the diverse flavors and brewing methods that make coffee a cherished experience across the world.
        </p>
      </div>

      <div className="my-10"></div>

      
    </div>
  );
};

export default Home;