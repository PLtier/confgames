import React, { FunctionComponent } from 'react';
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import BoxLayout from '../components/shared/BoxLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { SEND_MAIL_REQUESTED } from '../store/actions';
import useForm from 'react-hook-form';
import { RouteComponentProps } from 'react-router';

interface SendMailProps extends RouteComponentProps {
    sendMail: Function
}

const SendMail: FunctionComponent<SendMailProps> = (props) => {

    const { handleSubmit, register } = useForm()
    const onSubmit = (values: any) => {
        props.sendMail({
            mail: values.mail
        })
        props.history.push('/dashboard')
    }
    return (
        <BoxLayout goBackPath={`/lottery/xd`}>
            <h1>Send mail with CSV</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email-field">Email address</label>
                <Input block id="email-field" type="email" name="mail" ref={register({
                    required: true
                })} />
                <Button bg="dark" type="submit">Send</Button>
            </form>
        </BoxLayout>
    )
}

const mapDispatchToProps = {
    sendMail: makeAction(SEND_MAIL_REQUESTED)
}

export default connect(null, mapDispatchToProps)(SendMail)