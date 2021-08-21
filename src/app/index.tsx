import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
      </ThemeProvider>
      ,
  </React.StrictMode>,
  document.getElementById("root")
);
