<h1 align="center">
  <img src="https://i.imgur.com/ko1hl2N.png" alt="Foundry" width="300" />
</h1>
<p align="center">
  <a href="https://app.netlify.com/sites/foundry-dev/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/18439ca7-a095-40f4-b3d3-b943fb1bc67b/deploy-status" alt="Netlify status" />
  </a>
</p>
<p align="center">
  Brooklyn Tech's premier student platform, built with <a href="https://reactjs.org" target="_blank">React</a> and hosted with <a href="https://www.netlify.com" target="_blank">Netlify</a>.
</p>

![hero](https://i.imgur.com/i5GmM7I.png)

## 🚀 Installing

1.  For development, you will only need Node.js installed on your environement.

2.  Clone the repository

    ```shell
    git clone https://github.com/btechsu/Foundry
    cd Foundry
    ```

3.  Install

    ```shell
    npm install
    ```

4.  Start the local server

    ```shell
    npm run start
    ```

5.  **Open the source code and start editing!**

    The local dev server is now running at `http://localhost:3000`!

## 🧐 What's inside?

A quick look at the top-level structure.

```sh
foundry/
├── functions # Backend (firebase cloud functions)
├── node_modules # NPM modules
├── src # Frontend SPA
├── .prettierrc # prettier config
├── .eslintrc # Eslint config
├── .babelrc # Babel config
├── .env # Environment credentials
├── .flowconfig # Flow config
├── config-overrides.js # React-app-rewired config
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
```

## 🌟 Code Style

We run Prettier on-commit, which means you can write code in whatever style you want and it will be automatically formatted according to the common style when you run git commit. We also have ESLint setup, although we've disabled all stylistic rules since Prettier takes care of those.

###### Rules

- All new .js files must be flow typed.
- No console.logs in any file: We use the debug module across the codebase to log debugging information in development only. Never commit a file that contains a console.log. The only exceptions are errors, which you can log, but you have to use console.error to be explicit about it.
