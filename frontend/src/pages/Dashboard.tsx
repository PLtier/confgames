import React, { FunctionComponent, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import styled from '@emotion/styled';
import { ButtonLink } from '../components/shared/Button';
import { theme } from '../theme';
import PageLayout from '../components/shared/PageLayout';
import { connect } from 'react-redux';
import makeAction from '../store/makeAction';
import { FETCH_COMPETITIONS_REQUESTED } from '../store/actions';
import { Competition } from '../types';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 2em;
    margin:10px;
`
const GridItem = styled(Link)`
    all: unset;
    cursor: pointer;
    display:block;
    padding:2em 1em;
    border: 3px solid ${theme.color.dark};
    border-radius:3px;
    text-align:center;
    font-weight:bold;
`

interface DashboardProps extends RouteComponentProps{
    fetchCompetitions: Function
    competitions: Competition[]
}

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
    
    useEffect(() => {
        props.fetchCompetitions()
    }, [])

    return (
        <PageLayout
        title="Lotteries"
        actions={[
            <ButtonLink bg="dark" to="/new-lottery">New lottery</ButtonLink>,
            <ButtonLink bg="dark" to="/send-mail">Send mail with CSV</ButtonLink>
        ]}>
            <Grid>
                {
                    props.competitions.map((competition: Competition) => (
                        <GridItem to={`/lottery/${competition._id}`}>
                            <span>{competition.competitionName}</span>
                        </GridItem>
                    ))
                }
            </Grid>
       </PageLayout>
    )
}

const mapStateToProps = (state: any) => ({
    competitions: state.competitions.competitions
})

const mapDispatchToProps = {
    fetchCompetitions: makeAction(FETCH_COMPETITIONS_REQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)