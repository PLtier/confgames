import React, { FunctionComponent } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Input } from '../components/shared/Input';
import styled from '@emotion/styled';
import { Button } from '../components/shared/Button';
import BoxLayout from '../components/shared/BoxLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { ERASE_COMPETITION_REQUESTED, CHANGE_COMPETITION_NAME_REQUESTED } from '../store/actions';
import useForm from 'react-hook-form';

const LotterySettings: FunctionComponent = (props: any) => {

    const { lotteryID } = props.match.params
    const lottery = props.competitions.find((lottery: any) => lottery._id === lotteryID.trim())
    const { handleSubmit, register, errors } = useForm({
        defaultValues: {
            name: lottery.competitionName
        }
    })
    if(!lottery)
        return <Redirect to="/" />

   
    const confirmErasion = ()  => {
        const promptedName = prompt('Enter lottery name to proceed')
        if(promptedName && promptedName.trim().toLowerCase() === lottery.competitionName.trim().toLowerCase()){
            props.eraseLottery({
                competitionID: lotteryID
            })
            props.history.push('/dashboard')
        }
    }
    const onSubmit = (values: any) => {
        props.changeLotteryName({
            competitionID: lotteryID,
            competitionName: values.name
        })
    }
    return (
        <BoxLayout goBackPath={`/lottery/${lotteryID}`}>
            <h1>Lottery Settings</h1>
        <h3>{lottery.competitionName}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username-field">Lottery title</label>
        <Input block id="username-field" name="name" ref={register({
            required: true
        })} />
        <Button bg="dark" type="submit">Save</Button>
        </form>
        <p>or maybe you want to erase current lottery</p>
        <Button bg="danger" block onClick={confirmErasion}>Erase lottery</Button>
        </BoxLayout>
    )
}

const mapStateToProps = (state: any) => ({
    competitions: state.competitions.competitions
})

const mapDispatchToProps = {
    // fetchCompetitions: makeAction(FETCH_COMPETITIONS_REQUESTED)
    eraseLottery: makeAction(ERASE_COMPETITION_REQUESTED),
    changeLotteryName: makeAction(CHANGE_COMPETITION_NAME_REQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(LotterySettings)