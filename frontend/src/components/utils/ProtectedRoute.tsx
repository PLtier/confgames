import React, { FunctionComponent, ElementType, ComponentClass } from 'react'
import { connect } from 'react-redux'
import { RouteProps, Route, Redirect } from 'react-router-dom'

interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    protected?: boolean;
    component: ComponentClass<any, any>;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ component, isAuthenticated, ...rest }) => {
    const Page: ElementType = component
    return (
        <Route {...rest} render={(props) => (
          isAuthenticated === true
            ? <Page {...props} />
            : <Redirect to='/signin' />
        )} />
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(ProtectedRoute)