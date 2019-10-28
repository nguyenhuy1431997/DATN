import React, { Component } from 'react';
import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Home from './component/home/Home';
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './actions/index';
import Nhanghi from './component/nhanghi/Nhanghi';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access: false,
            accout: "",
        }
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onLoginLinkClick = this.onLoginLinkClick.bind(this);
        this.onRegisterLinkClick = this.onRegisterLinkClick.bind(this);
        this.logOut = this.logOut.bind(this);
        this.onMore = this.onMore.bind(this);
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('users')){
            let users=  JSON.parse(localStorage.getItem('users'));
            // console.log(users);
            if(users.user){
                this.setState({
                    access: true,
                    accout: users.user
                });
            }
        }
    }

    // componentDidMount() {
    //     // this.props.authAPI();
    //     console.log('hhhhhhhhhhh')
    // }

    onLoginClick(data) {
        this.props.login(data.user,data.pass).then(() => {
            
            // console.log('asdasdasd',this.props.auth)
                if (this.props.auth.error){
                        alert(this.props.auth.error)
                }else{
                    this.props.history.push("/");
                }
        })
        // console.log(this.props.users);

        // let elm = 0;
        // for (let i = 0; i < this.props.users.length; i++) {
        //     if (data.user === this.props.users[i].name && data.pass === this.props.users[i].pass) {
        //         console.log('dang nhap thanh cong');
        //         this.setState({
        //             access: true,
        //             accout: data.user
        //         });
        //         localStorage.setItem('users',JSON.stringify(data));
        //         this.props.history.push("/");
        //         break;
        //     } else {
        //         elm++;
        //         if (elm === (this.props.users.length)) {
        //             alert("Username hoặc Password không đúng");
        //         }
        //     }
        // }
    }

    onLoginLinkClick() {
        this.props.history.push("/users");
    }



    onRegisterClick(data) {
        this.props.authAPI(data.user,data.pass).then(() => {
            // console.log(this.props.auth)
                if (this.props.auth._token){
                    this.props.history.push("/about");
                }else{
                    alert('asdfgh')
                }
        })
       
        // this.props.history.push("/about");

        // for (let i = 0; i < this.props.users.length; i++) {
        //     if (data.user === this.props.users[i].name) {
        //         alert('tên tài khoản đã tồn tại');
        //     }
        // }
        // const resut = this.props.users.filter(user => user.name === data.user);
        // console.log(resut);
        // if (resut.length === 0) {
        //     if (data.user !== "" && data.pass !== "" && data.repeat !== "") {
        //         if (data.pass === data.repeat) {
        //             this.props.onRegisterClick(data.user, data.pass);
        //             alert('Đăng ký thành công');
                    
        //             this.props.history.push("/about");
        //         } else {
        //             alert('Repeat Password không đúng');
        //         }
        //     } else {
        //         alert('Các trường không được để trống');
        //     }
        // }
    }

    onRegisterLinkClick() {
        this.props.history.push("/about");
    }

    onMore(data) {
        this.props.history.push("/");
        let users=[];
        localStorage.setItem('users',JSON.stringify(users));
        this.setState({
            access: false
        });
    }
    
    logOut(value){
        console.log(value);
        
        this.props.logOut(value,this.props.auth.username,this.props.auth.passwork).then(()=>{
            this.props.history.push("/");
        })
    }

    render() {
        let { access, accout } = this.state;
        let { auth } = this.props;
        return (
            <div>
                <Route path="/" exact render={() =>
                    <Home
                        onRegisterLinkClick={this.onRegisterLinkClick}
                        onLoginLinkClick={this.onLoginLinkClick}
                        auth={auth}
                        // access={access}
                        // accout={accout}
                        onMore={this.onMore}
                        logOut={this.logOut}
                    />}
                />
                <Route path="/about/" render={() =>
                    <Login
                        onLoginClick={this.onLoginClick}
                        onLoginLinkClick={this.onLoginLinkClick}
                        onMore={this.onMore}
                    />
                } />
                <Route path="/users/" render={() =>
                    <Register
                        onRegisterClick={this.onRegisterClick}
                        onMore={this.onMore}
                    />
                } />
                <Route path="/nhanghi/" render={() =>
                    <Nhanghi
                        onRegisterLinkClick={this.onRegisterLinkClick}
                        onLoginClick={this.onLoginClick}
                        onLoginLinkClick={this.onLoginLinkClick}
                        onRegisterClick={this.onRegisterClick}
                        onMore={this.onMore}
                        auth={auth}

                    />
                } />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth_reducer
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        authAPI: async (user,pass) => {
            await dispatch(actions.registeruserAPI(user,pass));
        },
        login: async (user,pass) => {
            await dispatch(actions.loginAPI(user,pass));
        },
        logOut: async (value,username,password) => {
            await dispatch(actions.logOut(value,username,password));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
