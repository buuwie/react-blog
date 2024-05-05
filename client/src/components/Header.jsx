import React from 'react'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'

export default function Header() {
    const {currentUser} = useSelector((state) => state.user)
    const {theme} = useSelector((state) => state.theme)
    const dispatch = useDispatch()
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-kechuyentextlight text-sm sm:text-3xl
        font-semibold dark:text-white font-lobster'>
            <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
        </Link>
        <form action="">
            <TextInput 
                type='text'
                placeholder='Tìm kiếm...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
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
                        <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <DropdownDivider />
                    <DropdownItem>Sign Out</DropdownItem>
                </Dropdown>
            ):
            (
                <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' className='hover:text-white' outline>
                        Sign In
                    </Button>
                </Link>
            )
            }
            
            <NavbarToggle />
        </div>
        <NavbarCollapse>
            <NavbarLink href='/' as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </NavbarLink>
            <NavbarLink href='/about' as={'div'}>
                <Link to='/about'>
                    About
                </Link>
            </NavbarLink>
            <NavbarLink href='/projects' as={'div'}>
                <Link to='/projects'>
                    Projects
                </Link>
            </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  )
}
