import React, { useState, useEffect } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, User, List, Download, Clipboard, TrendingUp } from 'react-feather';

import EventNoteIcon from '@material-ui/icons/EventNote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DateRangePicker from "dz-daterangepicker-material";
import "dz-daterangepicker-material/dist/index.css";

import { Link } from "react-router-dom";
import Cookies from 'js-cookie'

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux'
import history from '../utils/history'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { earningStatus } from '../../redux/actions/DeshboardAction'
import { getAllStatistics, getStatisticsByCustomDate } from '../../redux/actions/Statistics'
import { getAllWebsites } from '../../redux/actions/WebsitesAction'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrintButton from "./PDF";


const columns = [
    { id: 'date', label: `Date`, minWidth: 170 },
    { id: 'impressions', label: 'Impressions', minWidth: 100 },
    {
        id: 'eCPM',
        label: 'eCPM',
        minWidth: 170,

    },
    {
        id: 'revenue',
        label: 'Revenue',
        minWidth: 170,

    }
];


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
    container2: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
    },
    borderRight: {
        borderRight: "1px solid lightgrey",

    },
    listIcon: {
        display: 'inline-flex',
        position: "sticky",
        left: "25%"
    },
    listIcon2: {
        display: 'inline-flex',
        position: "sticky",
        left: "50%"
    },
    listIcon3: {
        display: 'inline-flex',
        position: "sticky",
        left: "75%"
    },
    listIcon4: {
        display: 'inline-flex',
        position: "sticky",
        left: "100%"
    },
    noteIcon: {
        display: "inline-flex",
        marginRight: 10,
    },
    downloadIcon: {
        display: "inline-flex"
    }
}))

