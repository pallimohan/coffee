import React from 'react';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?&w=500&auto=format&fit=crop",
    caption: "Freshly brewed coffee to start your day."
  },
  {
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?&w=500&auto=format&fit=crop",
    caption: "Handcrafted espresso shots with care."
  },
  {
    url: "https://images.unsplash.com/photo-1523473827532-79c7f23c8c23?&w=500&auto=format&fit=crop",
    caption: "Delicious pastries that complement your drink."
  },
  {
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?&w=500&auto=format&fit=crop",
    caption: "Cozy atmosphere perfect for relaxation."
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?&w=500&auto=format&fit=crop",
    caption: "Rich flavors from ethically sourced beans."
  },
  {
    url: "https://images.unsplash.com/photo-1533777324565-a040eb52fac2?&w=500&auto=format&fit=crop",
    caption: "Artful latte designs made by our baristas."
  },
];

const quotes = [
  "Good ideas start with coffee.",
  "Life’s too short for bad coffee.",
  "Coffee is a language in itself.",
  "Pour happiness into your cup.",
  "Where coffee meets creativity.",
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#2a4a46] mb-4">Our Coffee Gallery</h1>
        <p className="text-[#2a4a46] italic text-lg">"Coffee is always a good idea"</p>
        <p className="text-[#2a4a46] mt-2">Explore our ambiance, flavors, and treats that delight every sense.</p>
      </div>

      {/* Quotes Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-[#2a4a46] mb-4 text-center">Why Our Coffee?</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, index) => (
            <div key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
              <p className="text-[#2a4a46] text-center italic">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#2a4a46] mb-8 text-center">Discover Our Delights</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img 
                src={img.url} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center text-sm px-4">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold text-[#2a4a46] mb-4">Join the Coffee Experience</h2>
        <p className="text-[#2a4a46] mb-6">Enjoy a welcoming space where every cup tells a story and every bite delights your palate.</p>
        <button className="bg-[#2a4a46] text-white px-6 py-3 rounded hover:bg-[#1f3b36] transition duration-300">Visit Us Today</button>
      </div>

    </div>
  );
};

export default Gallery;
