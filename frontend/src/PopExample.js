import React, { useState, useEffect } from 'react';
import { BarChart2, Home, Globe, Code, CreditCard, Users, ChevronRight, User, TrendingUp, X, RefreshCcw, ChevronUp, DollarSign, Monitor, Calendar, ChevronDown, MoreHorizontal, Star, Bookmark, AlertTriangle } from 'react-feather';
import DateRangePicker from "dz-daterangepicker-material";
import "dz-daterangepicker-material/dist/index.css";
import { Link, withRouter } from "react-router-dom"
import { Line } from 'react-chartjs-2';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'js-cookie';
import history from './components/utils/history'
import { earningStatus } from './redux/actions/DeshboardAction'
import { connect, useSelector } from 'react-redux'


function App(props) {

  const {
    earningStatus,
    deshboardStatus
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newNotification, setNotification] = useState(Cookies.get("notification") ? Cookies.get("notification") : null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [date, setDate] = React.useState({
    startDate: new Date(2020, 4, 1),
    endDate: new Date(2020, 4, 10)
  })

  const onChange = (start, end) => {
    setDate({
      startDate: start,
      endDate: end,
    })
  }

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

  const [allEarningStatus, setEarningStatus] = useState([]);


  useEffect(() => {
    earningStatus({ userID: user._id })
  }, [])

  useEffect(() => {
    setEarningStatus(deshboardStatus.deshboard_status)

  }, [deshboardStatus.deshboard_status])

  console.log(allEarningStatus);

  const refreshBalance = e => {
    earningStatus({ userID: user._id })
  }

  const [state, setState] = useState(
    {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ],

    }
  )

  return (
    <div className="app ">

      <div className="mobile-menu md:hidden">
        <div className="mobile-menu-bar">
          <Link to="/" className="flex mr-auto">
            <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={require("./assets/images/logo.svg")} />
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
            <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={require("./assets/images/logo.svg")} />
            <span className="hidden xl:block text-white text-lg ml-3"> Pop<span className="font-medium">Example</span>
            </span>
          </Link>
          <div className="side-nav__devider my-6"></div>
          <ul>
            <li>
              <Link to="/" className="side-menu side-menu--active">
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
              <Link to="/profile" className="side-menu ">
                <div className="side-menu__icon">  <User /></div>
                <div className="side-menu__title"> Profile </div>
              </Link>
            </li>
            <li className="side-nav__devider my-6"></li>

          </ul>
        </nav>


        <div className="content">
          <div className="top-bar">
            <div className="-intro-x breadcrumb mr-auto hidden sm:flex"> </div>

            <div className="intro-x relative mr-3 sm:mr-6">

            </div>
            <div className="intro-x dropdown relative mr-auto sm:mr-6 text-base font-medium">
              ${allEarningStatus.length > 0 ? allEarningStatus[0].available_balance.toFixed(2) : 0.00}
            </div>
            <div className="intro-x dropdown w-8 h-8 relative">
              <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                <img alt="Midone Tailwind HTML Admin Template" src={require("./assets/images/profile-10.png")} onClick={handleProfileMenuOpen} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6">
              <div className="col-span-12 mt-8">
                <div className="intro-y flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    General Report
                            </h2>
                  <a href="#" className="ml-auto flex text-theme-1 dark:text-theme-10" onClick={refreshBalance}>
                    <RefreshCcw className="w-4 h-4 mr-3" /> Reload Data </a>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-5">
                  <div className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y">
                    <div className="report-box zoom-in">
                      <div className="box p-5">
                        <div className="flex">
                          <CreditCard className="report-box__icon text-theme-11" />


                        </div>
                        <div className="text-3xl font-bold leading-8 mt-6">${allEarningStatus.length > 0 ? allEarningStatus[0].available_balance.toFixed(2) : 0.00}</div>
                        <div className="text-base text-gray-600 mt-1">Available Balance</div>
                      </div>
                    </div>


                  </div>
                  <div className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y">
                    <div className="report-box zoom-in">
                      <div className="box p-5">
                        <div className="flex">
                          <DollarSign className="report-box__icon text-theme-10" />

                        </div>
                        <div className="text-3xl font-bold leading-8 mt-6">${allEarningStatus.length > 0 ? allEarningStatus[0].referral_earning.toFixed(2) : 0.00}</div>
                        <div className="text-base text-gray-600 mt-1">Referral Earning</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y">
                    <div className="report-box zoom-in">
                      <div className="box p-5">
                        <div className="flex">
                          <Monitor className="report-box__icon text-theme-12" />

                        </div>
                        <div className="text-3xl font-bold leading-8 mt-6">${allEarningStatus.length > 0 ? allEarningStatus[0].total_payout.toFixed(2) : 0.00}</div>
                        <div className="text-base text-gray-600 mt-1">Total Payout</div>
                      </div>
                    </div>
                  </div>


                  {newNotification ?
                    <>


                      <div className="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                        <div className="report-box zoom-in">
                          <div className="box p-5">
                            <div className="ml-auto  absolute right-10px top-5px" title="Close" onClick={() => {
                              setNotification(null)
                              Cookies.remove("notification")
                            }}>
                              <X
                                className="text-theme-6" />

                            </div>

                            <AlertTriangle className="report-box__icon text-theme-6 mr-5 inline" /> Congratulations! Your website is verified now.
                          </div>
                        </div>
                      </div>

                    </>
                    : null}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-12 mt-12">
                <div className="intro-y block sm:flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Report Filter
                  </h2>
                  <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 dark:text-gray-300 flex">

                    <DateRangePicker
                      startDate={date.startDate}
                      endDate={date.endDate}
                      onChange={onChange}
                      startWeek={'monday'}
                      onlyView={false}
                      datePicker={false}
                      textFieldProps={{}}
                      popoverProps={{}}
                    />

                    <div class="w-full sm:w-auto flex mt-4 sm:mt-0 ml-4 ">
                      <Link to="/reports" class="button text-white bg-theme-1 shadow-md mr-2 paddingTop" >Generate Report</Link>
                    </div>

                  </div>
                </div>
                <div className="intro-y box p-5 mt-12 sm:mt-5 ">

                  <div className="flex flex-col xl:flex-row xl:items-center justify-end" >

                    <div className="w-80 md:w-80 px-10 mb-6 md:mb-0 sm:relative right-0 mt-2 h-80">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-state">
                        Filter By
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state">
                          <option>Today</option>
                          <option>Yesterday</option>
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                        </select>
                        <div
                          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="mt-5">
                    <Line
                      data={state}
                      options={{
                        title: {
                          display: true,
                          fontSize: 20
                        },
                        legend: {
                          display: false,

                        }
                      }}
                    />

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
        </div>
      </div>
      {renderMenu}

    </div>
  );
}

let mapStateToProps = state => {
  return {
    deshboardStatus: state.DeshboardReducer
  }
}


export default connect(mapStateToProps, { earningStatus })(App);