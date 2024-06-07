"use client"
import React, { Component } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FacebookChat() {
    return (
        <FacebookProvider appId="25702829992664537" chatSupport>
          <CustomChat pageId="164538503412835" minimized={false}/>
        </FacebookProvider>     
      );
}
