import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row mt-8 p-3 border border-gray-500 dark:border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-xl sm:text-3xl font-lobster'>
                Ngày hôm nay của bạn thế nào?
            </h2>
            <p className='text-gray-600 dark:text-kechuyentextlight my-2 font-philosopher'> Có thể nói cho Bụt nghe được không? <br/>
                Hãy gửi lời tâm sự của bạn ở đây! ♥ <br/><br/>
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tr-none rounded-bl-none font-lobster'>
                <a href="https://forms.gle/xkHuQg2UerpVaedD7" target='_blank' rel='noopener noreferrer' className='text-lg'>
                    Tâm sự cùng Bụt nha
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F247676410_602108137483035_8743625254088139593_n%20-%20Copy%20(5)%20-%20Copy%20-%20Copy%20-%20Copy.jpg?alt=media&token=47b47cae-5b48-412c-8d71-b57bc5979fed" />
        </div>
    </div>
  )
}