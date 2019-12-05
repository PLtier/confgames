import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import makeAction from '../store/makeAction'
import { USER_SIGNOUT_REQUESTED } from '../store/actions'

interface SignOutProps{
    signOut: Function
}

const SignOut: FunctionComponent<SignOutProps> = (props) => {

    props.signOut()

    return <Redirect to="/signin" />
}

const mapDispatchToProps = {
    signOut: makeAction(USER_SIGNOUT_REQUESTED)
}

export default connect(null, mapDispatchToProps)(SignOut)