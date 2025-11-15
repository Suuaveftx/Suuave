'use client';
import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Snippet } from '@heroui/react';

function WaitList() {
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/waitlist', { method: 'GET' });
      const result = await response.json();

      if (response.ok) {
        setData(result.data || []);
      } else {
        setErrors({ submit: result.message || 'Something went wrong' });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to fetch. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Waitlist Members</h1>

      {loading && (
        <div className='space-y-3'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-24 w-full rounded-xl' />
          ))}
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className='text-gray-500'>No waitlist members found.</p>
      )}

      {!loading && data.length > 0 && (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {data.map((user) => (
            <Card key={user.id} className='p-4 shadow-md border'>
              <h2 className='text-lg font-semibold'>{user.firstName}</h2>
              <Snippet symbol={false}>
                <p className='text-sm text-gray-600'>{user.email}</p>
              </Snippet>

              <p className='text-sm capitalize'>Category: {user.category}</p>
              <p className='text-xs text-gray-400'>
                Joined: {new Date(user.timestamp).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default WaitList;
