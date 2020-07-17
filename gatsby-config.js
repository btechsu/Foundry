const path = require('path');
const config = require('./src/utils/config');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: '@prismicio/gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'foundry',
        defaultLang: 'en-us',
        accessToken: process.env.GATSBY_PRISMIC_API,
        path: '/preview',
        previews: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`source sans pro\:300,400,600,700`, `ubuntu\:300,400,500,700`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: config.themeColor,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-firesource`,
      options: {
        credential: {
          type: process.env.GATSBY_FIREBASE_TYPE,
          project_id: process.env.GATSBY_FIREBASE_PROJECT_ID,
          private_key_id: process.env.GATSBY_FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.GATSBY_FIREBASE_PRIVATE_KEY.replace(
            /\\n/g,
            '\n'
          ),
          client_email: process.env.GATSBY_FIREBASE_CLIENT_EMAIL,
          client_id: process.env.GATSBY_FIREBASE_CLIENT_ID,
          auth_uri: process.env.GATSBY_FIREBASE_AUTH_URI,
          token_uri: process.env.GATSBY_FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.GATSBY_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url:
            process.env.GATSBY_FIREBASE_CLIENT_X509_CERT_URL,
        },
        types: [
          {
            type: 'clubs',
            collection: 'clubs',
            map: (doc) => ({
              name: doc.name,
              description: doc.description,
              days: doc.days,
              room: doc.room,
              time: doc.time,
              type: doc.type,
              president: doc.president,
            }),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.name,
        start_url: `/`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `src/images/logos/bths.png`,
      },
    },
  ],
};
