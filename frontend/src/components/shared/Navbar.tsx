import React, { FunctionComponent } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '../../theme';
import { ButtonLink } from './Button';
import { connect } from 'react-redux';
import { RootState } from '../../types';

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    z-index:2;
    padding:10px 10%;
    background: ${theme.color.dark};
    color:white;
    justify-content:space-between;
    &, & > div{
        display:flex;
        align-items:center;
    }
    .sponsor-name{
        margin-right:2em;
        strong{
            margin-left:.5em;
        }
    }
`
const Menu = styled.ul`
    display:flex;
    margin:0;
`
const MenuItem = styled.li`
    display:block;
    a{
        all:inherit;
        cursor:pointer;
    }
`

interface NavbarProps extends RouteComponentProps{
    username: string
}

const Navbar: FunctionComponent<NavbarProps> = (props) => {
    if(props.location.pathname === '/signin' || props.location.pathname.endsWith('/signup'))
        return null

    return (
        <Nav>
            <div>
            <h4>ConFrontJS Partner App</h4>
            <Menu>
                <MenuItem>
                    <Link to="/dashboard">Home</Link>
                </MenuItem>
            </Menu>
            </div>
            <div>
                <span className="sponsor-name">Partner: <strong>{props.username}</strong></span>
                <ButtonLink bg="primary" to="/signout">Sign out</ButtonLink>
            </div>
        </Nav>
    )
}
const mapStateToProps = (state: RootState) => ({
    username: state.user.username
})

export default connect(mapStateToProps)(withRouter(Navbar))