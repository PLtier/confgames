import styled from '@emotion/styled'
import { theme } from '../../theme'

type InputProps = {
    block?: Boolean;
    dark?: Boolean;
}

export const Input = styled.input<InputProps>`
    padding: 10px;
    margin: 10px;
    border:none;
    background: transparent;
    border-bottom: 2px solid ${props => props.dark ? 'rgba(255,255,255,0.7)' : theme.color.dark};
    outline:none;

    &:focus{
        border-bottom: 2px solid ${theme.color.primary};
    }

    ${props => props.block && `
        display: block;
        width: 100%;
        margin: 10px 0;
    `}
`