import React from 'react';

const chefs = [
  {
    name: "John Brewster",
    specialty: "Espresso Expert",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
    description: "John is passionate about crafting the perfect espresso shot, ensuring each cup is rich, bold, and aromatic."
  },
  {
    name: "Jane Mocha",
    specialty: "Pastry & Desserts",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&auto=format&fit=crop",
    description: "Jane creates delightful coffee-inspired pastries and desserts that pair perfectly with your favorite brew."
  },
  {
    name: "Carlos Roast",
    specialty: "Grill & Savory Bites",
    image: "https://images.unsplash.com/photo-1604908177522-f2f8f5b90e9b?w=400&auto=format&fit=crop",
    description: "Carlos specializes in grilled snacks and savory treats that complement the robust flavors of freshly brewed coffee."
  },
];

const Chef = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 space-y-8">
      <h1 className="text-4xl font-bold text-[#2a4a46] text-center mb-8">Meet Our Coffee Experts</h1>

      {chefs.map((chef, index) => (
        <div 
          key={index} 
          className="bg-white rounded shadow-md max-w-full mx-auto flex flex-col md:flex-row w-full md:w-[100vw] h-auto md:h-72 overflow-hidden"
        >
          {/* Image Section */}
          <div className="md:w-1/3 w-full flex items-center justify-center bg-gray-200 p-4">
            <img 
              src={chef.image} 
              alt={chef.name} 
              className="w-full h-48 object-cover rounded md:rounded-l"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 w-full p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#2a4a46] mb-2">{chef.name}</h2>
            <p className="text-[#2a4a46] italic mb-4">{chef.specialty}</p>
            <p className="text-gray-700">{chef.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chef;
