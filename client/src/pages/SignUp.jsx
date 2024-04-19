import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Vui lòng nhập đầy đủ thông tin');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center
      gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className=' text-kechuyentextlight text-4xl
          font-bold dark:text-white font-lobster text-center'>
              <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
          </Link>
          <p className='text-md mt-5 font-philosopher'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dignissimos quas quis enim autem quaerat esse laudantium repellendus, ut quidem est nihil dicta reprehenderit laboriosam similique sint ullam unde hic.
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your username' />
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}/>
            </div>
            <div className=''>
              <Label value='Your email' />
              <TextInput 
                type='text'
                placeholder='Email'
                id='email'
                onChange={handleChange}/>
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'
            disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' color='pink' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
