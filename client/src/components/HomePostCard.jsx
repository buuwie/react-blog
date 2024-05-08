import { Link } from 'react-router-dom';

export default function HomePostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[330px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='https://i.pinimg.com/736x/19/cc/15/19cc15e11b1624bab5b6d69f70234a99.jpg'
          className='h-[210px] w-full  object-cover group-hover:h-[170px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Đọc thêm
        </Link>
      </div>
    </div>
  );
}