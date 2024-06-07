import { Link } from 'react-router-dom';

export default function HomePostCard({ post }) {
  return (
    <div className='group relative w-full border dark:border-teal-500 border-gray-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:max-w-[365px] transition-all items-center justify-center' style={{ minWidth: '300px' }}>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image ?? 'https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/1715210620746270784039_3078232489054877_4577822641455101192_n.jpg?alt=media&token=2c8480a7-81ed-48a8-ba35-9b65f7474bbb'}
          className='h-[210px] w-full  object-cover group-hover:h-[170px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold font-merriweather line-clamp-2'>{post.title}</p>
        <span className='italic font-comic font-semibold text-sm'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 font-lora group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border dark:border-teal-500 border-gray-500 dark:text-teal-500 text-gray-600 dark:hover:bg-teal-500 hover:text-white hover:bg-gray-600 dark:hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Đọc thêm
        </Link>
      </div>
    </div>
  );
}