import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const TestimonialsSection = () => {

    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [testimonials, setTestimonials] = useState([
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      text: "The image quality and creative possibilities are mind-blowing! I've used this for multiple projects.",
      stars: 5,
      image: defaultAvatar
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      text: "Excellent tool that has streamlined our content creation process significantly.",
      stars: 5,
      image: defaultAvatar
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    text: '',
    stars: 5,
    image: defaultAvatar
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.text) {
      return; 
    }
    setTestimonials([...testimonials, newTestimonial]);
    setNewTestimonial({
      name: '',
      role: '',
      text: '',
      stars: 5,
      image: defaultAvatar
    });
    setShowForm(false);
  };

  const handleStarClick = (rating) => {
    setNewTestimonial({ ...newTestimonial, stars: rating });
  };

  return (
    <div className="flex flex-col items-center justify-center my-20 py-12">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      
      
      <button 
        onClick={() => setShowForm(!showForm)}
        className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {showForm ? 'Cancel' : 'Share Your Experience'}
      </button>

     
      {showForm && (
        <div className="w-full max-w-md mb-12 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex flex-col items-center mb-6">
              <img 
                src={defaultAvatar}
                alt="Your Avatar"
                className="w-20 h-20 rounded-full border-2 border-gray-200 mb-2 object-cover"
              />
              <span className="text-sm text-gray-500">Your Profile Picture</span>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({
                  ...newTestimonial,
                  name: e.target.value
                })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Your Role"
                value={newTestimonial.role}
                onChange={(e) => setNewTestimonial({
                  ...newTestimonial,
                  role: e.target.value
                })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Share your experience..."
                value={newTestimonial.text}
                onChange={(e) => setNewTestimonial({
                  ...newTestimonial,
                  text: e.target.value
                })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="focus:outline-none"
                  >
                    <img
                      src={assets.rating_star}
                      className={`w-6 h-6 ${
                        star <= newTestimonial.stars
                          ? 'opacity-100'
                          : 'opacity-30'
                      }`}
                      alt={`${star} star`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

     
      <div className="flex flex-wrap gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
          >
            <div className="flex flex-col items-center">
              <img
                className="rounded-full w-14 h-14 object-cover border-2 border-gray-200"
                src={testimonial.image}
                alt={`${testimonial.name}'s profile`}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>
              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((_, index) => (
                    <img key={index} src={assets.rating_star} alt="star" />
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;