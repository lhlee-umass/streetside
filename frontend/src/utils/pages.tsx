import { JSX } from 'react'

// Define the Page interface to structure the page object
interface Page {
  name: string // Name of the page
  href?: string // Optional URL path for the page
  element: JSX.Element // JSX element that represents the page content
  navbar: boolean // Boolean indicating if the page should appear in the navbar
  defaultChild?: Page // Optional default child page (if the page has a nested page)
  children?: Page[] // Optional array of child pages (nested pages under the current page)
}

// Array of pages, each with a name, href, element, navbar visibility, and optional children
const pages: Page[] = [
  {
    name: 'Marketplace', // Name of the page
    href: '/marketplace', // URL path for the page
    element: <div>Marketplace</div>, // JSX element to render for the page
    navbar: true, // This page will appear in the navbar
  },
  {
    name: 'Test', // Name of the page
    href: '/test', // URL path for the page
    element: <div>Test</div>, // JSX element to render for the page
    navbar: true, // This page will appear in the navbar
  },
]

// Export the pages array to be used in other parts of the app
export { pages }
