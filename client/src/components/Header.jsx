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
    const location = useLocation();
    const path = useLocation().pathname;

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleIconClick = () => {
        navigate('/search');
      };

    const handleLoginClick = () => {
        // console.log('Navigating to login from:', location.pathname);
        navigate('/sign-in', { state: { origin: location.pathname } });
    }
    
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
    <Navbar className="border-b-2 bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2Fhinh-anh-mua-sao-bang-dep-nhat-37-header.jpg?alt=media&token=75647ba2-71fb-417b-b536-14e5b9dc11a3')] bg-no-repeat bg-cover">
        <Link to="/" className='self-center whitespace-nowrap text-kechuyentextlight text-lg sm:text-3xl
        font-semibold dark:text-white font-lobster'>
            <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput 
                type='text'
                placeholder='Tìm kiếm...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline font-bellota font-semibold'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch onClick={handleIconClick} />
        </Button>
        <div className='flex header-buttons flex-row justify-between items-center gap-2 md:order-2'>
            <Button className='w-12 h-10 sm:inline' color='gray' pill
            onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' || !theme ? <FaSun /> : <FaMoon />}
            </Button>
            {currentUser ? (
                <Dropdown arrowIcon={false} inline label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }>
                    <DropdownHeader>
                        <span className='block text-sm font-poetsen-one'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium font-comic truncate'>{currentUser.email}</span>
                    </DropdownHeader>
                    {currentUser.isAdmin ? (
                        <Link to={'/dashboard?tab=main'}>
                            <DropdownItem className='font-bellota font-semibold'>Dashboard</DropdownItem>
                        </Link>
                    ) : (
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem className='font-bellota font-semibold'>Cá nhân</DropdownItem>
                        </Link>
                    )}
                    <DropdownDivider/>
                    {currentUser.isAdmin && (
                        <>
                            <Link to={'/create-post'}>
                                <DropdownItem className='font-bellota font-semibold'>Tạo bài viết mới</DropdownItem>
                            </Link>
                        </>
                    )}
                    <DropdownDivider />
                    <DropdownItem onClick={handleSignout} className='font-bellota font-semibold'>Đăng xuất</DropdownItem>
                </Dropdown>
            ):
            (
                
                <Button gradientDuoTone='purpleToBlue' className='hover:text-white' outline onClick={handleLoginClick}>
                    Đăng nhập
                </Button>
            )
            }
            
            <NavbarToggle />
        </div>
        <NavbarCollapse>
            <Link to='/'>
                <NavbarLink active={path === '/'} as={'div'} className='font-semibold text-kechuyentextlight font-philosopher text-lg'>
                    <Link to='/' style={{ color: path === '/' ? '#05f7ff' : 'inherit' }}>
                        Trang chủ
                    </Link>
                </NavbarLink>
            </Link>
            <Link to='/about'>
                <NavbarLink active={path === '/about'} as={'div'} className='font-semibold text-kechuyentextlight font-philosopher text-lg'>
                    <Link to='/about' style={{ color: path === '/about' ? '#05f7ff' : 'inherit' }}>
                        Giới thiệu
                    </Link>
                </NavbarLink>
            </Link>
            <Link to='/search'>
                <NavbarLink active={path === '/search'} as={'div'} className='font-semibold text-kechuyentextlight font-philosopher text-lg'>
                    <Link to='/search' style={{ color: path === '/search' ? '#05f7ff' : 'inherit' }}>
                        Bài viết
                    </Link>
                </NavbarLink>
            </Link>
            
        </NavbarCollapse>
    </Navbar>
  )
}
