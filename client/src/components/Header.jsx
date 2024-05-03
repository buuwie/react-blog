import React from 'react'
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
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
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon />
            </Button>
            <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue' className='hover:text-white' outline>
                    Sign In
                </Button>
            </Link>
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
