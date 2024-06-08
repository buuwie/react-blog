import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className=" border rounded-b-none border-t-8 border-gray-700 dark:border-teal-500 bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2Fhinh-anh-mua-sao-bang-dep-nhat-37-footer.jpg?alt=media&token=bdd5edc4-45fe-4a3a-a3c4-b22e2b6de585')] bg-no-repeat bg-cover">
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                <Link to="/" className='self-center whitespace-nowrap text-kechuyentextlight text-xl sm:text-3xl
                font-semibold dark:text-white font-lobster'>
                    <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
                </Link>
                    <p className='font-square-peg mt-3 text-kechuyentextlight mr-5 text-3xl'>" chúng ta đều đến với thế giới này để yêu thương,<br/>
                    và để được yêu thương... "</p>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3  pt-3 relative
                sm:gap-6'>
                    <div>
                        <Footer.Title className='font-semibold text-kechuyentextlight font-poetsen-one' title='About me' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='/about' className='text-kechuyentextlight font-philosopher font-semibold'>
                                Bụt kể chuyện
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title className='font-semibold text-kechuyentextlight font-poetsen-one' title='Follow me on' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://instagram.com/butkechuyen'
                            target='_blank'
                            rel='noopener noreferer'
                            className='text-kechuyentextlight font-philosopher font-semibold'>
                                <i className="fab fa-instagram" aria-hidden="true">&nbsp;&nbsp;</i>Instagram
                            </Footer.Link>
                            <Footer.Link
                            href='https://www.facebook.com/its.butkechuyen/'
                            target='_blank'
                            rel='noopener noreferer'
                            className='text-kechuyentextlight font-philosopher font-semibold'>
                                <i className="fab fa-facebook" aria-hidden="true">&nbsp;&nbsp;</i>Facebook
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title className='font-semibold text-kechuyentextlight font-poetsen-one' title='Contact Me' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            className='text-kechuyentextlight font-philosopher font-semibold text-xs'>
                                <i className="fa fa-envelope" aria-hidden="true">&nbsp;&nbsp;</i>butkechuyen@gmail.com
                            </Footer.Link>
                            <Footer.Link
                            href='https://www.facebook.com/its.butkechuyen/'
                            className='text-kechuyentextlight font-lobster'>
                                <i className="fab fa-facebook" aria-hidden="true">&nbsp;&nbsp;</i>Butkechuyen
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between flex justify-between'>
                <Footer.Copyright href='/' by="Butkechuyen" year={new Date().getFullYear()} className='font-lora font-semibold text-kechuyentextlight'/>
                <div className='flex gap-6 mt-0 sm:justify-center'>
                    <Footer.Icon href='https://www.facebook.com/its.butkechuyen/' icon={BsFacebook} target='_blank'
                            rel='noopener noreferer' className='text-kechuyentextlight' />
                    <Footer.Icon href='https://instagram.com/butkechuyen' icon={BsInstagram} target='_blank'
                            rel='noopener noreferer' className='text-kechuyentextlight' />
                    <Footer.Icon href='https://www.youtube.com/@butkechuyen.official' icon={BsYoutube} target='_blank'
                            rel='noopener noreferer' className='text-kechuyentextlight' />
                </div>
            </div>
        </div>
    </Footer>
  )
}
