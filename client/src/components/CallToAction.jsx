import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Ngày hôm nay của bạn thế nào?
            </h2>
            <p className='text-gray-500 my-2'> Có thể nói cho Bụt nghe được không? <br/>
                Hãy gửi lời tâm sự của bạn ở đây! ♥
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tr-none rounded-bl-none'>
                <a href="https://forms.gle/xkHuQg2UerpVaedD7" target='_blank' rel='noopener noreferrer'>
                    Tâm sự cùng Bụt nha
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/247676410_602108137483035_8743625254088139593_n%20-%20Copy%20(5)%20-%20Copy%20-%20Copy%20-%20Copy.jpg?alt=media&token=ab0b68ac-2806-4f9e-b4ce-89a801ee2bee" />
        </div>
    </div>
  )
}