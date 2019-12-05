import React, { FunctionComponent, Props } from 'react';
import { Redirect } from 'react-router-dom';

let isLoggedIn = false

const IndexPage: FunctionComponent = (props: any) => {

    if(isLoggedIn){
        return <Redirect to="/dashboard" />
    }

    return <Redirect to="/signin" />
}

export default IndexPage;