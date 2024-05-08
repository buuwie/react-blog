import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'

export default function Header() {
    const {currentUser} = useSelector((state) => state.user)
    const {theme} = useSelector((state) => state.theme)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const path = useLocation().pathname;

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
    
    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
            navigate('/sign-in')
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

  return (
    <Navbar className="border-b-2 bg-[url('https://i.pinimg.com/564x/dc/b4/7e/dcb47e8d388c483c36c6e0ffd1585bd3.jpg')] bg-no-repeat bg-cover">
        <Link to="/" className='self-center whitespace-nowrap text-kechuyentextlight text-sm sm:text-3xl
        font-semibold dark:text-white font-lobster'>
            <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput 
                type='text'
                placeholder='Tìm kiếm...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill
            onClick={() => dispatch(toggleTheme())}>
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </Button>
            {currentUser ? (
                <Dropdown arrowIcon={false} inline label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }>
                    <DropdownHeader>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </DropdownHeader>
                    <Link to={'/dashboard/?tab=profile'}>
                        <DropdownItem>Cá nhân</DropdownItem>
                    </Link>
                    <DropdownDivider />
                    <DropdownItem onClick={handleSignout}>Đăng xuất</DropdownItem>
                </Dropdown>
            ):
            (
                <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' className='hover:text-white' outline>
                        Đăng nhập
                    </Button>
                </Link>
            )
            }
            
            <NavbarToggle />
        </div>
        <NavbarCollapse>
            <NavbarLink href='/' active={path === '/'} as={'div'} className='font-semibold'>
                <Link to='/' style={{ color: path === '/' ? '#009fcb' : 'inherit' }}>
                    Trang chủ
                </Link>
            </NavbarLink>
            <NavbarLink href='/about' active={path === '/about'} as={'div'} className='font-semibold'>
                <Link to='/about' style={{ color: path === '/about' ? '#009fcb' : 'inherit' }}>
                    Giới thiệu
                </Link>
            </NavbarLink>
            <NavbarLink href='/search' active={path === '/search'} as={'div'} className='font-semibold'>
                <Link to='/search' style={{ color: path === '/search' ? '#009fcb' : 'inherit' }}>
                    Bài viết
                </Link>
            </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  )
}
