import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

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

  useEffect(() => {
    document.title = 'Đăng kí - Bụt kể chuyện'
  })
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center
      gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className=' text-4xl
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
            <div className=''>
              <Label className='font-lora font-semibold' value='Tên người dùng' />
              <TextInput 
                type='text'
                className='font-semibold font-bellota'
                placeholder='Tên người dùng'
                id='username'
                onChange={handleChange}/>
            </div>
            <div className=''>
              <Label className='font-lora font-semibold' value='Email' />
              <TextInput 
                type='text'
                placeholder='Email'
                className='font-semibold font-bellota'
                id='email'
                onChange={handleChange}/>
            </div>
            <div className=''>
              <Label className='font-lora font-semibold' value='Mật khẩu' />
              <TextInput 
                type='password'
                placeholder='Mật khẩu'
                className='font-semibold font-bellota'
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
                ) : 'Đăng kí'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5 font-philosopher'>
            <span>Đã có tài khoản?</span>
            <Link to='/sign-in' className='text-blue-500'>Đăng nhập</Link>
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
