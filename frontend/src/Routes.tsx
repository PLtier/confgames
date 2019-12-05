import React, { FunctionComponent } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import ProtectedRoute from './components/utils/ProtectedRoute'

import IndexPage from './pages/IndexPage'
import SignIn from './pages/SignIn'
import LotterySettings from './pages/LotterySettings'
import Dashboard from './pages/Dashboard'
import Lottery from './pages/Lottery'
import SendMail from './pages/SendMail'
import SignUpAttendees from './pages/SignUpAttendees'
import SignOut from './pages/SignOut'
import NewLottery from './pages/NewLottery'

interface CustomRouteProps extends RouteProps{
    protected?: boolean;
}

const routes: CustomRouteProps[] = [
    {
        path: '/',
        component: IndexPage,
        exact: true
    },
    {
        path: '/signout',
        component: SignOut,
        exact: true
    },
    {
        path: '/signin',
        component: SignIn,
        exact: true,
        protected: false
    },
    {
        path: '/dashboard',
        component: Dashboard,
        exact: true,
        protected: true,
    },
    {
        path: '/new-lottery',
        component: NewLottery,
        exact: true
    },
    {
        path: '/lottery/:lotteryID',
        component: Lottery,
        exact: true
    },
    {
        path: '/lottery/:lotteryID/settings',
        component: LotterySettings
    },
    {
        path: '/send-mail',
        component: SendMail
    },
    {
        path: '/lottery/:lotteryID/signup',
        component: SignUpAttendees
    }
]

const Routing: FunctionComponent = () => {
    return (
        <Switch>
            {
                routes.map(routeProps => <Route {...routeProps} />)
            }
        </Switch>
    )
}

export default Routing;
