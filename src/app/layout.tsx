import './globals.css'
import {Providers} from "@/components/Providers";
import type { ReactNode } from 'react'
import OptionsMenu from "@/components/OptionsMenu";

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
            <OptionsMenu/>
        </Providers>
      </body>
    </html>
  )
}
