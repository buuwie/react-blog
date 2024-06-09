import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [randomPostsByCategory, setRandomPostsByCategory] = useState(null)
  const [postCategory, setPostCategory] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          document.title = `${data.posts[0].title} - Bụt kể chuyện`
          setPostCategory(data.posts[0].category)
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
          
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchRandomPosts = async () => {
        const res = await fetch(`/api/post/getrandompostsbycategory?category=${postCategory}`);
        const data = await res.json();
        if (res.ok) {
          setRandomPostsByCategory(data.randomPostsByCategory);
        }
      };
      fetchRandomPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, [postCategory]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
    
  return (
    <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/%E2%98%81%EF%B8%8F%20in%20the%20sky.jfif?alt=media&token=14cc5fa0-20ef-4ad7-b400-b333321f91ef')] bg-no-repeat bg-cover dark:bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F247676410_602108137483035_8743625254088139593_n%20-%20Copy%20(4)%20-%20Copy.jpg?alt=media&token=361b48bc-a704-46de-9c37-81b1bb9d49f8')] dark:bg-no-repeat dark:bg-cover">
        <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className='text-3xl mt-10 p-3 text-center font-philosopher max-w-2xl mx-auto lg:text-4xl'>
          {post && post.title}
        </h1>
        <Link
          to={`/search?category=${post && post.category}`}
          className='self-center mt-5'
        >
          <Button color='gray' pill size='xs' className='font-bellota font-semibold mx-auto'>
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}

          className='mt-10 p-3 h-[80%] w-[80%] object-cover mx-auto'
        />
        <div className='flex justify-between p-3 border-b border-gray-500 mx-auto w-full max-w-2xl text-xs'>
          <span className='font-bellota italic font-semibold'>{post && new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
          <span className='font-philosopher italic font-semibold'>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className='p-3 max-w-2xl mx-auto w-full post-content font-lora dark:text-white text-black'
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
        <div className='max-w-4xl mx-auto w-full border-t border-gray-500'>
          <CallToAction />
        </div>
        <CommentSection postId={post._id} />

        <div className='flex flex-col justify-center items-center mb-10'>
          <h1 className='text-3xl mt-5 font-bold font-lobster'>Có thể bạn muốn đọc</h1>
          <div className='flex flex-wrap gap-5 mt-5 mb-5 justify-center'>
            {randomPostsByCategory && 
              randomPostsByCategory.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
          <Link
              to={'/search'}
              className='text-lg font-semibold hover:underline text-center text-gray-700 dark:text-buttextdark font-lora'
            >
              Xem tất cả bài viết
            </Link>
        </div>
      </div>
    </div>
    
  );
}