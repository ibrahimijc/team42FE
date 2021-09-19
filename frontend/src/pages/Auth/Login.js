import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateForm from '../../validation/validate-form'
import Noty from 'noty';
import { loginUser } from '../../store/actions/authActions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "UserEmail": "",
            "UserPassword": "",
            errors: {
                UserEmail: '',
                UserPassword: '',
            },
            serverError: {},
            isSigningIn: false
        };
        this.onChange = this.onChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }
    componentDidMount() {

        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }

    }
    onLogin() {
        if (validateForm(this.state.errors)) {

        } else {
            window.alert("Please coorect below error")
            return
        }
        const userData = {
            UserEmail: this.state.UserEmail,
            UserPassword: this.state.UserPassword
        };
        this.setState({ isSigningIn: true })

        this.props.loginUser(userData).then(res => {
            this.setState({ isSigningIn: false })

            if (res.status == "success") {
                new Noty({
                    text: "Succsessfully Login",
                    layout: "topRight",
                    theme: "bootstrap-v4",
                    type: "success",
                    timeout: 1000
                }).show();

            } else {
                new Noty({
                    text: "Something went wrong",
                    layout: "topRight",
                    theme: "bootstrap-v4",
                    type: "error",
                    timeout: 1000
                }).show();
            }

        }).catch(err => {
            this.setState({ isSigningIn: false })
            var validationError = {}
            var serverError = []
            if (err.hasOwnProperty('validation')) {
                err.validation.map(obj => {
                    if (obj.hasOwnProperty('param')) {
                        validationError[obj["param"]] = obj["msg"]
                    } else {
                        serverError = [...serverError, obj]
                    }
                });
                this.setState({ errors: validationError });
                this.setState({ serverError: serverError });
            } else {
                this.setState({ serverError: [{ "msg": "server not responding" }] })
            }
        });


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
        }
    }

    renderServerError() {
        if (this.state.serverError != null && this.state.serverError.length > 0) {
            return (

                <div className="form-group alert alert-danger" role="alert" >
                    <strong className="pr-2">Oh snap!  {"  "}</strong>
                    {this.state.serverError[0].msg}

                </div>
            )
        }
    }

    onChange(e) {
        const validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        this.setState({ [e.target.name]: e.target.value });
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
           
            case 'UserEmail':
                errors.UserEmail =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'UserPassword':
                errors.UserPassword =
                    value.length < 6
                        ? 'Password must be 6 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })

    }

    render() {
        const { errors } = this.state
        return (
            <div className="register-body row col-sm-12    pl-0 pr-0 mb-5">

                <div className="col-sm-3 pr-0">

                </div>

                <div class="div1 col-sm-6 mt-5 mb-5  ">
                    <div className="text-center mt-2 mb-2">
                        <label class="SHOP-DETAILS col-sm-12 m-0 mt-5">SIGN IN</label>
                    </div>






                    <div className="col-sm-12 p-0 mt-2 mb-2">
                        <div className="row">
                            <div className="col-sm-12 p-0">
                                <label class="Label-text col-sm-12">Email Address</label>
                                <div className="input-container ">
                                    <input type="email" className="    input-text   col-sm-12" name="UserEmail" onChange={this.onChange} />
                                </div>
                                <div className="text-right mr-5 errorclr">
                                    {errors.UserEmail.length > 0 &&
                                        <span className='error'>{errors.UserEmail}</span>}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-12 p-0 mt-2 mb-2">
                        <div className="row">
                            <div className="col-sm-12 p-0">
                                <label class="Label-text col-sm-12">password</label>
                                <div className="       input-container ">
                                    <input type="password" className="    input-text  m-0 col-sm-12" name="UserPassword" onChange={this.onChange} />
                                </div>
                                <div className="text-right mr-5 errorclr">
                                    {errors.UserPassword.length > 0 &&
                                        <span className='error'>{errors.UserPassword}</span>}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-sm-12 p-1 mt-2">
                        <div className="row">
                            <div className="input-container ">
                                <div class="round">
                                    <input type="checkbox" className="     m-0 col-sm-8" id="checkbox" />
                                    <label for="checkbox"></label>
                                </div>
                                <label className="check-box-label">Remember Password</label>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 mt-3 text-center">Don't have an account? <a className=" lginclr" onClick={() => this.props.history.push('/register')} > <b className=" lginclr">Create Account</b></a></p>




                    {this.state.isSigningIn ? <div className="loader-small"> </div> :
                        <div className="btnn col-sm-12 mb-4">
                            <button class="submit-btn05 col-sm-3 " onClick={this.onLogin}>Sign In</button>
                        </div>
                    }
                </div>

            </div>

        )
    }

}

Login.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth,

});

const mapDispatchToProps = ({
    loginUser

})
export default connect(mapStateToProps, mapDispatchToProps)(Login);