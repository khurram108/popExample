import React, { useState, useEffect } from "react"

import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import { sendPasswordChangeRequest } from '../../redux/actions/AuthAction'
import isEmpty from 'is-empty'



function ChangePassword(props) {

    let {
        error,
        sendPasswordChangeRequest
    } = props

    let [err, setError] = useState(null)
    let [success, setSuccess] = useState(null)
    let [state, setState] = useState({

        email: ""
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
        let {

            email
        } = state

        sendPasswordChangeRequest({ email })
    }


    useEffect(() => {

        setError(error.invalidEmail)
        setTimeout(() => {
            setError(null)
        }, 5000);
        if (error.email_sent_success) {
            setSuccess(error.email_sent_success)
            setTimeout(() => {
                setSuccess(null)
            }, 5000);
        }
    }, [error.invalidEmail, error.email_sent_success])






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
                                    change your account password.
                                </div>
                                <div className="-intro-x mt-5 text-lg text-white dark:text-gray-500">Manage all your e-commerce accounts
                                in one place</div>
                            </div>
                        </div>

                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div
                                className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                    Send a Reset Token at
                                </h2>
                                <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
                                    A few more clicks to sign in to your
                                    account. Manage all your e-commerce accounts in one place
                                </div>
                                <div className="intro-x mt-8">


                                    <input type="text"
                                        className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                        placeholder="Your Email" onChange={onChangeHandler} name="email" />
                                </div>

                                {err ?
                                    <div className="intro-x flex-items-center text-red-700 mt-5">
                                        {err}
                                    </div>
                                    : null}
                                {success ?
                                    <div className="intro-x flex-items-center text-green-700 mt-5">
                                        {success}
                                    </div>
                                    : null}

                                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                    <button className="button button--lg w-full xl:w-32 text-white bg-theme-1 xl:mr-3" onClick={submit}>
                                        Send Token
                                    </button>
                                    <Link to='/login'>
                                        <button
                                            className="button button--lg w-full xl:w-32 text-gray-700 border border-gray-300 dark:border-dark-5 dark:text-gray-300 mt-3 xl:mt-0">

                                            Sign In

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


export default withRouter(connect(mapStateToProps, {
    sendPasswordChangeRequest
})(ChangePassword))