import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const { colors, fonts } = theme;

// https://github.com/necolas/normalize.css
const normalize = `
  html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}
`;

const GlobalStyle = createGlobalStyle`
  ${normalize};

  :root {
    --font-weight-bold: 600;
    --font-weight-medium: 500;
    --font-weight-light: 300;
    --font-family: ${fonts.SansPro};
    --font-family-mono: ${fonts.Ubuntu};
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    font-family: var(--font-family);
  }

  body {
    --color-text: ${colors.lightMode.text};
    --color-background: ${colors.lightMode.background};
    --color-always-white: ${colors.lightMode.alwaysWhite};
    --color-card: ${colors.lightMode.card};
    --color-primary: ${colors.lightMode.primary};
    --color-primary-shaded: ${colors.lightMode.primaryShade};
    --color-secondary: ${colors.lightMode.secondary};
    --color-tertiary: ${colors.lightMode.tertiary};
    --color-muted: ${colors.lightMode.muted};
    --color-muted-background: ${colors.lightMode.mutedBackground};
    --color-info: ${colors.lightMode.info};
    --color-success: ${colors.lightMode.success};
    --color-success-background: ${colors.lightMode.successBackground};
    --color-error: ${colors.lightMode.error};
    --color-error-background: ${colors.lightMode.errorBackground};
    --color-alert: ${colors.lightMode.alert};
    --color-alert-background: ${colors.lightMode.alertBackground};
    --color-gray-100: ${colors.lightMode.gray100};
    --color-gray-200: ${colors.lightMode.gray200};
    --color-gray-300: ${colors.lightMode.gray300};
    --color-gray-400: ${colors.lightMode.gray400};
    --color-gray-500: ${colors.lightMode.gray500};
    --color-gray-600: ${colors.lightMode.gray600};
    --color-gray-700: ${colors.lightMode.gray700};
    --color-gray-900: ${colors.lightMode.gray900};
    --color-gray-1000: ${colors.lightMode.gray1000};
    --nav-shadow: ${colors.lightMode.navShadow};
    --shadow: ${colors.lightMode.shadow};

    background: var(--color-background);
  }

  body.dark {
    --color-text: ${colors.darkMode.text};
    --color-background: ${colors.darkMode.background};
    --color-always-white: ${colors.darkMode.alwaysWhite};
    --color-card: ${colors.darkMode.card};
    --color-primary: ${colors.darkMode.primary};
    --color-primary-shaded: ${colors.darkMode.primaryShade};
    --color-secondary: ${colors.darkMode.secondary};
    --color-tertiary: ${colors.darkMode.tertiary};
    --color-muted: ${colors.darkMode.muted};
    --color-muted-background: ${colors.darkMode.mutedBackground};
    --color-info: ${colors.darkMode.info};
    --color-success: ${colors.darkMode.success};
    --color-success-background: ${colors.darkMode.successBackground};
    --color-error: ${colors.darkMode.error};
    --color-error-background: ${colors.darkMode.errorBackground};
    --color-alert: ${colors.darkMode.alert};
    --color-alert-background: ${colors.darkMode.alertBackground};
    --color-gray-100: ${colors.darkMode.gray100};
    --color-gray-200: ${colors.darkMode.gray200};
    --color-gray-300: ${colors.darkMode.gray300};
    --color-gray-400: ${colors.darkMode.gray400};
    --color-gray-500: ${colors.darkMode.gray500};
    --color-gray-600: ${colors.darkMode.gray600};
    --color-gray-700: ${colors.darkMode.gray700};
    --color-gray-900: ${colors.darkMode.gray900};
    --color-gray-1000: ${colors.darkMode.gray1000};
    --nav-shadow: ${colors.darkMode.navShadow};
    --shadow: ${colors.darkMode.shadow};

    background: var(--color-background);

    .invertIcon {
      filter: invert(1);
    }
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: var(--font-weight-bold);
    margin: 0 0 10px 0;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-family)
  }

  h5,
  h6,
  p,
  a {
    font-family: var(--font-family-mono);
  }

  p {
    line-height: 160%;
  }
`;

export default GlobalStyle;
