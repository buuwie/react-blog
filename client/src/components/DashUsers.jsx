import { Table, TableHead, TableHeadCell, Modal, Button} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  useEffect(() => {
    document.title = 'Quản lý người dùng - Bụt kể chuyện'
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <div  className='md:mx-auto'>
      <div className='table-auto font-semibold overflow-x-auto md:mx-auto p-3 mb-5'>
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className='shadow-md w-full min-w-[600px]'>
              <TableHead className='font-philosopher'>
                <TableHeadCell>Ngày tạo</TableHeadCell>
                <TableHeadCell>Avatar</TableHeadCell>
                <TableHeadCell>Tên người dùng</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Admin</TableHeadCell>
                <TableHeadCell>Tác vụ</TableHeadCell>
              </TableHead>
              {users.map((user) => (
                <Table.Body className='divide-y font-bellota' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <FaTimes className='text-red-500' />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Xóa
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p className='font-lora font-semibold'>Chưa có người dùng nào!</p>
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
                Bạn có chắc muốn xóa người dùng này?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
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
                className='w-full text-teal-500 self-center text-sm py-7 font-lora'
              >
                Hiển thị thêm
              </button>
            )}
    </div>
  );
}