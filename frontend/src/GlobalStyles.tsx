import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/core'
import { theme } from './theme'

require('normalize.css')

const GlobalStyles: FunctionComponent = (props: any) => (
    <Global styles={css`
        @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap&subset=latin-ext');
        *{
            box-sizing: border-box;
            font-family: 'Montserrat';
        }
        html, body, #root{
            width:100%;
            height:100%;
        }
        body{
            background: ${theme.color.white};
        }
    `} />
)

export default GlobalStyles;