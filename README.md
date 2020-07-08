<p align="center">
  <a href="https://bths.social">
    <img alt="Logo" src="https://bths.edu/pics/header_logo.png" width="100" />
  </a>
</p>
<h1 align="center">
  bths.social
</h1>
<p align="center">
  Brooklyn Tech's premier student platform., built with <a href="https://www.gatsbyjs.org" target="_blank">Gatsby</a> and hosted with <a href="https://www.netlify.com" target="_blank">Netlify</a>.
</p>
<p align="center">
  <a href="https://app.netlify.com/sites/kyrylo-v2/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/18439ca7-a095-40f4-b3d3-b943fb1bc67b/deploy-status" alt="Netlify status" />
    <a href="https://deepscan.io/dashboard#view=project&tid=9434&pid=12754&bid=201901"><img src="https://deepscan.io/api/teams/9434/projects/12754/branches/201901/badge/grade.svg" alt="DeepScan grade"></a>
  </a>
</p>

![hero](https://i.imgur.com/5nWpWEk.png)

## 🚀 Installing

1.  Install the gatsby CLI

    ```shell
    npm i -g gatsby-cli
    ```

2.  Clone the repository and change directories

    ```shell
    git clone https://github.com/btechsu/Foundry
    cd Foundry
    ```

3.  Install dependencies
    ```shell
    npm install
    ```
4.  Start the local server

    ```shell
    gatsby develop # local dev server
    gatsby build && gatsby serve # local prod server
    ```

5.  **Open the source code and start editing!**

    The site is now running at `http://localhost:8000` for development and `http://localhost:9000` for production!

## 🧐 What's inside?

A quick look at the top-level files and directories.

```sh
  .
  ├── node_modules # modules
  ├── content # the actual text of the website
  ├── src # source folder
      └── components # main components
          └── App # app components
          └── Firebase # firebase and auth logic
          └── Home # home components
          └── layouts
            ├── Head.js # SEO and meta tags that go in the head
            ├── index.js # layout file
          └── icons # collection of svg icons
          ├── hero.js
          ├── footer.js
          ├── nav.js # navigation bar
          ├── menu.js # sidebar menu for mobile
          ├── serializeHyperlink.js
      └── images
      └── pages
          ├── index.js
          ├── 404.js
      └── styles # styled components styles
      └── utils # various tools for prismic and styling
          ├── config.js # website info for SEO
  ├── .gitignore
  ├── .prettierrc
  ├── gatsby-config.js # imports
  ├── gatsby-browser.js # wrap page with layout
  ├── gatsby-ssr.js # wrap page with layout
  ├── LICENSE
  ├── package-lock.json
  ├── package.json
  ├── README.md
```
