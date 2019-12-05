import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { Input } from '../components/shared/Input'
import Wave from '../components/graphics/Wave'
import { ButtonLink, Button } from '../components/shared/Button'
import { connect } from 'react-redux'
import { Redirect, RouteChildrenProps } from 'react-router'
import makeAction from '../store/makeAction'
import { ADD_COMPETITION_PARTICIPANT_REQUESTED } from '../store/actions'
import useForm from 'react-hook-form'
import { Competition } from '../types'

const Box = styled.div`
    width:50%;
    margin: 20vh auto 0 auto;
    padding:20px;
    background:white;
    border-radius:3px;

    .form-control{
        margin-top:3em;
    }
`
const PageWrapper = styled.div`
    width:100%;
    height:100%;
    overflow: hidden;
    position: relative;

    .wave-wrapper{
        position: absolute;
        bottom: 0;
        left:0;
        width:100%;
        height:20vh;
        z-index:-1;
    }
    .quit-btn{
        position: absolute;
        top:20px;
        left:20px;
    }
`
interface SignUpAttendeesProps extends RouteChildrenProps{
    competitions: Competition[]
    sponsorName: string
    signUp: Function
    match: any
}

const SignUpAttendees: FunctionComponent<SignUpAttendeesProps> = (props) => {
    const [submitted, setSubmitted] = useState(false)
    const { lotteryID } = props.match.params
    const lottery = props.competitions.find((lottery: Competition) => lottery._id === lotteryID.trim())
    const { handleSubmit, register } = useForm()

    if(!lottery)
        return <Redirect to="/" />

    const onSubmit = (values: any) => {
        props.signUp({
            competitionID: lotteryID,
            user: values
        })
        setSubmitted(true)
    }
    return (
        <PageWrapper>
        <Box>
        <header>
        <h1>{lottery.competitionName} lottery</h1>
        </header>
        <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
            {
                submitted === false ? (
                    <>
                    <p>Submitting this form you agree to privacy policy of "{lottery.competitionName}" lottery which is organized by {props.sponsorName}</p>
        <div className="form-control">
        <label>Your first name:</label>
        <Input block name="first_name" ref={register({
                        required: true
                    })} />
                     </div>
                     <div className="form-control">
        <label>Your last name:</label>
        <Input block name="last_name" ref={register({
                        required: true
                    })} />
                     </div>
                     <div className="form-control">
        <label>Your email address:</label>
        <Input block name="mail" ref={register({
                        required: true
                    })} />
                     </div>
                     <div className="form-control">
        <Button bg="primary" type="submit">Sign up</Button>
        </div>
                    </>
                ) : (
                    <>
                    <p>Thank you for taking part in out lottery. All you need to do now is wait. Maybe you are the one who's gonna win!</p>
        <div className="form-control">
        <Button bg="dark" onClick={() => setSubmitted(false)}>Next</Button>
        </div>
                    </>
                )
            }
        
        </form>
        </div>
        </Box>
        <div className="wave-wrapper">
        <Wave />
        </div>
        <ButtonLink className="quit-btn" to={`/lottery/${lotteryID}`}>Quit</ButtonLink>
        </PageWrapper>
    )
}

const mapStateToProps = (state: any) => ({
    competitions: state.competitions.competitions,
    sponsorName: state.user.username
})
const mapDispatchToProps = {
    signUp: makeAction(ADD_COMPETITION_PARTICIPANT_REQUESTED)
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpAttendees)