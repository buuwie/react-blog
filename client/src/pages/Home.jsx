import React from 'react'
import { useLocation } from 'react-router-dom';
import { Alert } from 'flowbite-react';

export default function Home() {
  const location = useLocation();
    const errorMessage = location.state && location.state.error;
  
  return (
    <div>
      {errorMessage && (
      <Alert color='failure' className='mt-5'>
        {errorMessage}
      </Alert>
  )}
      Home</div>
  )
}
