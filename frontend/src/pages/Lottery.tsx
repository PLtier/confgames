import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { ButtonLink } from '../components/shared/Button';
import PageLayout from '../components/shared/PageLayout';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Competition } from '../types';

const AttendeesTable = styled.table`
    td{
        padding:10px 2em;
        text-align:left;
    }
`
interface LotteryProps extends RouteComponentProps{
    competitions: Competition[]
    match: any
}

const Lottery: FunctionComponent<LotteryProps> = (props) => {
    const { lotteryID } = props.match.params
    const lottery = props.competitions.find((lottery: Competition) => lottery._id === lotteryID.trim())

    if(!lottery)
        return <Redirect to="/" />

    return (
        <PageLayout
        title={`Lottery: ${lottery.competitionName}`}
        actions={[
        <ButtonLink bg="dark" to={`/lottery/${lotteryID}/signup`}>Sign up attendees</ButtonLink>,
        <ButtonLink bg="dark" to={`/lottery/${lotteryID}/settings`}>Lottery settings</ButtonLink>,
        ]}>

<AttendeesTable>
            <thead>
                <tr>
                    <th>No</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
{
    lottery.participants.map((participant: any, i: number) => (
       <tr>
           <td>{i+1}</td>
           <td>{participant.first_name}</td>
           <td>{participant.last_name}</td>
           <td>{participant.mail}</td>
           <td>{new Date(participant.date).toDateString()} {new Date(participant.date).toTimeString()}</td>
       </tr>
    ))
}
            </tbody>
            
        </AttendeesTable>
        </PageLayout>
    )
}

const mapStateToProps = (state: any) => ({
    competitions: state.competitions.competitions
})

export default connect(mapStateToProps)(Lottery)