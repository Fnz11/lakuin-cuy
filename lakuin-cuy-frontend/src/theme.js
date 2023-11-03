import { createTheme } from "@mui/material";

const ungu = {
    '50': '#9575cd',
    '100': '#9575cd',
    '200': '#9575cd',
    '300': '#9575cd',
    '400': '#9575cd',
    '500': '#9575cd',
    '600': '#9575cd',
    '700': '#9575cd',
    '800': '#9575cd',
    '900': '#9575cd',
    'A100': '#9575cd',
    'A200': '#9575cd',
    'A400': '#9575cd',
    'A700': '#7e57c2',
  };
const putih = {
    '50': '#ffffff',
    '100': '#ffffff',
    '200': '#ffffff',
    '300': '#ffffff',
    '400': '#ffffff',
    '500': '#ffffff',
    '600': '#ffffff',
    '700': '#ffffff',
    '800': '#ffffff',
    '900': '#ffffff',
    'A100': '#ffffff',
    'A200': '#ffffff',
    'A400': '#ffffff',
    'A700': '#ffffff',
  };

const theme = createTheme({
    palette: {
        primary: ungu,
        secondary: ungu,
        warning: putih
    },
    typography: {
        fontFamily: 'Laila',
        fontWeightLight: 400,
        fontWeightReguler: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
})

export default theme