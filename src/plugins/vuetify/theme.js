export const staticPrimaryColor = '#4169E1'
export const staticPrimaryDarkenColor = '#7E4EE6'
export const staticDarkBackground = '#131316'

export const themes = {
  light: {
    dark: false,
    colors: {
      primary: staticPrimaryColor,
      'on-primary': '#fff',
      'primary-darken-1': staticPrimaryDarkenColor,
      background: '#f4f5fa',
      'on-background': '#2E263D',
      surface: '#fff',
      'on-surface': '#2E263D',
      secondary: '#8A8D93',
      success: '#56CA00',
      info: '#16B1FF',
      warning: '#FFB400',
      error: '#FF4C51',
      red: '#FF4C51',
      white: "#fff" 
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: staticPrimaryColor,
      'on-primary': '#fff',
      'primary-darken-1': staticPrimaryDarkenColor,
      background: staticDarkBackground,
      'on-background': '#E7E3FC',
      surface: '#1A1A1D',
      'on-surface': '#E7E3FC',
      secondary: '#8A8D93',
      success: '#56CA00',
      info: '#16B1FF',
      warning: '#FFB400',
      error: '#FF4C51',
      red: '#FF4C51',
      white: "#fff"
    },
    variables: {
      'border-color': '#E7E3FC',
      'tooltip-background': '#1A1A1D',
      'table-header-color': '#1F1F23',
      'shadow-key-umbra-color': '#0F0F12',
    },
  },
}

export default themes
