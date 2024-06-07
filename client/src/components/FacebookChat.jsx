"use client"
import React, { Component } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
const pageId = import.meta.env.VITE_FACEBOOK_PAGE_ID;

export default function FacebookChat() {
    return (
        <FacebookProvider appId={appId} chatSupport>
          <CustomChat pageId={pageId} minimized={false}/>
        </FacebookProvider>     
      );
}
