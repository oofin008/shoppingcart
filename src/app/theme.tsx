import { red, grey, deepOrange, orange } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: deepOrange.A200,
        },
        secondary: {
            main: red.A700,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: grey[50],
        },
    },
});

export default theme;
