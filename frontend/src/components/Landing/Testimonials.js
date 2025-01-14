import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Trash2 } from 'lucide-react';

const TestimonialsSection = () => {
  const API_BASE_URL = "https://ai-image-generation-backend-qb5v.onrender.com";
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [deleteStatus, setDeleteStatus] = useState({ show: false, message: '', isError: false });
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    text: '',
    stars: 5,
    image: defaultAvatar
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleDelete = async (testimonialId) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

     
      setTestimonials(prevTestimonials => 
        prevTestimonials.filter(t => t._id !== testimonialId)
      );

      
      setDeleteStatus({
        show: true,
        message: 'Testimonial deleted successfully',
        isError: false
      });

      
      setTimeout(() => {
        setDeleteStatus({ show: false, message: '', isError: false });
      }, 3000);

    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setDeleteStatus({
        show: true,
        message: 'Failed to delete testimonial',
        isError: true
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTestimonial.name,
          role: newTestimonial.role,
          text: newTestimonial.text,
          stars: newTestimonial.stars,
          image: newTestimonial.image
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit testimonial');
      }

      const savedTestimonial = await response.json();
      setTestimonials(prevTestimonials => [savedTestimonial, ...prevTestimonials]);
      
      setNewTestimonial({
        name: '',
        role: '',
        text: '',
        stars: 5,
        image: defaultAvatar
      });
      
      setShowForm(false);
      
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitError(error.message || 'Failed to submit testimonial. Please try again.');
    }
  };

  const handleStarClick = (rating) => {
    setNewTestimonial({ ...newTestimonial, stars: rating });
  };

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center my-20 py-12">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      
      
      {deleteStatus.show && (
        <div className={`mb-4 p-3 rounded-lg ${deleteStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {deleteStatus.message}
        </div>
      )}
      
      <button 
        onClick={() => setShowForm(!showForm)}
        className="mb-8 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        {showForm ? 'Cancel' : 'Share Your Experience'}
      </button>

      {showForm && (
        <div className="w-full max-w-md mb-12 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="text-red-500 text-sm mb-4">
                {submitError}
              </div>
            )}
            
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
                onChange={(e) => {
                  setNewTestimonial(prev => ({
                    ...prev,
                    name: e.target.value
                  }));
                  setSubmitError('');
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Your Role"
                value={newTestimonial.role}
                onChange={(e) => {
                  setNewTestimonial(prev => ({
                    ...prev,
                    role: e.target.value
                  }));
                  setSubmitError('');
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <textarea
                placeholder="Share your experience..."
                value={newTestimonial.text}
                onChange={(e) => {
                  setNewTestimonial(prev => ({
                    ...prev,
                    text: e.target.value
                  }));
                  setSubmitError('');
                }}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-wrap gap-6 mb-8">
        {displayedTestimonials.map((testimonial, index) => (
          <div
            key={testimonial._id || index}
            className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto relative group"
          >
           
            <button
              onClick={() => handleDelete(testimonial._id)}
              className="absolute top-4 right-4 p-2 rounded-full bg-red-100 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete testimonial"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>

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
                    <img key={index} src={assets.rating_star} alt="star" className="w-6 h-6" />
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black transition-colors"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default TestimonialsSection;
