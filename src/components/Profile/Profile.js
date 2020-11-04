import React, { useState, useEffect } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, User, TrendingUp, Clipboard } from 'react-feather';

import { Link } from "react-router-dom";
import Cookies from 'js-cookie'


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { getProfile, updateProfileGen, updateProfileBilling, changePasswordFromProfile } from '../../redux/actions/AuthAction'
import { connect } from 'react-redux'
import history from '../utils/history'
import { earningStatus } from '../../redux/actions/DeshboardAction'
// keep file size down
import { CountryDropdown } from 'react-country-region-selector';
import isEmpty from 'is-empty'


function Profile(props) {

    let {
        getProfile,
        auth,
        updateProfileGen,
        updateProfileBilling,
        changePasswordFromProfile,
        earningStatus,
        deshboardStatus
    } = props

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [err, setErr] = useState(null);
    const [pwChanged, setPwChanged] = useState(null);
    const [generalProfile, setGeneralMsg] = useState(null);
    const [countryError, setCountryErr] = useState(null)
    const [billingError, setBillingError] = useState(null)
    const [billingSuccess, setBillingSuccess] = useState(null)

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



    const [state, setState] = useState({


    })
    const [pass, setPass] = useState({
        Cpassword: null,
        NPassword: null,
        C_N_password: null
    })

    useEffect(() => {
        getProfile({ userID: user._id })
    }, [])

    useEffect(() => {
        setState(auth.userDetail)
        if (auth.successMsg) {
            document.getElementById("cpassword").value = ""
            document.getElementById("npassword").value = ""
            document.getElementById("c_n_password").value = ""
            setPwChanged(auth.successMsg)
        }
        if (auth.generalProfile) {
            setGeneralMsg(auth.generalProfile)
        }
        if (auth.successMsgBilling) {
            setBillingSuccess(auth.successMsgBilling)
        }
        if (auth.failMsgPassword) {
            setErr(auth.failMsgPassword)
        }
    }, [auth.userDetail, auth.successMsg, auth.generalProfile, auth.successMsgBilling,auth.failMsgPassword])

    const update = (e, cate) => {
        e.preventDefault()

        if (cate == "general") {
            const {
                Fname,
                Lname,
                country,
                skype,
                _id
            } = state
            const data = {
                Fname,
                Lname,
                country,
                skype,
                userID: _id
            }
            if (isEmpty(country) || isEmpty(skype)) {
                setCountryErr("Please Select Country/Skype")
                setTimeout(() => {
                    setCountryErr(null)

                }, 3000);
                return true;
            }
            updateProfileGen(data)
        }
        if (cate == "billing") {
            const {
                adressLine1,
                adressLine2,
                company,
                country,
                _id
            } = state
            const data = {
                adressLine1,
                adressLine2,
                company,
                userID: _id,
            }
            if (isEmpty(adressLine1) || isEmpty(adressLine2) || isEmpty(company) || isEmpty(country)) {
                setBillingError("Please Fill all the fields")
                setTimeout(() => {
                    setBillingError(null)

                }, 3000);
                return true;
            }
            updateProfileBilling(data)
        }




    }

    const changePass = e => {

        e.preventDefault()

        const {
            Cpassword,
            NPassword,
            C_N_password

        } = pass
        console.log(pass);
        if (isEmpty(Cpassword) || isEmpty(NPassword) || isEmpty(C_N_password)) {
            setErr("Please fill the form.")
            setTimeout(() => {
                setErr(null)
            }, 5000);
            return true
        }
        if (NPassword !== C_N_password) {
            setErr("New Password and Confirm New Password Didn't Match")
            setTimeout(() => {
                setErr(null)
            }, 5000);
            return true
        }
        let data = {
            Cpassword,
            NPassword,
            userID: state._id
        }

        changePasswordFromProfile(data)


    }


    const onChangeHandler = e => {

        let name = e.target.name
        let val = e.target.value

        setState({
            ...state,
            [name]: val
        })


    }

    const passChangeHandler = e => {

        let name = e.target.name
        let val = e.target.value

        setPass({
            ...pass,
            [name]: val
        })

    }

    const [allEarningStatus, setEarningStatus] = useState([]);


    useEffect(() => {
        earningStatus({ userID: user._id })
    }, [])

    useEffect(() => {
        setEarningStatus(deshboardStatus.deshboard_status)

    }, [deshboardStatus.deshboard_status])


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
                                <Link to="/proflie" className="menu menu--active">
                                    <div className="menu__icon">  <User /></div>
                                    <div className="menu__title"> Profile </div>
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
            <div className="flex">

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
                            <Link to="/referrals" className="side-menu ">
                                <div className="side-menu__icon"> <Users /></div>
                                <div className="side-menu__title"> Referrals </div>
                            </Link>

                        </li>

                        <li>
                            <Link to="/profile" className="side-menu side-menu--active">
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
                            ${allEarningStatus.length > 0 ? allEarningStatus[0].available_balance.toFixed(2) : 0.00}
                        </div>

                        <div class="intro-x dropdown w-8 h-8 relative">
                            <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                                <img alt="Midone Tailwind HTML Admin Template" src={require("../../assets/images/profile-10.png")} onClick={handleProfileMenuOpen} />
                            </div>

                        </div>
                    </div>


                    <div class="grid grid-cols-12 gap-6">

                        <div class="col-span-12 lg:col-span-12 xxl:col-span-12">

                            <div class="intro-y box lg:mt-5">
                                <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                                    <h2 class="font-medium text-base mr-auto">
                                        General Information
                                </h2>
                                </div>
                                <div class="p-5">
                                    <div class="grid grid-cols-12 gap-5">

                                        <div class="col-span-12 xl:col-span-12">
                                            <div class="">
                                                <label>First Name</label>
                                                <input type="text" class="input w-full border bg-white mt-2" onChange={onChangeHandler} name="Fname" placeholder="First Name" value={state.Fname ? state.Fname : null} />
                                            </div>
                                            <div class="mt-3">
                                                <label>Last Name</label>
                                                <input type="text" class="input w-full border bg-white mt-2" onChange={onChangeHandler} name="Lname" placeholder="Last Name" value={state.Lname ? state.Lname : null} />
                                            </div>
                                            <div class="mt-3">
                                                <label>Email</label>
                                                <input type="text" class="input w-full border bg-white mt-2"
                                                    // onChange={onChangeHandler} name="email" 
                                                    placeholder="Email" value={state.email ? state.email : null} readOnly />
                                            </div>
                                            <div class="mt-3">
                                                <label>Country</label>
                                                <CountryDropdown
                                                    onChange={(val) => setState({ ...state, country: val })}
                                                    name="country"
                                                    value={state.country}
                                                    class="input w-full border bg-white mt-2"
                                                />
                                            </div>
                                            <div class="mt-3">
                                                <label>Skype</label>
                                                <input type="text" class="input w-full border bg-white mt-2" onChange={onChangeHandler} name="skype" placeholder="Skype" value={state.skype ? state.skype : null} />
                                            </div>


                                        </div>
                                    </div>

                                    {countryError ?
                                        <div className="intro-x flex-items-center text-red-700 mt-5">
                                            {countryError}

                                        </div>
                                        : null}
                                    {generalProfile ?
                                        <div className="intro-x flex-items-center text-green-700 mt-5">
                                            {generalProfile}

                                        </div>
                                        : null}
                                    <div class="flex justify-end mt-4">

                                        <button type="button" class="button w-20 bg-theme-1 text-white ml-auto" onClick={e => { update(e, "general") }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 lg:col-span-6 xxl:col-span-6">
                            <div class="intro-y box lg:mt-5">
                                <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                                    <h2 class="font-medium text-base mr-auto">
                                        Billing Information
                                </h2>
                                </div>
                                <div class="p-5">
                                    <div class="grid grid-cols-12 gap-5">
                                        <div class="col-span-12 xl:col-span-12">
                                            <div>
                                                <label>
                                                    Address line 1
                                                </label>
                                                <input type="text" class="input w-full border bg-white mt-2" onChange={onChangeHandler} name="adressLine1" placeholder=" Address line 1" value={state.adressLine1 ? state.adressLine1 : null} />
                                            </div>
                                            <div class="mt-3">
                                                <label>Address line 2</label>
                                                <input type="text" class="input w-full border bg-white mt-2" onChange={onChangeHandler} name="adressLine2" placeholder=" Address line 2" value={state.adressLine2 ? state.adressLine2 : null} />
                                            </div>

                                            <div class="mt-3">
                                                <label>Company</label>
                                                <input type="text" class="input w-full border bg-white mt-2" onChange={onChangeHandler} name="company" placeholder=" Company Name" value={state.company ? state.company : null} />
                                            </div>
                                            <div class="mt-3">
                                                <label>Country</label>

                                                <CountryDropdown
                                                    onChange={(val) => setState({ ...state, country_billing: val })}
                                                    name="country_billing"
                                                    value={state.country_billing}
                                                    class="input w-full border bg-white mt-2"
                                                />

                                            </div>

                                        </div>

                                    </div>
                                    {billingError ?
                                        <div className="intro-x flex-items-center text-red-700 mt-5">
                                            {billingError}

                                        </div>
                                        : null}
                                    {billingSuccess ?
                                        <div className="intro-x flex-items-center text-green-700 mt-5">
                                            {billingSuccess}

                                        </div>
                                        : null}
                                    <div class="flex justify-end mt-4">

                                        <button type="button" class="button w-20 bg-theme-1 text-white ml-auto" onClick={e => { update(e, "billing") }}>Save</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-span-12 lg:col-span-6 xxl:col-span-6">
                            {/* <!-- BEGIN: Change Password --> */}
                            <div class="intro-y box lg:mt-5">
                                <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                                    <h2 class="font-medium text-base mr-auto">
                                        Change Password
                                    </h2>
                                </div>
                                <div class="p-5">
                                    <div>
                                        <label>Current Password</label>
                                        <input type="password" class="input w-full border mt-2" onChange={passChangeHandler} id="cpassword" name="Cpassword" placeholder="Current Password" value={pass.Cpassword} />
                                    </div>
                                    <div class="mt-3">
                                        <label>New Password</label>
                                        <input type="password" class="input w-full border mt-2" onChange={passChangeHandler} id="npassword" name="NPassword" placeholder="New Password" value={pass.NPassword} />
                                    </div>
                                    <div class="mt-3">
                                        <label>Confirm New Password</label>
                                        <input type="password" class="input w-full border mt-2" onChange={passChangeHandler} id="c_n_password" name="C_N_password" placeholder="Confirm New Password" value={pass.C_N_password} />
                                    </div>
                                    {err ?
                                        <div className="intro-x flex-items-center text-red-700 mt-5">
                                            {err}
                                        </div>
                                        : ""}
                                    {pwChanged ?
                                        <div className="intro-x flex-items-center text-green-700 mt-5">
                                            {pwChanged}
                                        </div>
                                        : ""}
                                    <div class="flex justify-end mt-4">

                                        <button type="button" class="button bg-theme-1 text-white ml-auto" onClick={changePass}>Change Password</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- END: Change Password --> */}
                        </div>
                    </div>







                </div>
            </div>
            {renderMenu}


        </>
    )
}
let mapStateToProps = state => {
    return {
        auth: state.AuthReducer,
        deshboardStatus: state.DeshboardReducer


    }
}


export default connect(mapStateToProps, { getProfile, updateProfileGen, updateProfileBilling, changePasswordFromProfile, earningStatus })(Profile);