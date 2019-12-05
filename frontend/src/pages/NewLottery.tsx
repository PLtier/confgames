import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import BoxLayout from '../components/shared/BoxLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { CREATE_COMPETITION_REQUESTED } from '../store/actions';
import useForm from 'react-hook-form';

interface NewLotteryProps extends RouteComponentProps{
    createLottery: Function
}

const NewLottery: FunctionComponent<NewLotteryProps> = (props) => {

    const { handleSubmit, register } = useForm()

    const onSubmit = (values: any) => {
        props.createLottery({
            competitionName: values.name
        })
        props.history.push('/dashboard')
    }

    return (
        <BoxLayout goBackPath={`/dashboard`}>
            <h1>New lottery</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name-field">Lottery title</label>
                <Input block id="name-field" name="name" ref={register({
                    required: true
                })} />
                <Button bg="dark" type="submit">Create</Button>
            </form>
        </BoxLayout>
    )
}

const mapDispatchToProps = {
    createLottery: makeAction(CREATE_COMPETITION_REQUESTED)
}

export default connect(null, mapDispatchToProps)(NewLottery)