import React, { useState, useEffect } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, ChevronRight, User, TrendingUp, Clipboard, RefreshCcw, ChevronUp, DollarSign, Monitor, Calendar, ChevronDown, MoreHorizontal, Star, Bookmark, HelpCircle, AlertTriangle } from 'react-feather';
import { Link } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { addWebsite, getAllWebsites, changeStatusTo } from '../../redux/actions/WebsitesAction'
import { connect, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import history from '../utils/history'
import { earningStatus } from '../../redux/actions/DeshboardAction'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import $ from 'jquery'


const category = [
    "Automotive / Auto",
    "Arts",
    "Blog / Chat / Forum",
    "Business / Finance",
    "Children",
    "Classifieds",
    "Computers",
    "Diet / fitness",
    "Downloads",
    "Education",
    "Entertainment",
    "Family",
    "Flowers / Greetings",
    "Gambling / Casino",
    "Games",
    "Health",
    "Hobbies / leisure / Special Interests",
    "Home / Gardening",
    "Image Sharing/Hosting",
    'IT/Webmasters',
    "Music",
    "Men ",
    "Movies",
    "News",
    'Other',
    "Pets",
    "Real Estat",
    "Religion/spirituality",
    "Restaurant / food",
    "Science / technology",
    "Search",
    "Shopping",
    "Social Networking",
    "Sports",
    "Streaming / video",
    "Style / fashion",
    "Television",
    "Travel",
]



function Website(props) {

    const { websites, addWebsite, getAllWebsites,
        earningStatus,
        deshboardStatus,
        changeStatusTo } = props

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [allWebsites, setAllWebsites] = useState([]);
    const [invalidURL, setInvalidURL] = useState();
    const [agreementError, setOtherErr] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [showModal, setShowModal] = useState(false);
    const [showModalAgreeMent, setShowModalAgreeMent] = useState(false);
    const [metaTag, setMetaTag] = useState(false);
    const [copiedSuccess, setCopiedSuccess] = useState(false);
    const [metaTagError, setMetaTagError] = useState(null);
    const [metaDetail, setMetaDetail] = useState(
        `  <meta name="popexample" content="32165498721" />` // content will be website id
    );
    const [agreement, setAgreement] = useState(false);

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
    let user = JSON.parse(Cookies.get("user"))

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
        domain_url: "",
        domain_category: null,
        agree: true,
        userID: user._id
    });

    const onChangeHandler = e => {
        let name = e.target.name
        let value = e.target.value

        if (name == "agree") {
            setAgreement(e.target.checked)
            return true
        }
        if (!value.startsWith("http") || !value.startsWith("http")) {
            value = "http://" + value
        }
        setState({
            ...state,
            [name]: value
        })

    }
    const openAgree = e => {
        e.preventDefault()


        if (state.domain_url.length > 0) {


            if (state.domain_category) {

                setShowModalAgreeMent(true)

            } else if (state.domain_category == null || state.domain_category == "") {
                setInvalidURL("Please Select Domain Category")
                setTimeout(() => {
                    setInvalidURL(null)
                }, 2000);
            }
        } else {
            setInvalidURL("URL field is required")
            setTimeout(() => {
                setInvalidURL(null)
            }, 2000);
        }



    }

    const addNewWebsite = e => {
        e.preventDefault()



        // if (state.domain_url.includes(".com") || state.domain_url.includes(".org") || state.domain_url.includes(".ru") || state.domain_url.includes(".net") || state.domain_url.includes(".in")) {
        if (agreement) {

            addWebsite(state)


            setTimeout(() => {
                setShowModal(false)
                setShowModalAgreeMent(false)
            }, 1000);
        } else {
            setOtherErr("Please mark as 'I agree' with the terms and condition.")
            setTimeout(() => {
                setOtherErr(null)
            }, 3000);
        }
        // }

    }


    useEffect(() => {
        getAllWebsites({ userID: user._id })
    }, [])

    useEffect(() => {
        setAllWebsites(websites.allWebsites)
        if (websites.currentWebsite) {
            setMetaDetail(`<meta name="popexample" content="${websites.currentWebsite.uuid}" />`)
            setMetaTag(true)
        }

    }, [websites.allWebsites, websites.currentWebsite])

    const [allEarningStatus, setEarningStatus] = useState([]);


    useEffect(() => {
        earningStatus({ userID: user._id })
    }, [])

    useEffect(() => {
        setEarningStatus(deshboardStatus.deshboard_status)

    }, [deshboardStatus.deshboard_status])


    const checkMetaTag = (url) => {

        $.get(`https://cors-anywhere.herokuapp.com/${url}`, function (data) {

            var meta = $(data).filter('meta[name="popexample"]').attr("content");
            console.log(meta)
            let website = allWebsites.filter((item) => {
                return item.uuid == meta
            })
            console.log(website);
            if (website.length > 0) {
                changeStatusTo({ _id: website[0]._id })
            }
            if (website.length == 0) {
                setMetaTagError("Please Add Meta tag in your website.")
                setTimeout(() => {
                    setMetaTagError(null)

                }, 2000);
            }

        });

    }

    const openMetaTag = uuid => {
        setMetaDetail(`<meta name="popexample" content="${uuid}">`)
        setMetaTag(true)
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
            {/* <!-- END: Mobile Menu --> */}
            <div class="flex">
                {/* <!-- BEGIN: Side Menu --> */}
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
                            <Link to="/website-page" className="side-menu  side-menu--active">
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
                    <div class="grid grid-cols-12 gap-6 mt-8">
                        <div class="col-span-12 lg:col-span-10 xxl:col-span-10">
                            <h2 class="intro-y text-lg font-medium mr-auto mt-2">
                                Websites
                    </h2>
                        </div>
                        <div class="col-span-12 lg:col-span-2 xxl:col-span-2 ml-30">
                            <a href="#" data-toggle="modal" data-target="#new-website-modal"
                                class="button text-white bg-theme-1 shadow-md mr-2" type="button" onClick={() => setShowModal(true)}>Add Website</a>
                        </div>
                        <div class="col-span-12 md:col-span-12 lg:col-span-12 xxl:col-span-12  overflow-hidden lg:overflow-hidden sm:overflow-scroll">
                            <table class="bg-white w-full ">
                                <thead class="border px-4 py-2">
                                    <tr>
                                        <th class="border px-4 py-2 w-40">ID</th>
                                        <th class="border px-4 py-2">Domain</th>
                                        <th class="border px-4 py-2">Category</th>
                                        <th class="border px-4 py-2">Status</th>
                                        <th class="border px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {allWebsites.length > 0 ?
                                        allWebsites.map((item, key) => {

                                            return <tr key={key}>
                                                <td class="border px-4 py-2">{item.uuid}</td>
                                                <td class="border px-4 py-2">{item.domain_url}</td>
                                                <td class="border px-4 py-2">{item.domain_category}</td>
                                                <td class={`border px-4 py-2 cursor-pointer ${item.status === 1 ? 'text-red-600' : "text-green-500"}`} onClick={() => {
                                                    openMetaTag(item.uuid)
                                                }} title="See Meta Tag">{item.status === 1 ? "Not Verified" : "Verified"}</td>
                                                <td class="border px-4 py-2">
                                                    <div class="w-full sm:w-auto flex">
                                                        <div class="dropdown relative">
                                                            <button class="dropdown-toggle button px-2 bg-gray-200 box text-gray-700 dark:text-gray-300" disabled={item.status === 1 ? false : true} onClick={() => {
                                                                checkMetaTag(item.domain_url)
                                                            }}>
                                                                <span class=" flex items-center justify-center"> Click to Verify</span>
                                                            </button>
                                                            <div class="dropdown-box mt-10 absolute w-40 top-0 right-0 z-20">
                                                                <div class="dropdown-box__content box dark:bg-dark-1 p-2">
                                                                    <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="code" class="w-4 h-4 mr-2"></i> Get Code </a>
                                                                    <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="settings" class="w-4 h-4 mr-2"></i> Settings </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                        :
                                        <tr>
                                            <th class="border px-4 py-2 w-40" colspan='5'>No Website is added.</th>

                                        </tr>
                                    }


                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                {renderMenu}

            </div>

            <>

                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

                        >
                            <div class="bg-white">
                                <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                                    <h2 class="font-medium text-base mr-auto">
                                        Add New Website
                                    </h2>
                                </div>
                                <div class="p-5 grid grid-cols-12 gap-4 row-gap-3">
                                    <div class="col-span-12">
                                        <label>Domain URL</label>
                                        <input type="url" class="input w-full border mt-2 flex-1" placeholder="Domain URL" name="domain_url" onChange={onChangeHandler} />
                                    </div>
                                    <div class="col-span-12">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Category
                                        </label>
                                        <div class="relative">
                                            <select
                                                class="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-state" name="domain_category" onChange={onChangeHandler}>
                                                <option value="" selected>Select Category</option>
                                                {category.map((item, key) => {
                                                    return <option value={item} key={key}>{item}</option>
                                                })}
                                            </select>
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {invalidURL ? <div className="col-span-12 w-full text-red-700 mt-4 mb-4">
                                        {invalidURL}
                                    </div>
                                        : null}
                                </div>
                                <div class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                    <button type="button" data-dismiss="modal"
                                        class="button w-30 lg:w-32 sm:w-30 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" class="button w-32 bg-theme-1 text-white" onClick={openAgree}>Create Website</button>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
            <>

                {showModalAgreeMent ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "

                        >
                            <div class="bg-white">

                                <div class="p-5 grid grid-cols-12 gap-4 row-gap-3">


                                    <div class="col-span-12 border p-5">
                                        <li>  The website must not contain adult content.</li>
                                        <li> You must be the owner or adminstrator for the website.</li>
                                        <li>The website URL must not be a referral link for a website that you don't own.</li>
                                        <li>The content of the website must comply with moral and ethical norms of society.</li>
                                        <li>The website must not contain or have links to viruses, phishing or any sort of malicious software.</li>
                                        <li>The website must not contain any content that violates the intellectual property rights of another person, the legal owner of the content.</li>
                                        <li>The website must not instruct, prompt or deceive the visitor into clicking on adverts.</li>
                                        <li> Traffic to the website should be organic and not generated by any sort of automated traffic generation system or service.</li>
                                    </div>
                                    <div class="col-span-12">
                                        <label class="md:w-2/3 block text-gray-500 font-bold ml-2">
                                            <input class="mr-2 leading-tight" type="checkbox" name="agree" onChange={onChangeHandler} />
                                            <span class="text-sm">
                                                I agree my website not contain adult content!
                                                </span>
                                        </label>
                                    </div>
                                    {agreementError ? <div className="col-span-12 w-full text-red-700 mt-4 mb-4">
                                        {agreementError}
                                    </div>
                                        : null}

                                </div>
                                <div class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                    <button type="button" data-dismiss="modal"
                                        class="button w-30 lg:w-32 sm:w-30 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1" onClick={() => setShowModalAgreeMent(false)}>Cancel</button>
                                    <button type="button" class="button w-32 bg-theme-1 text-white" onClick={addNewWebsite}>I Agree!</button>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
            <>

                {metaTag ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "

                        >
                            <div class="bg-white intro-y w-50-rem">

                                <div class="grid grid-cols-12 ">
                                    <div class="col-span-12 lg:col-span-12 xxl:col-span-12 mb-3 bg-gray-200 p-4 " >
                                        <h3 class="intro-y text-lg font-medium mt-2 ">
                                            One more steps to verify your Website
                                        </h3>
                                    </div>
                                    <div class="col-span-12 mb-3 p-4 text-base">
                                        Add this meta-tag in the head tag of your website.
                                    </div>
                                    <div className="col-span-12 flex p-4">

                                        <input type="text" value={metaDetail} className="col-span-12 p-2 outline-none border rounded focus:outline-none w-full" />
                                    </div>
                                    <div class="col-span-12 mb-3 px-5 py-3 bg-gray-200 mr-4 ml-4 text-base ">
                                        <HelpCircle className="mr-2 inline h-8" /> If you have activated cloudflare protection, somtimes we may not be able to verify your ownership in such case please create a support ticket, do not remove the meta tag or file until we verify manually.
                                    </div>


                                </div>
                                <div class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                    <button type="button" data-dismiss="modal"
                                        class="button w-30 lg:w-32 sm:w-30 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1" onClick={() => setMetaTag(false)}>Cancel</button>
                                    <CopyToClipboard text={metaDetail} onCopy={() => {
                                        setMetaTag(false)
                                        setCopiedSuccess(true)
                                        setTimeout(() => {
                                            setCopiedSuccess(false)

                                        }, 2000);
                                    }}>

                                        <button type="button" class="button w-32 bg-theme-1 text-white "><Clipboard className="mr-4 inline" />
                                        Copy</button>
                                    </CopyToClipboard>
                                </div>

                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>
                    </>
                ) : null}
            </>
            <>

                {copiedSuccess ? (
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

            <>

                {metaTagError ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

                        >
                            <div className="bg-gray-200 border py-16 px-16 rounded-md text-base ">
                                <AlertTriangle className="mr-auto ml-auto mb-5 text-yellow-600" />

                                {metaTagError}

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


export default connect(mapStateToProps, { addWebsite, getAllWebsites, earningStatus, changeStatusTo })(Website);