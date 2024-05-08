import React, {useState, useEffect} from 'react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiChartPie, HiOutlineUserGroup, HiAnnotation } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'

export default function DashSidebar() {
  const location = useLocation()
  const dispatch = useDispatch();
  const [tab, setTab] = useState('')
  const { currentUser } = useSelector((state) => state.user);
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
            <SidebarItemGroup className='flex flex-col gap-1'>
                {currentUser && currentUser.isAdmin && (
                  <Link to='/dashboard?tab=main'>
                    <Sidebar.Item
                      active={tab === 'main' || !tab}
                      icon={HiChartPie}
                      as='div'
                    >
                      Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                <Link to='/dashboard?tab=profile'>
                    <SidebarItem as={'div'} active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>
                        Cá nhân
                    </SidebarItem>
                </Link>
                {currentUser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>
                    <SidebarItem
                      active={tab === 'posts'}
                      icon={HiDocumentText}
                      as='div'
                    >
                      Bài viết
                    </SidebarItem>
                  </Link>
                )}
                {currentUser.isAdmin && (
                  <>
                    <Link to='/dashboard?tab=users'>
                      <SidebarItem
                        active={tab === 'users'}
                        icon={HiOutlineUserGroup}
                        as='div'
                      >
                        Người dùng
                      </SidebarItem>
                    </Link>
                    <Link to='/dashboard?tab=comments'>
                      <SidebarItem
                        active={tab === 'comments'}
                        icon={HiAnnotation}
                        as='div'
                      >
                        Bình luận
                      </SidebarItem>
                    </Link>
                  </>
                )}
                <SidebarItem onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                    Đăng xuất
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}