function Billings(props) {

    let {
        getAllStatistics,
        statistics,
        earningStatus,
        deshboardStatus,
        getAllWebsites,
        websites,
        getStatisticsByCustomDate
    } = props



    const [showModal, setShowModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [stats, setStatistics] = React.useState([]);
    const [showDateRange, setShow_date_range] = useState(false);
    const [allFilters, setFilters] = useState({
        website: null,
        day: null,
        custom_date: null
    });
    const [stats2, setStatistics2] = React.useState([]);
    const [allWebsites, setAllWebsites] = useState([]);
    const isMenuOpen = Boolean(anchorEl);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [date, setDate] = React.useState({
        startDate: new Date(),
        endDate: new Date()
    })

    const onChangeDate = (start, end) => {

        setDate({
            startDate: start,
            endDate: end,
        })
        console.log(new Date(start));

    }


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
        amount: null,
        type: null, // 1 for cashout and 2 for deposit
        userID: user._id
    })
    const onChangeHandler = e => {
        let name = e.target.name
        let value = e.target.value

        setState({
            ...state,
            [name]: value
        })
    }
    const submit = e => {
        e.preventDefault()
        setTimeout(() => {
            setShowModal(false)
        }, 2000);
    }
    useEffect(() => {
        getAllStatistics({ user_id: user.uuid })
        getAllWebsites({ userID: user._id })
    }, [])

    useEffect(() => {
        setStatistics(statistics.allStatistics)
        setStatistics2(statistics.allStatistics)
        setAllWebsites(websites.allWebsites)

    }, [statistics.allStatistics, websites.allWebsites])
    useEffect(() => {
        setStatistics(statistics.resultCustomDate)
    }, [statistics.resultCustomDate])


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ascending, setAscending] = React.useState(true);
    const [descending, setDescending] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [allEarningStatus, setEarningStatus] = useState([]);


    useEffect(() => {
        earningStatus({ userID: user._id })

    }, [])

    useEffect(() => {
        setEarningStatus(deshboardStatus.deshboard_status)

    }, [deshboardStatus.deshboard_status])



    const arrayChangeOrder = e => {

        if (ascending) {
            setStatistics(stats.reverse())
            setDescending(!descending)
            setAscending(!ascending)
        }
        if (descending) {
            setStatistics(stats.sort())
            setDescending(!descending)
            setAscending(!ascending)
        }
    }


    const changeFilter = e => {
        let name = e.target.name
        let value = e.target.value
        if (value == "custom Date") {
            setShow_date_range(true)
        }
        setFilters({
            ...allFilters,
            [name]: value
        })

    }


    const clickToGenerate = e => {
        e.preventDefault()

        let {
            website,
            day,
            custom_date,
        } = allFilters

        if (website == "Select Website" && day == "5 days") {
            console.log("Works");
            setStatistics(stats2)
            return true
        }
        if (website && day) {
            filterWeb_Domain(website, day)
        }

        if (website && !day) {
            let array = stats2.filter((item) => {
                return item.domain_uuid == website
            })
            setStatistics(array)
        }
        if (!website && day) {
            filtyByDay(day)
        }




    }

    const filterWeb_Domain = (website, day) => {

        if (day == "today") {
            let date = new Date()
            let fullDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
            let array

            array = stats2.filter((item) => {
                return item.date == fullDate && item.domain_uuid == website
            })


            setStatistics(array)
            return
        }
        if (day == "yesterday") {
            let date = new Date()
            let fullDate = date.getMonth() + 1 + "/" + (date.getDate() - 1) + "/" + date.getFullYear()
            let array

            array = stats2.filter((item) => {
                return item.date == fullDate && item.domain_uuid == website
            })
            setStatistics(array)
            return
        }
        if (day == "7 days") {

            let arr2 = []
            for (let index = 7; index >= 0; index--) {

                let date = new Date()
                let fullDate = date.getMonth() + 1 + "/" + (date.getDate() - index) + "/" + date.getFullYear()
                let array

                array = stats2.filter((item) => {
                    return item.date == fullDate && item.domain_uuid == website
                })

                arr2.push(...array)
                setStatistics(arr2)

            }
            return
        }
        if (day == "30 days") {
            let arr2 = []
            for (let index = 30; index >= 0; index--) {

                let date = new Date()
                let fullDate = date.getMonth() + 1 + "/" + (date.getDate() - index) + "/" + date.getFullYear()
                let array

                array = stats2.filter((item) => {
                    return item.date == fullDate && item.domain_uuid == website
                })
                arr2.push(...array)
                setStatistics(arr2)

            }
            return
        }
        if (day == "5 days") {
            let arr2 = []
            for (let index = 5; index >= 0; index--) {

                let date = new Date()
                let fullDate = date.getMonth() + 1 + "/" + (date.getDate() - index) + "/" + date.getFullYear()
                let array = stats2.filter((item) => {
                    return item.date == fullDate
                })
                arr2.push(...array)
                setStatistics(arr2)

            }
            return
        }
        if (day == "custom Date") {

            getStatisticsByCustomDate({ firstDate: new Date(date.startDate), secondDate: new Date(date.endDate), userID: user.uuid, domain_uuid: website })
        }
    }
    const filtyByDay = (day) => {

        if (day == "today") {
            let date = new Date()
            let month = date.getMonth() + 1
            let justDate = date.getDate()
            let year = date.getFullYear()
            let fullDate = year + "-" + "0" + month + "-" + justDate
            let array

            array = stats2.filter((item) => {
                let date = item.created_at.slice(0, 10)
                return date == fullDate
            })


            let result = [...array]
            setStatistics(result)
        }
        if (day == "yesterday") {
            let date = new Date()
            let month = date.getMonth() + 1
            let justDate = date.getDate()
            let year = date.getFullYear()
            let fullDate = year + "-" + "0" + month + "-" + (justDate - 1)
            let array
            array = stats2.filter((item) => {
                let date = item.created_at.slice(0, 10)
                return date == fullDate
            })


            let result = [...array]
            setStatistics(result)
        }
        if (day == "7 days") {

            let arr2 = []
            for (let index = 7; index >= 0; index--) {

                let date = new Date()
                let month = date.getMonth() + 1
                let justDate = date.getDate()
                let year = date.getFullYear()
                let fullDate = year + "-" + "0" + month + "-" + (justDate - index)
                let array
                array = stats2.filter((item) => {
                    let date = item.created_at.slice(0, 10)
                    return date == fullDate
                })


                arr2.push(...array)
                setStatistics(arr2)

            }
        }
        if (day == "30 days") {
            let arr2 = []
            for (let index = 30; index >= 0; index--) {

                let date = new Date()
                let month = date.getMonth() + 1
                let justDate = date.getDate()
                let year = date.getFullYear()
                let fullDate = year + "-" + "0" + month + "-" + (justDate - index)
                let array
                array = stats2.filter((item) => {
                    let date = item.created_at.slice(0, 10)
                    return date == fullDate
                })


                arr2.push(...array)
                setStatistics(arr2)

            }
        }
        if (day == "5 days") {
            let arr2 = []
            for (let index = 5; index >= 0; index--) {

                let date = new Date()
                let fullDate = date.getFullYear() + "-" + "0" + date.getMonth() + "-" + date.getDate()
                let array = stats2.filter((item) => {
                    let date = item.created_at.slice(0, 10)
                    return date == fullDate
                })
                arr2.push(...array)
                setStatistics(arr2)

            }
        }
        if (day == "custom Date") {

            getStatisticsByCustomDate({ firstDate: new Date(date.startDate), secondDate: new Date(date.endDate), userID: user.uuid })
        }

    }

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
                                <Link to="/website-page" className="menu ">
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
                            <li>
                                <Link to="/statistics" className="menu menu--active">
                                    <div className="menu__icon"> <Users /></div>
                                    <div className="menu__title"> Statistics </div>
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
                            <Link to="/statistics" className="side-menu  side-menu--active ">
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



                    <div class="pos intro-y grid grid-cols-12 gap-5 mt-10">
                        <div class="intro-y col-span-12 lg:col-span-8 sm:col-span-8 overflow-scroll lg:overflow-hidden box">
                            <h2 class="text-lg font-medium mr-auto mb-5 py-10 px-10">
                                Publisher / <b>Reports</b>
                            </h2>
                            <div className="intro-y ml-10 mr-4 mb-20">

                                <Paper className={classes.root}  >
                                    <TableContainer className={classes.container} id="pdfdiv" >
                                        <Table stickyHeader aria-label="sticky table" >
                                            <TableHead>
                                                <TableRow>

                                                    <TableCell align="center" className={classes.borderRight}>Date <List className={classes.listIcon} onClick={arrayChangeOrder} /></TableCell>
                                                    <TableCell align="center" className={classes.borderRight}>Impressions <List className={classes.listIcon2} onClick={arrayChangeOrder} /></TableCell>
                                                    <TableCell align="center" className={classes.borderRight}>eCPM <List className={classes.listIcon3} onClick={arrayChangeOrder} /></TableCell>
                                                    <TableCell align="center">Revenue <List className={classes.listIcon4} /></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {stats.length > 0 ? stats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                    return (

                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align="center">
                                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })
                                                    :
                                                    <TableRow hover role="checkbox" tabIndex={-1}>

                                                        <TableCell align="center" colspan={4}>
                                                            No item Available
                                                        </TableCell>

                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[7, 10, 25, 100]}
                                        component="div"
                                        count={stats.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Paper>



                            </div>
                        </div>
                        <div class="intro-y col-span-12 lg:col-span-4 sm:col-span-4 overflow-scroll lg:overflow-hidden ">

                            <div class="intro-y box">

                                <div class="p-5" id="vertical-form">
                                    <div class="preview">
                                        <div className="mt-5">
                                            <label class="py-5">Select Website</label>
                                            <div class="preview mt-2">
                                                <select data-hide-search="true" class="select2 w-full shadow-lg items-center px-4 py-4 border rounded-md outline-none" onChange={changeFilter} name="website">
                                                    <option value={null}>Select Website</option>
                                                    {allWebsites.length > 0 ? allWebsites.map((item, key) => {
                                                        if (item.status == 2) {
                                                            return <option value={item.uuid} key={key}>{item.domain_url}</option>
                                                        }
                                                    })
                                                        :
                                                        <option value={null} defaultChecked>No Website Added</option>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label class="py-5">Report By</label>
                                            <div class="preview mt-2">
                                                <select data-hide-search="true" class="select2 w-full shadow-lg items-center px-4 py-4 border rounded-md outline-none" onChange={changeFilter} name="day">

                                                    <option defaultChecked value="5 days">Breakdown by day</option>
                                                    <option value="today">By Today</option>
                                                    <option value="yesterday">By Yesterday</option>
                                                    <option value="7 days">By last 7 days</option>
                                                    <option value="30 days">By last 30 days</option>
                                                    <option value="custom Date">Custom Date</option>

                                                </select>
                                            </div>
                                        </div>
                                        {showDateRange ?
                                            <div className="mt-5">
                                                <label class="py-5">Report By Custom Date</label>
                                                {/* <input type="date" class="input w-full border mt-2" placeholder="Date" /> */}

                                                <DateRangePicker
                                                    startDate={date.startDate}
                                                    endDate={date.endDate}
                                                    onChange={onChangeDate}
                                                    startWeek={'monday'}
                                                    onlyView={false}
                                                    datePicker={false}
                                                    textFieldProps={{ label: null, className: "w-full mt-4 rounded-md border bg-white outline-none shadow-lg " }}
                                                    popoverProps={{}}
                                                    label={false}
                                                />
                                            </div>
                                            : null
                                        }
                                        <div className="flex justify-between">
                                            <div class="text-center"> <a href="javascript:;"
                                                onClick={clickToGenerate}
                                                class="button inline-block bg-theme-1 text-white mt-10 mb-5 w-48 text-base btn-success">
                                                <EventNoteIcon className={classes.noteIcon} />
                                                Generate Report</a> </div>
                                            <div class="text-center"> <a href="javascript:;" class="button inline-block bg-theme-1 text-white mt-10 mb-5 w-48 text-base btn-light">

                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download download_icon"
                                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z" />
                                                    <path fill-rule="evenodd"
                                                        d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z" />
                                                    <path fill-rule="evenodd"
                                                        d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z" />
                                                </svg>

                                                Download
                                                <ExpandMoreIcon className={classes.chevronIcon} />

                                            </a> </div>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            Reports are updated every 10 minutes!
                                        </div>

                                    </div>

                                </div>
                            </div>


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
                                                id="grid-state" name="type" onChange={onChangeHandler} >
                                                <option defaultValue>Select Type</option>
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

        </>
    )
}
let mapStateToProps = state => {
    return {
        deshboardStatus: state.DeshboardReducer,
        statistics: state.Statistics,
        websites: state.WebsiteReducer,
    }
}


export default connect(mapStateToProps, { getAllStatistics, earningStatus, getAllWebsites, getStatisticsByCustomDate })(Billings);