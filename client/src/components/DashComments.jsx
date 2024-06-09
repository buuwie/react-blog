import { Table, TableHead, TableHeadCell, TableBody, TableCell, TableRow,
    Modal, Button, ModalBody, ModalHeader
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  useEffect(() => {
    document.title = 'Quản lý bình luận - Bụt kể chuyện'
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className='table-auto font-semibold overflow-x-auto md:mx-auto p-3'>
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <TableHead className='font-philosopher'>
                <TableHeadCell>Ngày chỉnh sửa</TableHeadCell>
                <TableHeadCell>Lời bình luận</TableHeadCell>
                <TableHeadCell>Lượt thích</TableHeadCell>
                <TableHeadCell>ID bài viết</TableHeadCell>
                <TableHeadCell>ID người dùng</TableHeadCell>
                <TableHeadCell>Tác vụ</TableHeadCell>
              </TableHead>
              {comments.map((comment) => (
                <TableBody className='divide-y font-bellota' key={comment._id}>
                  <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{comment.content}</TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                    <TableCell>{comment.postId}</TableCell>
                    <TableCell>{comment.userId}</TableCell>
                    <TableCell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Xóa
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </>
        ) : (
          <p className='font-lora font-semibold'>Bạn chưa có bình luận nào!</p>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <ModalHeader />
          <ModalBody>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Bạn có chắc muốn xóa bình luận này?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteComment}>
                  Có, tôi chắc chắn
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  Không, tôi muốn hủy
                </Button>
              </div>
            </div>
          </ModalBody>
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
  );
}