import React, { useState } from "react"
import { BarChart2, Home, Globe, Code, CreditCard, Users, ChevronRight, User, ToggleRight, RefreshCw, RefreshCcw, ChevronUp, DollarSign, Monitor, Calendar, ChevronDown, MoreHorizontal, Star, Bookmark } from 'react-feather';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import isEmpty from 'is-empty'
import { register } from '../../redux/actions/AuthAction'



function Website(props) {

    let {
        error,
        register
    } = props

    let [err, setError] = useState(null)
    let [state, setState] = useState({
        Fname: "",
        Lname: "",
        email: "",
        password: "",
        confirm_pw: "",
        agreement: false,
    })


    const onChangeHandler = e => {

        let name = e.target.name
        let value = e.target.value
        if (name == "agreement") {
  
            setState({
                ...state,
                [name]: e.target.checked
            })
            return true
        }
        setState({
            ...state,
            [name]: value
        })


    }

    const submit = e => {
        e.preventDefault()

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product = urlParams.get('ref_id')
        if(!state.agreement){
            setError("Please fill all the fields")
            setTimeout(() => {
                setError(null)
            }, 3000);
            return true
        }
        let {
            Fname,
            Lname,
            email,
            password,
            confirm_pw,
            agreement

        } = state
       
        if (password !== confirm_pw) {
            setError("Password didn't match")
            setTimeout(() => {
                setError(null)
            }, 3000);
            return true
        }
        if (isEmpty(Fname) || isEmpty(Lname) || isEmpty(email) || isEmpty(password)) {
            setError("Please fill all the fields")
            setTimeout(() => {
                setError(null)
            }, 3000);
            return true
        } else {

            let newObj = {
                Fname: Fname.trim(),
                Lname: Lname.trim(),
                email: email.trim(),
                password,
                confirm_pw,
                agreement,
                referred_by: product ? product : null
            }


            register(newObj)
        }

    }


    return (
        <>

            <div className="login">
                <div className="container sm:px-10">
                    <div className="block xl:grid grid-cols-2 gap-4">

                        <div className="hidden xl:flex flex-col min-h-screen">
                            <a href="" className="-intro-x flex items-center pt-5">
                                <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={require("../../assets/images/logo.svg")} />
                                <span className="text-white text-lg ml-3"> Pop<span className="font-medium">Example</span> </span>
                            </a>
                            <div className="my-auto">
                                <img alt="Midone Tailwind HTML Admin Template" className="-intro-x w-1/2 -mt-16"
                                    src={require("../../assets/images/illustration.svg")} />
                                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                    A few more clicks to
                        <br />
                        sign up to your account.
                    </div>
                                <div className="-intro-x mt-5 text-lg text-white dark:text-gray-500">Manage all your e-commerce accounts
                                    in one place</div>
                            </div>
                        </div>

                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div
                                className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                    Sign Up
                                </h2>
                                <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center">A few more clicks
                                        to sign in to your account. Manage all your e-commerce accounts in one place</div>
                                <div className="intro-x mt-8">

                                    <input type="text" onChange={onChangeHandler} value={state.Fname} name="Fname"
                                        className="intro-x login__input input input--lg border border-gray-300 block"
                                        placeholder="First Name" />
                                    <input type="text" onChange={onChangeHandler} name="Lname" value={state.Lname}
                                        className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                        placeholder="Last Name" />
                                    <input type="text" onChange={onChangeHandler} name="email" value={state.email}
                                        className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                        placeholder="Email" />
                                    <input type="password" onChange={onChangeHandler} name="password" value={state.password}
                                        className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                        placeholder="Password" />

                                    <input type="password" onChange={onChangeHandler} name="confirm_pw" value={state.confirm_pw}
                                        className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                        placeholder="Password Confirmation" />
                                </div>
                                <div className="intro-x flex items-center text-gray-700 dark:text-gray-600 mt-4 text-xs sm:text-sm">
                                    <input type="checkbox" onChange={onChangeHandler} name="agreement" className="input border mr-2" id="remember-me" required />
                                    <label className="cursor-pointer select-none" htmlFor="remember-me">I agree to the </label>
                                    <a className="text-theme-1 dark:text-theme-10 ml-1" href="#">Privacy Policy</a>.
                                </div>
                                <div className="intro-x flex-items-center text-red-700 mt-5">
                                    {error.registerError ? error.registerError : ""}
                                </div>
                                <div className="intro-x flex-items-center text-red-700 mt-5">
                                    {err ? err : ""}
                                </div>
                                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                    <button className="button button--lg w-full xl:w-32 text-white bg-theme-1 xl:mr-3" onClick={submit}>
                                        Register
                                    </button>
                                    <Link to='/login'>
                                        <button
                                            className="button button--lg w-full xl:w-32 text-gray-700 border border-gray-300 dark:border-dark-5 dark:text-gray-300 mt-3 xl:mt-0">
                                            Sign in
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

let mapStateToProps = state => {
    console.log(state);
    return {
        error: state.ErrorReducer
    }
}


export default connect(mapStateToProps, {
    register
})(Website)