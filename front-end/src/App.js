import React, { Component } from 'react';
import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Home from './component/home/Home';
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './component/actions/index';

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

    componentDidMount() {
        this.props.authAPI();
    }

    onLoginClick(data) {
        // console.log(this.props.users);
        let elm = 0;
        for (let i = 0; i < this.props.users.length; i++) {
            if (data.user === this.props.users[i].name && data.pass === this.props.users[i].pass) {
                console.log('dang nhap thanh cong');
                this.setState({
                    access: true,
                    accout: data.user
                });
                localStorage.setItem('users',JSON.stringify(data));
                this.props.history.push("/");
                break;
            } else {
                elm++;
                if (elm === (this.props.users.length)) {
                    alert("Username hoặc Password không đúng");
                }
            }
        }
    }

    onLoginLinkClick() {
        this.props.history.push("/users");
    }

    onRegisterClick(data) {
        for (let i = 0; i < this.props.users.length; i++) {
            if (data.user === this.props.users[i].name) {
                alert('tên tài khoản đã tồn tại');
            }
        }
        const resut = this.props.users.filter(user => user.name === data.user);
        console.log(resut);
        if (resut.length === 0) {
            if (data.user !== "" && data.pass !== "" && data.repeat !== "") {
                if (data.pass === data.repeat) {
                    this.props.onRegisterClick(data.user, data.pass);
                    alert('Đăng ký thành công');
                    
                    this.props.history.push("/about");
                } else {
                    alert('Repeat Password không đúng');
                }
            } else {
                alert('Các trường không được để trống');
            }
        }
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

    render() {
        let { access, accout } = this.state;
        let { users } = this.props;
        return (
            <div>
                <Route path="/" exact render={() =>
                    <Home
                        onRegisterLinkClick={this.onRegisterLinkClick}
                        onLoginLinkClick={this.onLoginLinkClick}
                        users={users}
                        access={access}
                        accout={accout}
                        onMore={this.onMore}
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
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.auth_reducer
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        authAPI: () => {
            dispatch(actions.authAPI());
        },
        onRegisterClick: (name, pass) => {
            dispatch(actions.registeruserAPI(name, pass))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
