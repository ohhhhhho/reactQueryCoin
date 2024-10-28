import React from 'react';
import Router from './Router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { darkTheme,lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyled = createGlobalStyle`
body,p,li,ul,a,h1,h2,div{margin:0;padding:0;;list-style:none;text-decoration:none;}
// a{color:inherit;}
`
function Root() {
  const isDark = useRecoilValue(isDarkAtom);
  return(
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyled/>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
    </>
  )
}

export default Root;
