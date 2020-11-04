import React, { useState, useEffect } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, PlusCircle, User, TrendingUp, X, RefreshCcw, ChevronUp, DollarSign, Monitor, Calendar, ChevronDown, MoreHorizontal, Star, Bookmark } from 'react-feather';

import { Link } from "react-router-dom";
import Cookies from 'js-cookie'

import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { addCashout, getAllCashouts } from '../../redux/actions/CashoutAction'
import { connect } from 'react-redux'
import history from '../utils/history'
import isEmpty from 'is-empty'
import { earningStatus } from '../../redux/actions/DeshboardAction'

function Billings(props) {

    let {
        getAllCashouts,
        addCashout,
        cashout,
        error,
        earningStatus,
        deshboardStatus
    } = props


    const [err, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [deposit, setDepost] = useState(false);
    const [withdraw, setWithdraw] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [cashouts, setCashouts] = useState([]);

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


    const [formErr, setFromErr] = useState(null)
    const [successRequest, setSuccessRequest] = useState(null)
    const [depositMsg, setDepositMsg] = useState(null)
    const [state, setState] = useState({
        amount: null,
        type: null, // 1 for cashout and 2 for deposit
        userID: user._id
    })

    const onChangeHandler = (e, type) => {
        let name = e.target.name
        let value = e.target.value
        if (type == "deposit") {
            setState({
                ...state,
                [name]: value,
                type: 2
            })
        }
        if (type == "withdraw") {
            setState({
                ...state,
                [name]: value,
                type: 1
            })
        }
        console.log(state);
    }

    const submit = e => {
        e.preventDefault()
        console.log(state.type);
        if (!isEmpty(state.amount) && state.type !== "Select Type") {
            addCashout(state)
            setState({
                ...state,
                amount: null,
                type: null

            })

        } else {
            setFromErr("Amount is required!")
            setTimeout(() => {
                setFromErr(null)
            }, 7000);
        }
    }

    useEffect(() => {
        getAllCashouts({ userID: user._id })
    }, [])

    useEffect(() => {
        setCashouts(cashout.allCashouts)
        if (cashout.add_success_msg) {
            setSuccessRequest(cashout.add_success_msg)
            setTimeout(() => {
                setSuccessRequest(null)
            }, 7000);

        }
        if (cashout.deposit_msg) {
            setDepositMsg(cashout.deposit_msg)
            setTimeout(() => {
                setDepositMsg(null)
            }, 7000);

        }
    }, [cashout.allCashouts, cashout.add_success_msg, cashout.deposit_msg])

    useEffect(() => {

        setError(error.cashout_fail)

    }, [error.cashout_fail])

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
                            <Link to="/" className="side-menu">
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
                            <Link to="/billing" className="side-menu side-menu--active ">
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
                            ${allEarningStatus.length > 0 ? allEarningStatus[0].available_balance.toFixed(2) : 0.00}
                        </div>

                        <div class="intro-x dropdown w-8 h-8 relative">
                            <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                                <img alt="Midone Tailwind HTML Admin Template" src={require("../../assets/images/profile-10.png")} onClick={handleProfileMenuOpen} />
                            </div>

                        </div>
                    </div>
                    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 class="text-lg font-medium mr-auto">
                            Billing
                    </h2>
                        {/* <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                            <a href="javascript:;" data-toggle="modal" data-target="#new-order-modal" class="button flex text-white bg-theme-1 shadow-md mr-2 btn-success" onClick={() => setDepost(true)}>
                                <PlusCircle className="mr-2 h-5" />    Deposit</a>

                        </div> */}
                        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                            <a href="javascript:;" data-toggle="modal" data-target="#new-order-modal" class="button text-white flex bg-theme-1 shadow-md mr-2" onClick={() => setWithdraw(true)}>
                                <CreditCard className="mr-2 h-5" />
                            Cash Out</a>

                        </div>
                    </div>


                    <div class="pos intro-y grid grid-cols-12 gap-5 mt-10">
                        <div class="intro-y col-span-12 lg:col-span-12 sm:col-span-12 overflow-scroll lg:overflow-hidden">

                            <table class="intro-y box w-full">
                                <thead class="border px-4 py-2">
                                    <tr>
                                        <th class="border px-4 py-2 w-40 h-16">ID</th>
                                        <th class="border px-4 py-2">Date</th>
                                        <th class="border px-4 py-2">Type</th>
                                        <th class="border px-4 py-2">Amount</th>
                                        <th class="border px-4 py-2">Requested To</th>
                                        <th class="border px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cashouts.length > 0 ? cashouts.map((item, key) => {
                                        return <tr key={key}>
                                            <td class="border px-4 py-2">{item.uuid}</td>
                                            <td class="border px-4 py-2">{item.created_at.slice(0, 10)}</td>
                                            <td class="border px-4 py-2">{item.type === 1 ? "Cashout" : "Deposit"}</td>
                                            <td class="border px-4 py-2">${item.amount}</td>
                                            <td class="border px-4 py-2">{item.requested_to} </td>
                                            <td class="border px-4 py-2">{item.status == 1 ? "Pending" : "Approved"}</td>
                                        </tr>
                                    }) :
                                        <tr>
                                            <th class="border px-4 py-2 w-40" colspan='6'>History is empty.</th>

                                        </tr>
                                    }



                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div>
            {renderMenu}
            <>

                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                        >
                            <div class="bg-white border ">
                                <div class="flex items-center px-10 py-10 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                                    <h2 class="font-medium text-base mr-auto">
                                        Cash Out
                                    </h2>
                                </div>
                                <div class="p-10 grid grid-cols-12 gap-4 row-gap-3">
                                    <div class="col-span-12">
                                        <label>Amount</label>
                                        <input type="text" class="input w-full border mt-2 flex-1" placeholder="$ Amount" name="amount" onChange={onChangeHandler} />
                                    </div>
                                    <div class="col-span-12">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                            Type
                                        </label>
                                        <div class="relative">
                                            <select
                                                class="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-state"
                                                name="type"
                                                onChange={onChangeHandler}
                                            >
                                                <option defaultValue >Select Type</option>
                                                <option value="1">Cash out</option>
                                                <option value="2">Deposit</option>
                                            </select>
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {formErr ?
                                        <div className="col-span-12 text-green-600 text-sm intro-y">
                                            {formErr}
                                        </div>
                                        : null}
                                    {err ?
                                        <div class="intro-y flex flex-col sm:flex-row items-center mt-5">
                                            <h2 class="text-lg font-medium mr-auto">
                                            </h2>
                                            <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                                                <p className="w-full flex mr-10 font-bold text-base text-red-600">
                                                    {err}
                                                </p>
                                            </div>
                                        </div>

                                        : null}
                                </div>
                                <div class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                    <button type="button" data-dismiss="modal" class="button w-32 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" class="button w-32 bg-theme-1 text-white ml-4" onClick={submit}>Send Request</button>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>


            <>

                {deposit ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "

                        >
                            <div class="bg-white intro-y w-50-rem">

                                <div class="grid grid-cols-12 ">
                                    <div class="col-span-12 lg:col-span-12 xxl:col-span-12 mb-3 bg-gray-200 p-4 " >
                                        <div className="ml-auto  absolute right-10px top-5px" title="Close" onClick={() => {
                                            setDepost(false)
                                            setState({
                                                ...state,
                                                amount: null,
                                                type: null,
                                            })
                                        }}>
                                            <X
                                                className="text-black cursor-pointer" />

                                        </div>
                                        <h3 class="intro-y text-lg font-medium mt-2 ">
                                            Depost Fund
                                        </h3>
                                    </div>
                                    <div className="col-span-12 p-4">
                                        <div class="col-span-12 pb-4 text-base">
                                            Amount
                                        </div>
                                        <input type="number" value={state.amount} className="col-span-12 p-2 outline-none border rounded focus:outline-none w-64" placeholder="Amount" name="amount" onChange={(e) => onChangeHandler(e, "deposit")} />
                                    </div>
                                    {/* <div className="col-span-12 p-4">
                                        <div class="col-span-12 pb-4 text-base">
                                            Deposit from
                                        </div>

                                        <input type="radio" id="bitcoin"  value="" name="depost" className="col-span-12 p-2 outline-none border rounded focus:outline-none " placeholder="Amount" />
                                        <label htmlFor="bitcoin" className="ml-3">Bitcoins</label>
                                        <input type="radio" id="paypal" value="" name="depost" className="col-span-12 p-2 outline-none border rounded focus:outline-none ml-4" placeholder="Amount" />
                                        <label htmlFor="paypal" className="ml-3">Paypal</label>
                                    </div> */}


                                    {formErr ?
                                        <div className="col-span-12 text-red-600 p-4  text-sm intro-y">
                                            {formErr}
                                        </div>
                                        : null}
                                    {depositMsg ?
                                        <div className="col-span-12 text-green-600 p-4 text-sm intro-y">
                                            {depositMsg}
                                        </div>
                                        : null}


                                </div>
                                <div class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                

                                    <button type="button" class="button w-32 bg-theme-1 text-white " onClick={submit}>
                                        Send Request</button>

                                </div>

                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>
                    </>
                ) : null}
            </>
            <>

                {withdraw ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "

                        >
                            <div class="bg-white intro-y w-50-rem">

                                <div class="grid grid-cols-12 ">
                                    <div class="col-span-12 lg:col-span-12 xxl:col-span-12 mb-3 bg-gray-200 p-4 " >
                                        <div className="ml-auto  absolute right-10px top-5px" title="Close" onClick={() => {
                                            setWithdraw(false)
                                            setState({
                                                ...state,
                                                amount: null,
                                                type: null,
                                            })
                                        }}>
                                            <X
                                                className="text-black cursor-pointer" />

                                        </div>
                                        <h3 class="intro-y text-lg font-medium mt-2 ">
                                            Withdraw Fund
                                        </h3>
                                    </div>
                                    <div className="col-span-12 p-4">
                                        <div class="col-span-12 pb-4 text-base">
                                            Amount
                                        </div>

                                        <input type="number" value={state.amount} className="col-span-12 p-2 outline-none border rounded focus:outline-none w-64" placeholder="Amount" name="amount" onChange={(e) => onChangeHandler(e, "withdraw")} />
                                    </div>


                                    {formErr ?
                                        <div className="col-span-12 text-red-600 p-4  text-sm intro-y">
                                            {formErr}
                                        </div>
                                        : null}
                                    {err ?

                                        <div className="col-span-12 text-red-600 p-4  text-sm intro-y">
                                            {err}
                                        </div>

                                        : null}
                                    {successRequest ?
                                        <div className="col-span-12 text-green-600 p-4 text-sm intro-y">
                                            {successRequest}
                                        </div>
                                        : null}


                                </div>
                                <div class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                    {/* <button type="button" data-dismiss="modal"
                                        class="button w-30 lg:w-32 sm:w-30 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1" >Cancel</button> */}

                                    <button type="button" class="button w-32 bg-theme-1 text-white " onClick={submit}>
                                        Send Request</button>

                                </div>

                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>
                    </>
                ) : null}
            </>


        </>
    )
}
let mapStateToProps = state => {
    return {
        cashout: state.CashoutReducer,
        error: state.ErrorReducer,
        deshboardStatus: state.DeshboardReducer

    }
}


export default connect(mapStateToProps, { addCashout, getAllCashouts, earningStatus })(Billings);