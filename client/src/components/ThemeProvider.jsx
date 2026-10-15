import React from 'react'
import { useSelector } from 'react-redux'

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
      <div className={theme}>
        <div className="bg-[url('https://pub-af1da45e22764d3382f585d172e665dd.r2.dev/config%20images/gsdygoyfgygfdsygf.jfif')] bg-no-repeat bg-cover dark:bg-[url('https://pub-af1da45e22764d3382f585d172e665dd.r2.dev/config%20images/247676410_602108137483035_8743625254088139593_n%20-%20Copy%20(4)%20-%20Copy.jpg')] dark:bg-no-repeat dark:bg-cover text-gray-700 dark:text-gray-200 min-h-screen">
          {children}
        </div>
      </div>
    );
  }
