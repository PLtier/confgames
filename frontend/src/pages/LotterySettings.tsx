import React, { FunctionComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import BoxLayout from '../components/shared/BoxLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { ERASE_COMPETITION_REQUESTED, CHANGE_COMPETITION_NAME_REQUESTED } from '../store/actions';
import useForm from 'react-hook-form';
import { Competition } from '../types';

interface LotterySettingsProps extends RouteComponentProps{
    competitions: Competition[]
    eraseLottery: Function
    changeLotteryName: Function
    match: any
}

const LotterySettings: FunctionComponent<LotterySettingsProps> = (props) => {

    const { lotteryID } = props.match.params
    const lottery = props.competitions.find((lottery: Competition) => lottery._id === lotteryID.trim())
    const { handleSubmit, register } = useForm({
        defaultValues: {
            name: lottery ? lottery.competitionName : ''
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
                <label htmlFor="name-field">Lottery title</label>
                <Input block id="name-field" name="name" ref={register({
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
    eraseLottery: makeAction(ERASE_COMPETITION_REQUESTED),
    changeLotteryName: makeAction(CHANGE_COMPETITION_NAME_REQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(LotterySettings)