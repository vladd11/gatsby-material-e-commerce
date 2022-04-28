import * as React from 'react';
import Main from '../components/Main'
import theme from '../theme'
import {ThemeProvider} from "@mui/material/styles";

export default function Index() {
    return (<ThemeProvider theme={theme}>
            <Main/>
        </ThemeProvider>);
}
