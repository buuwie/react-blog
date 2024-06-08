import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  
  useEffect(() => {
    document.title = 'Đăng nhập - Bụt kể chuyện'
    if (currentUser) {
      if (from !== '/' && from !== '/sign-in') {
        navigate(from);
      }
      else navigate('/')
    }
  }, [currentUser, navigate]);

  const from = location.state?.origin || '/';
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
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center
      gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className='text-4xl
          font-bold text-white font-lobster text-center'>
              <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
          </Link>
          <p className='text-3xl mt-5 font-square-peg'>
            " chúng ta đều đến với thế giới này để yêu thương, và để được yêu thương. "
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=' font-semibold font-bellota'>
              <Label className='font-semibold font-lora' value='Email' />
              <TextInput 
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}/>
            </div>
            <div className=' font-semibold font-bellota'>
              <Label className='font-semibold font-lora' value='Mật khẩu' />
              <TextInput 
                type='password'
                placeholder='Mật khẩu'
                id='password'
                onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' className='font-lora font-semibold'
            disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' color='pink' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Đăng nhập'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5 font-philosopher'>
            <span>Chưa có tài khoản?</span>
            <Link to='/sign-up' className='text-blue-500'>Đăng kí</Link>
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
