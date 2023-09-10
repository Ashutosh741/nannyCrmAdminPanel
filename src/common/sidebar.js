


import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link, NavLink, useParams } from 'react-router-dom';
import logo from '../assets/images/logo.png'

const Sidebar = () => {
    // const { id } = useParams();
    return (
        <div className="border-end sidenav" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom">
                <Link to="/">
                    <img alt="Alt content" className="img-fluid logo" src={logo} />
                </Link>
            </div>
            <PerfectScrollbar className="sidebar-items">
                <ul className="list-unstyled ps-0">
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/dashboard">
                            <i class="fa-solid fa-house"></i> Dashboard
                        </NavLink>
                    </li>
                    {/* <li className="mb-1">
                        <NavLink tag="a" className="" to="/blank-page">
                            <i className="fa fa-file-o"></i> Blank Page
                        </NavLink>
                    </li> */}
                    {/* <li className="border-top my-3"></li> */}
                    {/* <li className="mb-1">
                        <NavLink tag="a" className="" to="/typography">
                            <i className="fa fa-text-width" aria-hidden="true"></i> Typography
                        </NavLink>
                    </li> */}
                    {/* <li className="my-3">
                        <NavLink tag="a" className="" to="/customer">
                            <i class="fa-solid fa-user"></i> Customer Reg.
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/ayaDetail">
                            <i className="fa fa-text-width" aria-hidden="true"></i> Aya Details
                        </NavLink>
                    </li> */}
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/ayaList">
                            <i class="fa-solid fa-list-ul"></i> Aya List
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/customerlist">
                            <i class="fa-sharp fa-solid fa-list-check"></i> Customer List
                        </NavLink>
                    </li>
                    {/* <li className="my-3">
                        <NavLink tag="a" className="" to="/ayaDetail">
                            <i class="fa-solid fa-user"></i> Aya Detial
                        </NavLink>
                    </li> */}
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/ayapayment">
                            <i class="fa-solid fa-credit-card"></i> Aya Payment
                        </NavLink>
                    </li>

                    <li className="my-3">
                        <NavLink tag="a" className="" to="/payment">
                            <i class="fa-solid fa-money-check-dollar"></i> Customer Payment
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/booking">
                            <i class="fa-solid fa-envelope"></i> Inquiry
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/attendence">
                            <i class="fa-solid fa-clipboard-user"></i> Attendence Form
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/generateCustomerBill">
                            <i class="fa-solid fa-coins"></i> Gen... Customer Bill
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/generateAyaBill">
                            <i class="fa-solid fa-coins"></i> Gen... Aya Bill
                        </NavLink>
                    </li>
                    <li className="my-3">
                        <NavLink tag="a" className="" to="/generateSecurityBill">
                            <i class="fa-solid fa-coins"></i> Security Bill
                        </NavLink>
                    </li>
                </ul>
            </PerfectScrollbar>
            <div className="dropdown fixed-bottom-dropdown">
                <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    {/* <img src="https://via.placeholder.com/50" alt="" width="32" height="32" className="rounded-circle me-2" /> */}
                    <span>User</span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    {/* <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li> */}
                    <li><Link className="dropdown-item" to="/"><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
