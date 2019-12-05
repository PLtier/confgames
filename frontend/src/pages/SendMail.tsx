import React, { FunctionComponent } from 'react';
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import BoxLayout from '../components/shared/BoxLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { SEND_MAIL_SUCCEDDED } from '../store/actions';
import useForm from 'react-hook-form';

const SendMail: FunctionComponent = (props: any) => {

    const { handleSubmit, register } = useForm()
    const onSubmit = (values: any) => {
        props.sendMail({
            mail: values.mail
        })
    }
    return (
        <BoxLayout goBackPath={`/lottery/xd`}>
        <h1>Send mail with CSV</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email-field">Email address</label>
        <Input block id="email-field" type="email" name="mail" ref={register({
            required: true
        })} />
        </form>
        <Button bg="dark">Send</Button>
        </BoxLayout>
    )
}

const mapDispatchToProps = {
    sendMail: makeAction(SEND_MAIL_SUCCEDDED)
}

export default connect(null, mapDispatchToProps)(SendMail)