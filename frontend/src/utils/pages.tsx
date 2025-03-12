import { JSX } from 'react'

interface Page {
  name: string
  href?: string
  element: JSX.Element
  navbar: boolean
  defaultChild?: Page
  children?: Page[]
}

const pages: Page[] = [
  {
    name: 'Marketplace',
    href: '/marketplace',
    element: <div>Marketplace</div>,
    navbar: true,
  },
  { name: 'Test', href: '/test', element: <div>Test</div>, navbar: true },
]

export { pages }
