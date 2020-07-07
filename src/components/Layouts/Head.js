import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { config } from '@utils';
import favicon from '@images/favicon/favicon.ico';
import ogImage from '@images/logos/bths.png';
import favicon16x16 from '@images/favicon/favicon-16x16.png';
import favicon32x32 from '@images/favicon/favicon-32x32.png';
import appleTouchIcon from '@images/favicon/apple-touch-icon.png';
import safariPinnedTab from '@images/favicon/safari-pinned-tab.svg';
import androidChrome from '@images/favicon/android-chrome-144x144.png';
import msTile from '@images/favicon/mstile-150x150.png';

const Head = ({ metadata }) => {
  return (
    <Helmet>
      <html lang="en" prefix="og: http://ogp.me/ns#" />
      <title itemProp="name" lang="en">
        {metadata.title + ' | Your one-stop-shop for all Brooklyn Tech'}
      </title>
      <link rel="shortcut icon" href={favicon} />
      <link rel="canonical" href={metadata.siteUrl} />

      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={config.siteKeywords} />
      {/* <meta name="google-site-verification" content={config.googleVerification} /> */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.siteUrl} />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:image" content={`${config.siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content={config.siteLanguage} />
      <meta itemProp="name" content={metadata.title} />
      <meta itemProp="description" content={metadata.description} />
      <meta itemProp="image" content={`${config.siteUrl}${ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metadata.siteUrl} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={`${config.siteUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={metadata.title} />

      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="144x144" href={androidChrome} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
      <link rel="mask-icon" color={config.themeColor} href={safariPinnedTab} />
      <meta name="msapplication-TileImage" content={msTile} />
      <meta name="msapplication-TileColor" content={config.themeColor} />
      <meta name="theme-color" content={config.themeColor} />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  metadata: PropTypes.object.isRequired,
};