import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import HomePostCard from '../components/HomePostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState([])

  useEffect(() => {
    document.title = 'Trang chủ - Bụt kể chuyện'
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getposts?limit=6`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      const res = await fetch('/api/post/getrandomposts')
      const data = await res.json();
      setRandomPosts(data.randomPosts);
      
    }
    fetchRandomPosts();
  }, [])

  return (
    <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F%E2%98%81%EF%B8%8F%20in%20the%20sky.jfif?alt=media&token=2d3ad86e-abd8-43d0-b601-00f3404d5575')] bg-no-repeat bg-cover dark:bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F328054589_1369942660445462_6076540014851764324_n.jpg?alt=media&token=4e23d80e-61c7-4eb4-823d-fa45677fd85c')] dark:bg-no-repeat dark:bg-cover">
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl font-courier'>Chào bạn, <Link to='/about' className='py-1 text-buttextlight dark:text-buttextdark hover:underline'>Bụt</Link> nè</h1>
        <p className='text-gray-600 text-sm sm:text-md dark:text-kechuyentextlight font-lora'>
          " Đời đôi khi vui một chút, rồi lại buồn một chút cũng được mà... " - <a className='font-moon-dance text-2xl font-semibold'>Butkechuyen</a>
        </p>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && randomPosts && posts.length > 0 && randomPosts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-xl sm:text-3xl font-semibold text-center dark:text-gray-300 font-lobster'>Bài viết gần đây</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <HomePostCard key={post._id} post={post} />
              ))}
            </div>
            <h2 className='text-xl sm:text-3xl font-semibold text-center dark:text-gray-300 font-lobster'>Có thể bạn muốn đọc</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {randomPosts.map((post) => (
                <HomePostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg font-semibold hover:underline text-center text-gray-700 dark:text-buttextdark font-lora'
            >
              Xem tất cả bài viết
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
