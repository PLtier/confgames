import styled from '@emotion/styled'
import { theme } from '../../theme'
import { Link } from 'react-router-dom'
import { ThemeColor } from '../../types'

interface ButtonProps {
    block?: Boolean
    bg?: ThemeColor
}

export const Button = styled.button<ButtonProps>`
    all: unset;
    padding: 10px;
    border: 2px solid black;
    border-radius: 3px;
    cursor: pointer;
    box-sizing: border-box;

    ${props => props.block && `
        display: block;
        width: 100%;
        margin: 10px 0;
    `}

    ${props => props.bg && `
        background: ${theme.color[props.bg]};
        border-color: ${theme.color[props.bg]};
        color: white;
    `}
`
export const ButtonLink = Button.withComponent(Link)