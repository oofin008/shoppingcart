import "reflect-metadata";
import { container } from "../container";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { ContainerProvider } from './reactBinding';

ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
