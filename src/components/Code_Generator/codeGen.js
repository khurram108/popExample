import React, { useState, useEffect } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, User, TrendingUp, Clipboard, HelpCircle } from 'react-feather';
import { Link } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { addWebsite, getAllWebsites } from '../../redux/actions/WebsitesAction'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import history from '../utils/history'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { earningStatus } from '../../redux/actions/DeshboardAction'




function CodeGen(props) {


    const {
        websites,
        addWebsite,
        getAllWebsites,
        earningStatus,
        deshboardStatus
    } = props

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [allWebsites, setAllWebsites] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    let user = JSON.parse(Cookies.get("user"))
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

    useEffect(() => {
        getAllWebsites({ userID: user._id })
    }, [])

    const [state, setState] = useState({
        url: null,
        uuid: null
    })
    useEffect(() => {
        console.log(websites.allWebsites);
        setAllWebsites(websites.allWebsites)
        setState(websites.allWebsites[0] ? websites.allWebsites[0].domain_url : null);
    }, [websites.allWebsites])

    console.log(allWebsites);

    const [url, setURL] = useState(null)
    const [urlUuid, setUrlUuid] = useState(null)
    const [error, setError] = useState(null)

    const getURL = e => {
        let name = e.target.name
        let value = e.target.value
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option = optionElement.getAttribute('data-uuid');
        setError(null)
        setUrlUuid(option)
        setState(value)
    }


    const onGenerateLink = e => {
        let url4code = allWebsites.filter(item => {
            return item.domain_url == state
        })
        let website = url4code[0]
        if (website.status == 2) {
            console.log("verified");

            if (state) {

                let scriptCode = `
            <script type="application/javascript" src="https://api.ipify.org?format=json"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script>
            const metas = document.getElementsByTagName('meta');
            let webuuid = null;
            for (let i = 0; i < metas.length; i++) { 
                if (metas[i].getAttribute('name') === "popexample") {
                    console.log(metas[i].getAttribute('content'));
                    webuuid = metas[i].getAttribute('content'); 
                    let action = 0; 
                    document.addEventListener("click",()=>{ 
                        var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"; if(action === 0){
                         window.open("http://ewdtech.com/?by=${user.uuid}", "_blank"); action++ } }, false) } } 
                        
                         
                            function ipLookUp() {
                                $.ajax('http://ip-api.com/json')
                                    .then(
                                        function success(response) {
                                            
                                            let url = new URLSearchParams(window.location.search);
                                            let by = url.get("by");
                                            let date = new Date();
                                            let fullDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                                            $.ajax('http://ewdtech.com:5656/routes/get_user_impression', {
                                                type: 'POST', 
                                                data: {
                                                    country: response.country,
                                                    countryCode: response.countryCode,
                                                    date: fullDate,
                                                    webUuid: webuuid,
                                                    by: by
                                                },
                                                success: function (data, status, xhr) {
                                                    console.log(status + " is here <= ," + data + " data is here =>");
                                                }
                                            });
                                        }, function fail(data, status) {
                                            console.log('Request failed. Returned status of', status);
                                        });
                            } ipLookUp() 
                        
                         </script> 
                          `
                setURL(scriptCode)
            } else {
                setError("Please Select any Website.")
            }

        } else {
            setError("Website is not verified yet. Please add the meta tag in your website and request to admin for verification.")

        }
    }


    const copyCode = e => {
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

    console.log(allEarningStatus);

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
                            <Link to="/code-gen" className="side-menu  side-menu--active">
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

                    <div class="intro-y flex grid grid-cols-12 sm:flex-row items-center mt-8 z-10">


                        <div
                            class="intro-y col-span-12 sm:col-span-12 lg:col-span-8 md:col-span-8 py-4 px-4 bg-white lg:mr-10 sm:mr-0">
                            <h2 class="text-lg font-medium mr-auto ml-5 mt-5">
                                Generate Code
                         </h2>
                            <div class="lg:col-span-12 sm:col-span-4 flex w-full">
                                <div class="relative w-full sm:mr-0 lg:mr-6 sm:col-span-12 col-span-12 block">

                                    <div class="preview mt-6 ml-5 ">
                                        <select data-hide-search="true" class="select2 w-full shadow-lg items-center px-5 py-5 border rounded-md outline-none" onChange={getURL} name="url">
                                            <option value={null} defaultChecked>Select Website</option>
                                            
                                            {allWebsites.length > 0 ? allWebsites.map((item, key) => {
                                                return <option value={item.domain_url} data-uuid={item.uuid} key={key}>{item.domain_url}</option>
                                            })
                                                :
                                                <option value={null} defaultChecked>No Website Added</option>
                                            }

                                        </select>
                                    </div>

                                </div>


                                <button
                                    class="button bg-gray-200  w-48 items-center mt-5 ml-5 zoom-in shadow-lg sm:col-span-12 col-span-12 bflex sm:hidden md:block lg:block xl:flex"
                                    onClick={onGenerateLink}>
                                    <Code class="w-5 h-5 mr-2 inline" /> Generate Code
                                </button>
                            </div>
                            {error ?
                                <div className="intro-x flex-items-center text-red-700 mt-5 ml-5">
                                    {error}
                                </div>
                                : ""}
                        </div>


                    </div>


                    <div class="intro-y grid grid-cols-12 mt-5">

                        <div class="intro-y col-span-12 sm:col-span-12 lg:col-span-8 xxl:col-span-8 bg-white lg:mr-10 sm:mr-0">

                            <div class="col-span-12 mt-8 mb-8 overflow-hidden">
                                <h2
                                    class="text-lg col-span-12 w-full font-medium ml-5 mt-16 border-yellow-200  py-5 px-5 block">
                                    Your Embedable Code
                                </h2>
                                <div className="w-full flex">

                                    <div className="mr-4 ml-10 border rounded px-4 py-5 w-full">
                                        {url}
                                    </div>
                                </div>
                                <CopyToClipboard text={url}
                                    onCopy={copyCode}
                                >
                                    <button
                                        class="button bg-gray-200 ml-auto py-5 mb-4 items-center mt-5 ml-4 h-auto zoom-in shadow-lg sm:col-span-12 col-span-12 flex sm:hidden md:block lg:block xl:flex mr-4"
                                        onClick={copyCode}>
                                        <Clipboard class="w-5 h-5 mr-2 inline" /> Copy
                                    </button>
                                </CopyToClipboard>
                            </div>



                        </div>
                        <div
                            class="intro-y col-span-12 sm:col-span-12 lg:col-span-4 md:col-span-4 py-4 px-4 bg-white lg:mr-10 sm:mr-0">
                            <h2 class="text-lg font-medium mr-auto ml-5 mt-5 flex">
                                Instructions to integrate the Code. <HelpCircle className="ml-auto" />
                            </h2>
                            <div class="text-sm font-small ml-0 lg:ml-5 col-span-12 lg:col-span-6 sm:col-span-12 py-10 bg-white">

                                The code must be inserted at right before the  <b> {`</body>`} </b> body closing tag in order to work properly. <br />
                                <br />
                                <span className="py-5">
                                    Please insert the javascript code only on the registered domain otherwise your impressions will not be counted.
                                   </span>

                            </div>
                            <div className="flex flex-col xl:flex-row xl:items-center justify-end" >

                                <div class="text-center">
                                    <Link to="/reports" class="button inline-block bg-theme-1 text-white mt-10 mb-5 w-48 text-base">
                                        See All Reports
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div
                class="dark-mode-switcher shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
                <div class="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
                <input class="input input--switch border" type="checkbox" value="1" />
            </div> */}
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
        websites: state.WebsiteReducer,
        deshboardStatus: state.DeshboardReducer
    }
}


export default connect(mapStateToProps, { addWebsite, getAllWebsites, earningStatus })(CodeGen);