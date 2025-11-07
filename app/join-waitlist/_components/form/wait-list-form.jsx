import React, { useState } from 'react';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    category: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);

      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitted(true);

          // Reset form after 3 seconds
          setTimeout(() => {
            setFormData({ firstName: '', email: '', category: '' });
            setSubmitted(false);
          }, 3000);
        } else {
          setErrors({ submit: data.message || 'Something went wrong' });
        }
      } catch (error) {
        setErrors({ submit: 'Failed to submit. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Join the Waitlist</h1>
            <p className='text-gray-600'>Be the first to know when we launch</p>
          </div>

          {submitted ? (
            <div className='bg-green-50 border border-green-200 rounded-lg p-6 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-green-900 mb-1'>
                You are on the list!
              </h3>
              <p className='text-green-700 text-sm'>
                We will notify you as soon as we launch.
              </p>
            </div>
          ) : (
            <div className='space-y-5'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.firstName
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-white'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none`}
                  placeholder='Enter your first name'
                />
                {errors.firstName && (
                  <p className='mt-1 text-sm text-red-600'>{errors.firstName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none`}
                  placeholder='your@email.com'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  I am a...
                </label>
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.category
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-white'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5rem',
                  }}
                >
                  <option value=''>Select a category</option>
                  <option value='brand'>Brand</option>
                  <option value='artist'>Artist</option>
                </select>
                {errors.category && (
                  <p className='mt-1 text-sm text-red-600'>{errors.category}</p>
                )}
              </div>

              {errors.submit && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700'>
                  {errors.submit}
                </div>
              )}

              <button
                style={{
                  background: 'radial-gradient(circle at top left, #FFFFFF, #CCE7F2)',
                }}
                onClick={handleSubmit}
                disabled={loading}
                className='  mx-auto w-full text-lg h-[52px] text-center  text-gray-500 flex items-center justify-center gap-2 font-proximanova font-medium px-6 py-3 rounded-full shadow-md'
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
          )}

          <p className='text-center text-sm text-gray-500 mt-6'>
            We respect your privacy. We will not share your data.
          </p>
        </div>
      </div>
    </div>
  );
}
