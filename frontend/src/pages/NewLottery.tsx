import React, { FunctionComponent } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Input } from '../components/shared/Input';
import styled from '@emotion/styled';
import { Button } from '../components/shared/Button';
import BoxLayout from '../components/shared/BoxLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { CREATE_COMPETITION_REQUESTED } from '../store/actions';
import useForm from 'react-hook-form';

const NewLottery: FunctionComponent = (props: any) => {

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
        <label htmlFor="username-field">Lottery title</label>
        <Input block id="username-field" name="name" ref={register({
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