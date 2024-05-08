import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500 bg-[url('https://i.pinimg.com/564x/dc/b4/7e/dcb47e8d388c483c36c6e0ffd1585bd3.jpg')] bg-no-repeat bg-cover">
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center whitespace-nowrap text-kechuyentextlight text-xl
            font-semibold dark:text-white font-lobster'>
                        <span className='py-1 text-buttextlight font-lobster dark:text-buttextdark'>But</span>kechuyen
                    </Link>
                    
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3  pt-3 relative
                sm:gap-6'>
                    <div>
                        <Footer.Title title='About me' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='/about'
                            target='_blank'
                            rel='noopener noreferer'>
                                Butkechuyen
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://instagram.com/butkechuyen'
                            target='_blank'
                            rel='noopener noreferer'>
                                Instagram
                            </Footer.Link>
                            <Footer.Link
                            href='https://www.facebook.com/its.butkechuyen/'
                            target='_blank'
                            rel='noopener noreferer'>
                                Facebook
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='#'
                            target='_blank'
                            rel='noopener noreferer'>
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link
                            href='#'
                            target='_blank'
                            rel='noopener noreferer'>
                                Terms & Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='/' by="Butkechuyen" year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                    <Footer.Icon href='https://www.facebook.com/its.butkechuyen/' icon={BsFacebook} />
                    <Footer.Icon href='https://instagram.com/butkechuyen' icon={BsInstagram} />
                    <Footer.Icon href='#' icon={BsYoutube} />
                </div>
            </div>
        </div>
    </Footer>
  )
}
