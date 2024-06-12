import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Table, TableHead, TableHeadCell, TableBody, TableCell, TableRow,
  Modal, Button
 } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashPosts() {

  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(() => {
    document.title = 'Quản lý bài viết - Bụt kể chuyện'
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <div className='md:mx-auto'>
      <div className='table-auto font-semibold overflow-x-auto md:mx-auto p-3'>
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <TableHead className='font-philosopher'>
                <TableHeadCell>Lần cuối chỉnh sửa</TableHeadCell>
                <TableHeadCell>Thumbnail</TableHeadCell>
                <TableHeadCell>Tiêu đề</TableHeadCell>
                <TableHeadCell>Chủ đề</TableHeadCell>
                <TableHeadCell>Tác vụ</TableHeadCell>
                <TableHeadCell>
                  <span> </span>
                </TableHeadCell>
              </TableHead>
              {userPosts.map((post) => (
                <TableBody className='divide-y font-bellota'>
                  <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image ?? 'https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F270784039_3078232489054877_4577822641455101192_n.jpg?alt=media&token=702a9a4c-7e3b-439d-bca7-69c5203f353d'}
                          
                          className='w-20 h-10 object-cover bg-gray-500'
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className='font-medium text-gray-900 dark:text-white'
                        to={`/post/${post.slug}`}
                      >
                        {truncateText(post.title, 25)}
                      </Link>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Xóa
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        className='text-teal-500 hover:underline'
                        to={`/update-post/${post._id}`}
                      >
                        <span>Chỉnh sửa</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
            
          </>
        ) : (
          <p className='font-lora font-semibold'>Bạn chưa có bài viết nào!</p>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Bạn có chắc muốn xóa bài viết này?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeletePost}>
                  Có, tôi chắc chắn
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  Không, tôi muốn hủy
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7 font-lora font-semibold'
              >
                Hiển thị thêm
              </button>
            )}
    </div>
  )
}
