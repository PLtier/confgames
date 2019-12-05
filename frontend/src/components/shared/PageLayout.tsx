import React, { FunctionComponent, ComponentProps } from 'react'
import styled from '@emotion/styled'
import { ReactElementLike } from 'prop-types'

const Box = styled.div`
    width:80%;
    margin: 20vh auto 0 auto;
    
    background:white;
    min-height:80vh;
    border-radius:3px;
    header{
        margin:10px 10px 2em 10px;
        h1{
            margin-right:2em;
        }
        &, & > .actions{
            display:flex;
            align-items:center;
        }
        .actions *{
            margin:0 10px;
            &:first-child{
                margin-left:0;
            }
        }

    }
`
interface PageLayoutProps {
    title: string;
    actions: ReactElementLike[];
}

const PageLayout: FunctionComponent<PageLayoutProps> = (props) => {
    return (
        <>
        <Box>
        <header>
        <h1>{props.title}</h1>
        <div className="actions">
        {props.actions}
        </div>
        </header>
        <div className="content">
        {props.children}
        </div>
        </Box>
        </>
    )
}

export default PageLayout