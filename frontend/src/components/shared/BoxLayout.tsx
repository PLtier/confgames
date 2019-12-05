import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { ButtonLink } from './Button'

const Box = styled.div`
    width:40%;
    margin: 20vh auto 0 auto;
    border-radius:3px;
    background:white;
    .content{
        padding: 10px;
    }
`
const GoBackLink = styled(ButtonLink)`
    margin: -10px;
    padding:10px;
    border-radius:3px;
`
interface BoxLayoutProps {
    goBackPath: string
}

const BoxLayout: FunctionComponent<BoxLayoutProps> = (props) => {
    return (
        <Box>
            <GoBackLink bg="primary" to={props.goBackPath}>{'<'} Go back</GoBackLink>
        <div className="content">
        {props.children}
        </div>
        </Box>
    )
}

export default BoxLayout