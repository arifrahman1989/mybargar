import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    NavItem,
    Nav,
    Navbar,
    NavbarBrand,
}
    from 'reactstrap';
import './Header.css';
import Logo from '../../assets/logo.png';



const mapStateToProps = state => {
    return {
        token: state.token,
    }
}




const Header = props => {
    let links = null;
    if (props.token === null) {
        links = (

            < Nav className='mr-md-5 test' >
                <NavItem>
                    <NavLink exact to='/login' className='NavLink'>Login</NavLink>
                </NavItem>
            </Nav >


        )
    } else {
        links = (

            < Nav className='mr-md-5 test' style={{marginRight:'40px'}}>
                <NavItem>
                    <NavLink exact to='/' className='NavLink'>Burgar Make</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to='/order' className='NavLink'>Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to='/logout' className='NavLink'>Logout</NavLink>
                </NavItem>
            </Nav >


        )

    }
    return (
        <div className='Navigation'>
            <Navbar style={{
                backgroundColor: 'DarkBlue', height: '80px'
            }}>

                <NavbarBrand href='/' style={{marginLeft:'15px'}} className='mr-auto ml-md-5 Brand'>
                    <img src={Logo} alt='Logo' width='80px' />
                </NavbarBrand>

                {links}

            </Navbar>
        </div>
    );
}

export default connect(mapStateToProps)(Header);