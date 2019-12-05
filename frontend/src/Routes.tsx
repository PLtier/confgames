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

const unauthenticatedRoutes: RouteProps[] = [
    {
        path: '/',
        component: IndexPage,
        exact: true
    },
    {
        path: '/signin',
        component: SignIn,
        exact: true
    }
]
const authenticatedRoutes: RouteProps[] = [

    {
        path: '/signout',
        component: SignOut,
        exact: true
    },
    {
        path: '/dashboard',
        component: Dashboard,
        exact: true,
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
                authenticatedRoutes.map(routeProps => <ProtectedRoute {...routeProps} />)
            }

            {
                unauthenticatedRoutes.map(routeProps => <Route {...routeProps} />)
            }
        </Switch>
    )
}

export default Routing;
