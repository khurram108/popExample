import React, { useState, useEffect } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, User, Clipboard, DollarSign, Monitor, Layers, TrendingUp } from 'react-feather';

import { Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import history from '../utils/history'
import Cookies from 'js-cookie'
import { get_my_referrals, get_active_ref } from '../../redux/actions/ReferralAction'
import { connect, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { earningStatus } from '../../redux/actions/DeshboardAction'


function Referral(props) {

    const {
        get_my_referrals,
        referrals,
        earningStatus,
        deshboardStatus,
        get_active_ref
    } = props


    const [allReferrals, setAllReferrals] = useState([]);
    const [activeRefferals, setActiveRefferals] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const toggle = () => setDropdownOpen(prevState => !prevState);


    let user = JSON.parse(Cookies.get("user"))
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const logout = e => {
        Cookies.remove("user")
        history.push("/login")
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}

        >
            <MenuItem onClick={handleMenuClose}>{user.Fname + " " + user.Lname}</MenuItem>
            <Link to="/profile">
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={() => {
                handleMenuClose()
                logout()
            }} >Log out</MenuItem>
        </Menu>
    );
    const [copySuccess, setCopySuccess] = useState('');


    // const copyToClipboard = e => {
    //     let value = document.getElementById("ref_link").value
    //     navigator.clipboard.writeText(value)
    //     // This is just personal preference.
    //     // I prefer to not show the the whole text area selected.
    //     e.target.focus();
    //     console.log("Copied");
    //     setCopySuccess('Copied!');
    // };

    useEffect(() => {
        get_my_referrals({ uuid: user.uuid })
        get_active_ref({ uuid: user.uuid })
    }, [])

    useEffect(() => {
        setAllReferrals(referrals.referral)
        setActiveRefferals(referrals.referral_list)

    }, [referrals.referral, referrals.referral_list])

    const [showModal, setShowModal] = useState(false);

    const code1 = `
    <a href="https://popexample.com/home/280646" target="_blank" title="PopCash - The Popunder network"><img src="dist/images/300 X 250-8.png" alt="PopCash.net"></a>
    `

    const code2 = `
    <a href="https://popexample.com/home/280646" target="_blank" title="PopCash - The Popunder network"><img src="dist/images/300 X 250-8.png" alt="PopCash.net"></a>
    `

    const code3 = `
    <a href="https://popexample.com/home/280646" target="_blank" title="PopCash - The Popunder network"><img src="dist/images/300 X 250-8.png" alt="PopCash.net"></a>
    `

    const code4 = `
    <a href="https://popexample.com/home/280646" target="_blank" title="PopCash - The Popunder network"><img src="dist/images/300 X 250-8.png" alt="PopCash.net"></a>
    `
    const copyCode = (e) => {
        setShowModal(true)
        setTimeout(() => {
            setShowModal(false)
        }, 1000);

    }

    const [allEarningStatus, setEarningStatus] = useState([]);


    useEffect(() => {
        earningStatus({ userID: user._id })
    }, [])

    useEffect(() => {
        setEarningStatus(deshboardStatus.deshboard_status)

    }, [deshboardStatus.deshboard_status])


    console.log(activeRefferals);

    return (
        <>
            <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <Link to="/" className="flex mr-auto">
                        <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={require("../../assets/images/logo.svg")} />
                    </Link>

                    <a href="#" id="mobile-menu-toggler" onClick={toggle}>
                        <BarChart2 className="w-8 h-8 text-white transform -rotate-90" />
                    </a>
                </div>
                {
                    dropdownOpen ?

                        <ul className="border-t border-theme-24 py-5 ">
                            <li>
                                <Link to="/" className="menu  ">
                                    <div className="menu__icon">
                                        <Home />


                                    </div>
                                    <div className="menu__title"> Dashboard </div>
                                </Link>

                            </li>
                            <li>
                                <Link to="/website-page" className="menu menu--active">
                                    <div className="menu__icon">  <Globe /></div>
                                    <div className="menu__title"> Webistes </div>
                                </Link>
                            </li>


                            <li>
                                <Link to="/code-gen" className="menu">
                                    <div className="menu__icon"> <Code /></div>
                                    <div className="menu__title"> Code Generator </div>
                                </Link>

                            </li>
                            <li>
                                <Link to="/billing" className="menu">
                                    <div className="menu__icon"> <CreditCard /> </div>
                                    <div className="menu__title"> Billing </div>
                                </Link>

                            </li>
                            <li>
                                <Link to="/referrals" className="menu ">
                                    <div className="menu__icon"> <Users /></div>
                                    <div className="menu__title"> Referrals </div>
                                </Link>

                            </li>


                        </ul>
                        : null
                }
            </div>
            <div class="flex">
                <nav className="side-nav">
                    <Link to="/" className="intro-x flex items-center pl-5 pt-4 ">
                        <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={require("../../assets/images/logo.svg")} />
                        <span className="hidden xl:block text-white text-lg ml-3"> Pop<span className="font-medium">Example</span>
                        </span>
                    </Link>
                    <div className="side-nav__devider my-6"></div>
                    <ul>
                        <li>
                            <Link to="/" className="side-menu ">
                                <div className="side-menu__icon">
                                    <Home />
                                </div>
                                <div className="side-menu__title"> Dashboard </div>
                            </Link>

                        </li>
                        <li>
                            <Link to="/statistics" className="side-menu  ">
                                <div className="side-menu__icon"> <TrendingUp /></div>
                                <div className="side-menu__title"> Statistics </div>
                            </Link>

                        </li>

                        <li>
                            <Link to="/website-page" className="side-menu  ">
                                <div className="side-menu__icon"> <Globe /> </div>
                                <div className="side-menu__title"> Webistes </div>
                            </Link>

                        </li>
                        <li>
                            <Link to="/code-gen" className="side-menu">
                                <div className="side-menu__icon"> <Code /></div>
                                <div className="side-menu__title"> Code Generator </div>
                            </Link>

                        </li>
                        <li>
                            <Link to="/billing" className="side-menu ">
                                <div className="side-menu__icon"> <CreditCard /> </div>
                                <div className="side-menu__title"> Billing </div>
                            </Link>

                        </li>
                        <li>
                            <Link to="/referrals" className="side-menu side-menu--active">
                                <div className="side-menu__icon"> <Users /></div>
                                <div className="side-menu__title"> Referrals </div>
                            </Link>

                        </li>

                        <li>
                            <Link to="/profile" className="side-menu ">
                                <div className="side-menu__icon">  <User /></div>
                                <div className="side-menu__title"> Profile </div>
                            </Link>
                        </li>
                        <li className="side-nav__devider my-6"></li>

                    </ul>
                </nav>

                <div class="content">
                    <div class="top-bar">

                        <div className="-intro-x breadcrumb mr-auto hidden sm:flex"> </div>

                        <div className="intro-x relative mr-3 sm:mr-6">


                        </div>
                        <div className="intro-x dropdown relative mr-auto sm:mr-6 text-base font-medium">
                            ${allEarningStatus.length > 0 ? allEarningStatus[0].available_balance.toFixed(2) : 0.00.toFixed(2)}
                        </div>
                        <div class="intro-x dropdown w-8 h-8 relative">
                            <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                                <img alt="Midone Tailwind HTML Admin Template" src={require("../../assets/images/profile-10.png")} onClick={handleProfileMenuOpen} />
                            </div>

                        </div>
                    </div>

                    <div class="intro-y flex grid grid-cols-12 sm:flex-row items-center mt-8 mb-16">

                        <div class="col-span-12 mb-16 bg-white pb-10 " >
                            <h2 class="text-lg col-span-12 w-full font-medium ml-5 mt-5 py-3 px-5 block">
                                Referral Stats
                                </h2>

                            <div class="grid grid-cols-12 gap-6 mt-10 mr-5 ml-0 sm:ml-0 lg:ml-10 ">
                                <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y mr-4 ml-4">
                                    <div class="report-box zoom-in">
                                        <div class="box p-5">
                                            <div class="flex">

                                                <Layers className="report-box__icon text-theme-11" />

                                            </div>
                                            <div class="text-3xl font-bold leading-8 mt-6">{allReferrals > 0 ? allReferrals : 0}</div>
                                            <div class="text-base text-gray-600 mt-1">Total Referrals</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y mr-4 ml-4">
                                    <div class="report-box zoom-in">
                                        <div class="box p-5">
                                            <div class="flex">

                                                <Monitor className="report-box__icon text-theme-10" />

                                            </div>
                                            <div class="text-3xl font-bold leading-8 mt-6">{activeRefferals.length > 0 ? activeRefferals.length : 0}</div>
                                            <div class="text-base text-gray-600 mt-1">Active Referrals</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y mr-4 ml-4">
                                    <div class="report-box zoom-in">
                                        <div class="box p-5">
                                            <div class="flex">

                                                <DollarSign className="report-box__icon text-theme-12" />
                                            </div>
                                            <div class="text-3xl font-bold leading-8 mt-6">  ${allEarningStatus.length > 0 ? allEarningStatus[0].referral_earning.toFixed(2) : 0.00.toFixed(2)}</div>
                                            <div class="text-base text-gray-600 mt-1">Revenue Referrals</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="intro-y col-span-12 lg:col-span-6 sm:col-span-12 py-4 px-4 bg-white mt-5 lg:mt-0" >
                            <h2 class="text-lg font-medium mr-auto ml-5 mt-5">
                                Referral link
                            </h2>
                            <div class="col-span-4 flex">

                                <input type="text"
                                    class="input placeholder-theme-13 py-5 px-5 ml-5 mt-5 bg-gray-200 outline-none font-medium intro-y w-full flex cursor-not-allowed"
                                    value={`http://ewdtech.com:5656/register/ref?ref_id=${user.uuid}`} readonly id="ref_link" />
                                <CopyToClipboard text={`http://ewdtech.com:5656/register/ref?ref_id=${user.uuid}`} onCopy={copyCode}>

                                    <button class="button bg-gray-200 h-16 w-20 flex items-center mt-5 ml-5">
                                        <Clipboard class="w-5 h-5 mr-2" /> Copy
                                </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div class="text-lg font-small ml-0 lg:ml-10 col-span-12 lg:col-span-6 sm:col-span-12 py-10 px-10 bg-white">

                            Promote us and win money. <br />
                            You will earn <b>10% </b> of referred publishers revenue lifetime  <br />
                            Active referrals are all the refferals that send at  at least 10 visits to our system.

                        </div>

                    </div>
                    <div class="intro-y grid grid-cols-12 mt-5">


                        <div class="intro-y col-span-12 lg:col-span-8 xxl:col-span-8  mr-0 lg:mr-10">


                            <div class="col-span-12 mb-16 bg-white py-10">
                                <h2 class="text-lg col-span-12 w-full font-medium ml-5 mt-5 py-3 px-5 block">
                                    Referral List
                                </h2>
                                <div class="intro-y col-span-12 mr-10 ml-10 lg:col-span-10 sm:col-span-12 overflow-scroll lg:overflow-y-auto lg:overflow-x-hidden mt-4 h-56 table_scroll">

                                    <table class="bg-white w-full">
                                        <thead class="border px-4 py-2">
                                            <tr>
                                                <th class="border px-4 py-2 w-20 h-16">ID</th>
                                                <th class="border px-4 py-2">User Name</th>
                                                <th class="border px-4 py-2">Date</th>
                                                {/* <th class="border px-4 py-2">Amount</th> */}
                                                {/* <th class="border px-4 py-2">Requested To</th> */}
                                                <th class="border px-4 py-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {activeRefferals.length > 0 ?
                                                activeRefferals.map((item, key) => {

                                                    return <tr key={key}>
                                                        <td class="border px-4 py-2">{item.uuid}</td>
                                                        <td class="border px-4 py-2">{item.Fname} {item.Lname}</td>
                                                        <td class="border px-4 py-2">{item.created_at.slice(0,10)}</td>
                                                        <td class="border px-4 py-2">Active</td>
                                                    </tr>
                                                })
                                                :
                                                <tr>
                                                    <td class="border px-4 py-2 text-center"  colspan="4" >You don't have any referral active yet.</td>
                                                   
                                                </tr>
                                            }

                                            {/* }) : */}

                                            {/* } */}



                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="intro-y col-span-8 lg:col-span-12 bg-white mt-20 sm:mt-5 lg:mt-0 py-5">
                                <img src={require("../../assets/images/728 X 90-8.png")} alt="" class="image mt-10 pl-0 sm:pl-0 lg:pl-40  mb-20" />
                                <div className="mr-4 ml-4 border rounded py-4 px-4 bg-gray-200 ">
                                    {code1}
                                </div>
                                <CopyToClipboard text={code1} onCopy={copyCode}>

                                    <button class="button bg-gray-200 h-16 w-50 flex items-center mt-5 ml-auto mr-auto mb-4">
                                        <Clipboard class="w-5 h-5 mr-2" /> Copy Code
                                </button>
                                </CopyToClipboard>
                            </div>


                        </div>
                        <div class="intro-y col-span-12 sm:col-span-12 lg:col-span-4 xxl:col-span-4 bg-white mr-0 mt-5 sm:mt-5 lg:mt-0 sm:mr-0 lg:mr-10">

                            <img src={require("../../assets/images/160 X 600-8.png")} alt="" class="image mt-5 mr-auto ml-auto" />

                            <div className="mr-4 ml-4 border rounded py-4 px-4 bg-gray-200 mt-4">
                                {code2}
                            </div>
                            <CopyToClipboard text={code2} onCopy={copyCode}>

                                <button class="button bg-gray-200 h-16 w-50 flex items-center mt-5 ml-auto mr-auto mb-4">
                                    <Clipboard class="w-5 h-5 mr-2" /> Copy Code
                                </button>
                            </CopyToClipboard>

                        </div>
                    </div>
                    <div class="grid grid-cols-12 intro-y mt-5">
                        <div class="col-span-12 lg:col-span-4 sm:col-span-12 bg-white mr-0 lg:mr-10">

                            <img src={require("../../assets/images/300 X 250-8.png")} alt="" class="image mt-5 mr-auto ml-auto" />

                            <div className="mr-4 ml-4 border rounded py-4 px-4 bg-gray-200 mt-4">
                                {code3}
                            </div>
                            <CopyToClipboard text={code3} onCopy={copyCode}>

                                <button class="button bg-gray-200 h-16 w-50 flex items-center mt-5 ml-auto mr-auto mb-4">
                                    <Clipboard class="w-5 h-5 mr-2" /> Copy Code
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div class="col-span-12 lg:col-span-8 sm:col-span-12 bg-white mr-0 lg:mr-10 mt-5 sm:mt-5 lg:mt-0">

                            <img src={require("../../assets/images/468 X 60-8.png")} alt="" class="image mt-40 mr-auto ml-auto" />

                            <div className="mr-4 ml-4 border rounded py-4 px-4 bg-gray-200 mt-4 ">
                                {code4}
                            </div>
                            <CopyToClipboard text={code4} onCopy={copyCode}>

                                <button class="button bg-gray-200 h-16 w-50 flex items-center mt-5 ml-auto mr-auto mb-4">
                                    <Clipboard class="w-5 h-5 mr-2" /> Copy Code
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
            {renderMenu}
            <>

                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

                        >
                            <div className="bg-gray-200 border py-16 px-16 rounded-md text-base ">
                                <Clipboard className="mr-auto ml-auto mb-5" />

                            Text copied to clipboard..!!

                        </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
        </>
    )
}

let mapStateToProps = state => {
    return {
        referrals: state.ReferralReducer,
        deshboardStatus: state.DeshboardReducer

    }
}


export default connect(mapStateToProps, { get_my_referrals, earningStatus, get_active_ref })(Referral);