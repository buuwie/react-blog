import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchPostCard from '../components/SearchPostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'random',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Tìm kiếm bài viết - Bụt kể chuyện'
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      // Tạo một bản sao của state hiện tại
      const newSidebarData = { ...sidebarData };

      // Cập nhật các giá trị nếu có
      if (searchTermFromUrl !== null) {
        newSidebarData.searchTerm = searchTermFromUrl;
      } else {
        newSidebarData.searchTerm = '';
      }

      if (sortFromUrl !== null) {
        newSidebarData.sort = sortFromUrl;
      } else {
        newSidebarData.sort = 'desc';
      }

      if (categoryFromUrl !== null) {
        newSidebarData.category = categoryFromUrl;
      }
      else newSidebarData.category = 'random';

      // Cập nhật state một lần duy nhất
      setSidebarData(newSidebarData);
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      if (e.target.value === null) {setSidebarData({ ...sidebarData, searchTerm: '' })}
      else {setSidebarData({ ...sidebarData, searchTerm: e.target.value });}
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'random';
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false); 
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/%E2%98%81%EF%B8%8F%20in%20the%20sky.jfif?alt=media&token=14cc5fa0-20ef-4ad7-b400-b333321f91ef')] bg-no-repeat bg-cover dark:bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F328054589_1369942660445462_6076540014851764324_n.jpg?alt=media&token=4e23d80e-61c7-4eb4-823d-fa45677fd85c')] dark:bg-no-repeat dark:bg-cover">
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold font-bellota'>
              Từ khóa:
            </label>
            <TextInput
              placeholder='Tìm kiếm...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className='font-lora'
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold font-bellota'>Sắp xếp:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort' className='font-lora'>
              <option value='desc'>Mới nhất</option>
              <option value='asc'>Cũ nhất</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold font-bellota whitespace-nowrap'>Chủ đề:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              className='font-lora'
            >
                <option value="random">Chuyện lung tung</option>
                <option value="life">Chuyện đời sống</option>
                <option value="love">Chuyện tình yêu</option>
                <option value="friendship">Chuyện tình bạn</option>
                <option value="feelings">Lời tâm sự</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='pinkToOrange' className='font-lora font-semibold'>
            Lọc bài viết
          </Button>
        </form>
      </div>
      <div className='w-full'>
        {!sidebarData.searchTerm ? (
          <h1 className='pl-7 text-3xl font-semibold font-lobster sm:border-b border-gray-500 p-3 mt-5 '>
            Danh sách bài viết
          </h1>
        ):
        (
          <h1 className='pl-7 text-3xl font-semibold font-lobster sm:border-b border-gray-500 p-3 mt-5 '>
          Tìm kiếm với từ khóa: {sidebarData.searchTerm}
        </h1>
        )}
        
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>Không tìm thấy bài viết.</p>
          )}
          {loading && <p className='text-xl text-gray-500 font-lora'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <SearchPostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-gray-700 dark:text-teal-400 text-lg hover:underline p-7 w-full font-lora font-semibold'
            >
              Hiển thị thêm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}