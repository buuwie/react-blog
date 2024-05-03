import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
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
                            href='https://instagram.com/butkechuyen'
                            target='_blank'
                            rel='noopener noreferer'>
                                Instagram
                            </Footer.Link>
                            <Footer.Link
                            href='https://facebook.com/buuwie.hc'
                            target='_blank'
                            rel='noopener noreferer'>
                                Facebook
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
                            href='https://facebook.com/buuwie.hc'
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
                            href='https://instagram.com/butkechuyen'
                            target='_blank'
                            rel='noopener noreferer'>
                                Instagram
                            </Footer.Link>
                            <Footer.Link
                            href='https://facebook.com/buuwie.hc'
                            target='_blank'
                            rel='noopener noreferer'>
                                Facebook
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by="Butkechuyen" year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                    <Footer.Icon href='https://facebook.com/buuwie.hc' icon={BsFacebook} />
                    <Footer.Icon href='#' icon={BsInstagram} />
                    <Footer.Icon href='#' icon={BsYoutube} />
                </div>
            </div>
        </div>
    </Footer>
  )
}
