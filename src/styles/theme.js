import { hex2rgba } from '@utils';

export const theme = {
  colors: {
    lightMode: {
      text: 'hsl(222, 22%, 5%)',
      background: 'hsl(0, 0%, 100%)',
      alwaysWhite: 'hsl(0, 0%, 100%)',
      card: 'hsl(0, 0%, 100%)',
      primary: 'hsl(245, 100%, 60%)',
      primaryShade: 'hsla(245, 100%, 31%)',
      secondary: 'hsl(333, 100%, 45%)',
      secondaryShade: 'hsl(333, 100%, 31%)',
      tertiary: 'hsl(255, 85%, 30%)',
      muted: 'hsl(210, 55%, 92%)',
      mutedBackground: 'hsla(210, 55%, 92%, 0.85)',
      info: 'hsl(245, 100%, 60%)',
      success: 'hsl(160, 100%, 40%)',
      successBackground: 'hsla(160, 100%, 40%, 0.1)',
      error: 'hsl(340, 95%, 50%)',
      errorBackground: 'hsla(340, 95%, 43%, 0.1)',
      alert: 'hsl(37, 100%, 50%)',
      alertBackground: 'hsla(52, 100%, 50%, 0.25)',
      gray100: 'hsl(225, 25%, 95%)',
      gray200: 'hsl(225, 16%, 90%)',
      gray300: 'hsl(225, 8%, 80%)',
      gray400: 'hsl(225, 8%, 70%)',
      gray500: 'hsl(225, 7%, 60%)',
      gray600: 'hsl(225, 15%, 50%)',
      gray700: 'hsl(225, 12%, 40%)',
      gray900: 'hsl(225, 25%, 20%)',
      gray1000: 'hsl(225, 15%, 15%)',
      shadow: hex2rgba('#212121', 0.2),
      navShadow: hex2rgba('#000000', 0.1),
    },

    darkMode: {
      text: 'hsl(0, 0%, 100%)',
      background: 'hsl(210, 30%, 8%)',
      alwaysWhite: 'hsl(0, 0%, 100%)',
      card: 'hsl(210, 30%, 13%)',
      primary: 'hsl(333, 100%, 52%)',
      primaryShade: 'hsla(333, 100%, 31%)',
      secondary: 'hsl(230, 92%, 63%)',
      secondaryShade: 'hsl(230, 92%, 50%)',
      tertiary: 'hsl(53, 100%, 50%)',
      muted: 'hsl(210, 38%, 15%)',
      mutedBackground: 'hsla(210, 38%, 15%, 0.85)',
      info: 'hsl(230, 92%, 63%)',
      success: 'hsl(160, 100%, 40%)',
      successBackground: 'hsla(160, 100%, 40%, 0.1)',
      error: 'hsl(340, 95%, 60%)',
      errorBackground: 'hsla(340, 95%, 43%, 0.1)',
      alert: 'hsl(30, 100%, 50%)',
      alertBackground: 'hsla(38, 100%, 50%, 0.1)',
      gray100: 'hsl(210, 15%, 20%)',
      gray200: 'hsl(210, 15%, 25%)',
      gray300: 'hsl(210, 10%, 40%)',
      gray400: 'hsl(210, 9%, 45%)',
      gray500: 'hsl(210, 8%, 50%)',
      gray600: 'hsl(210, 12%, 55%)',
      gray700: 'hsl(210, 14%, 66%)',
      gray900: 'hsl(210, 25%, 88%)',
      gray1000: 'hsl(210, 25%, 96%)',
      shadow: 'hsl(210, 30%, 5%)',
      navShadow: 'hsl(210, 30%, 5%)',
    },
  },

  fonts: {
    SansPro: "'Source Sans Pro', sans-serif",
    Ubuntu: "'Ubuntu', sans-serif",
  },

  fontSizes: {
    xxs: '0.422em', // 6.76px
    xs: '0.563em', // 9px
    sm: '0.75em', // 12px
    md: '1em', // 16px
    lg: '1.333em', // 21.33px
    xl: '1.777em', // 28.43px
    xxl: '2.369em', // 37.9px
    h2: '3.157em', // 50.52px
    h1: '4.209em', // 67.34px
  },
};

export default theme;
