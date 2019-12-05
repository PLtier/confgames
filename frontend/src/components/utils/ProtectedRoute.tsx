import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


// troubles with Routes component when trying to setup props

const ProtectedRoute: FunctionComponent = ({component, isAuthenticated, path, ...rest}: any) => {
    return <Route {...rest} render={(props) => (
        isAuthenticated
        ? React.createElement(component, props)
        : <Redirect to="/" />
      )} />
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(ProtectedRoute)