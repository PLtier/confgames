import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom'
import { Input } from '../components/shared/Input';
import styled from '@emotion/styled';
import { Button } from '../components/shared/Button';
import { theme } from '../theme';
import Wave from '../components/graphics/Wave';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { USER_SIGNIN_REQUESTED } from '../store/actions';
import useForm from 'react-hook-form'
const Box = styled.div`
    width: 25%;
    margin: auto;
    .form-input{
        margin: 10px;
        display: block;
    }
`
const PageWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${theme.color.white};
    overflow: hidden;
    position: relative;

    .wave-wrapper{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 10vh;
    }
`
interface FormValues{
    username: string;
    password: string;
}
const SignIn: FunctionComponent = (props: any) => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = ({username, password}: any) => {
        props.signIn({
            username,
            password
        })
    }
    if(props.isAuthenticated === true)
        return <Redirect to="/dashboard" />

    return (
        <PageWrapper>
            <Box>
                <img src={require('../assets/logo.png')} />
                <form onSubmit={handleSubmit(onSubmit)} >
                <div className="form-input">
                    <label htmlFor="username-field">Login</label>
                    <Input block id="username-field" name="username" ref={register({
                        required: true
                    })}/>
                </div>
                <div className="form-input">
                    <label htmlFor="password-field">Password</label>
                    <Input block id="password-field" type="password" name="password"ref={register({
                        required: true
                    })} />
                </div>
                <div className="form-input">
                    <Button bg="dark" type="submit">Sign in</Button>
                    {
                        props.signInError === true && (
                            <p>
                                Wrong username and/or password
                            </p>
                        )
                    }
                </div>
                </form>
            </Box>
            <div className="wave-wrapper">
                <Wave />
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.user.isAuthenticated,
    signInError: state.user.signInError
})

const mapDispatchToProps = {
    signIn: makeAction(USER_SIGNIN_REQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)