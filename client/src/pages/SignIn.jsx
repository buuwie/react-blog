import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Vui lòng nhập đầy đủ thông tin đăng nhập!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
              <Label value='Your email' />
              <TextInput 
                type='email'
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
                ) : 'Sign In'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
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
