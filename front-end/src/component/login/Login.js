import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemore = this.onRemore.bind(this);
    }

    onChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onLoginClick(this.state);
    }

    onRemore(event) {
        this.props.onMore(this.state);
    }

    render() {
        return (
            <div className="Login d-flex justify-content-center align-items-center">
                <div className="formLogin w-75 d-flex justify-content-center p-3">
                    <Form className="w-50 p-3" onSubmit={this.onSubmit}>
                        <h3>SIGN IN</h3>
                        <p>To an existing account</p>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="user"
                                placeholder="User name"
                                onChange={this.onChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="pass"
                                placeholder="Password"
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Button type="submit" className="mr-sm-2 mt-4 mr-3">
                            Login
                        </Button>
                        <Button className="mt-4 ml-3"
                            
                            onClick={this.onRemore}
                        >
                            Hủy
                        </Button>
                        <br />
                    </Form>
                    <div className={"w-50 p-3 pl-4 border-left border-secondary"}>
                        <h2>
                            Connect to network
                   </h2>
                        <p>One account connects to the world: phone, laptop, accessories and more</p>
                        <p>Don't have an account?    <br/> 
                        <Link className="mt-4" to={"/users"} onClick={() => {
                            this.props.onLoginLinkClick && this.props.onLoginLinkClick(this.state)
                        }}>Register account</Link></p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;