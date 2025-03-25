# streetside

**Project Name:** Street Side

**Team Name**: Sustainable Squirrels (Team 21)

**Team Members (names and GitHub usernames)**

- Landrick Diaz - `lrdiaz`
- Laurie Lee - `lhlee-umass`
- Angela Ho - `angho8`
- David Zhan - `zhandavidz`

# Brief Overview of the Application

Due to overconsumption and impulse buying, many have products they don’t want or need anymore. At the same time, many struggle to afford products they need. Many sellers try to profit the most they can off of the things they don’t really need, and end up selling them to people who don’t need them (and would just end up as clutter), or even not selling them. This leads to excessive waste, which is environmentally harmful.

We seek to implement a community-driven app that requires that every product sold is either free or a couple dollars (maybe < $10). Security and trustworthiness of the app can be moderated through profile verification, reviews, and a town-based map system. This app will address the global issues of unsustainable over-consumption and income inequality.

This app targets individuals with low-income, eco-conscious consumers, and people who need to declutter their homes.

# Setup Instructions

## Graders:

With your node version set to 22.14.0 (as specified in `.nvmrc`), run:
```bash
npm install
npm run dev
npm install react-router-dom
```

This is the intended setup for the project. If you encounter any issues, please let us know.

## Running

*[optional]* Set your node version to 22.14.0 (as specified in `.nvmrc`) with your preferred node version manager. For example, with `nvm`:
```bash
nvm use
```


Install the dependencies with `npm install`:
```bash
npm install
```

Run the development server with `npm run dev`:
```bash
npm run dev
```

Build the project into a `dist` folder with `npm run build`:
```bash
npm run build
```

## Development

There are default commit messages, configured ESLint and Prettier, and Husky pre-commit hooks to ensure code quality on each commit.

To lint the code:
```bash
npm run lint
```

To check for formatting issues (with both ESLint and Prettier):
```bash
npm run check
```

To fix all formatting issues:
```bash
npm run format
```

### Pre-Commit Hooks

Before each commit, Husky will run the `lint-staged` script. This runs ESLint and Prettier on the files that are staged for commit. If there are any issues, the commit will be aborted.

There are also default commit messages where I've copied over the project requirements and included the official example.

# Development

## Frontend Organization: `src`

We are using React Router for routing. We have slightly modified the purpose of the default `main.tsx` and `App.tsx`:
- `main.tsx` is the main entry point for the app
  - imports `index.css` which has TailwindCSS
  - renders the `BrowserRouter` to enable routing through `react-router`
  - renders the `App` component
- `App.tsx` is a main layout component for the whole app
  - could include a `navbar`, `footer`, and other layout components
  - renders the actual page component through `react-router`'s `<Outlet />`

Folders are split into:
- `components`: reusable components
  - ex: `Button.tsx`, `Input.tsx`, `Card.tsx`
    - each component should be a single, reusable component that can be used in multiple places
  - things like `Navbar.tsx` and `Footer.tsx` are also included here
- `pages`: the main page components that are routed to
  - ex: `Home.tsx`, `About.tsx`, `Login.tsx`, `Register.tsx`
  - each returns a JSX element that is the main component rendered by the router
  - each component will be rendered under a header (navbar) and possibly above a footer, and can include other components from `components`
- `utils`: utility functions and shared constants
  - ex: `pages.tsx` contains a list of pages, their names, their routes, so that different components can easily reference it
    - `main.tsx` references `pages.tsx` to know what pages to have routes to
    - `navbar.tsx` references `pages.tsx` to know what pages to have links to
    - by having a single shared `pages` file, we can unify the list of pages and not have inconsistencies
