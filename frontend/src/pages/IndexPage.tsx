import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../types';

interface IndexPageProps {
    isAuthenticated: boolean
}

const IndexPage: FunctionComponent<IndexPageProps> = (props) => {

    if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return <Redirect to="/signin" />
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(IndexPage)