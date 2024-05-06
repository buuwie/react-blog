import React, {useState, useEffect} from 'react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'

export default function DashSidebar() {
    const location = useLocation()
  const dispatch = useDispatch();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup>
                <Link to='/dashboard/?tab=profile'>
                    <SidebarItem as={'div'} active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
                        Profile
                    </SidebarItem>
                </Link>
                
                <SidebarItem onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}
