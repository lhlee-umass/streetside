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