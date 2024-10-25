import React from 'react';
import Router from './Router';
import styled, { createGlobalStyle } from 'styled-components';
import { Outlet } from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const GlobalStyled = createGlobalStyle`
body,p,li,ul,a,h1,h2,div{margin:0;padding:0;;list-style:none;text-decoration:none;}
// a{color:inherit;}
`
function Root() {
  return(
    <>
    <GlobalStyled/>
    <Outlet />
    <ReactQueryDevtools initialIsOpen={true}/>
    </>
  )
}

export default Root;
