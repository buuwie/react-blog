import React from 'react'
import { useSelector } from 'react-redux'

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
      <div className={theme}>
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/%E2%98%81%EF%B8%8F%20in%20the%20sky.jfif?alt=media&token=14cc5fa0-20ef-4ad7-b400-b333321f91ef')] bg-no-repeat bg-cover dark:bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F247676410_602108137483035_8743625254088139593_n%20-%20Copy%20(4)%20-%20Copy.jpg?alt=media&token=361b48bc-a704-46de-9c37-81b1bb9d49f8')] dark:bg-no-repeat dark:bg-cover text-gray-700 dark:text-gray-200 min-h-screen">
          {children}
        </div>
      </div>
    );
  }
