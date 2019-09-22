import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            user: "",
            pass: "",
            repeat: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemore = this.onRemore.bind(this);
    }



    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onRegisterClick(this.state);
    }

    onRemore(event) {
        this.props.onMore(this.state);
    }

    render() {
        return (
            <div className="Register d-flex justify-content-center align-items-center">
                <div className="formRegister p-5 w-50">
                    <h3>REGISTER</h3>
                    <p>To ceate an new account</p>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="user"
                                placeholder="User name"
                                onChange={this.onChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control

                                type="password"
                                name="pass"
                                placeholder="Password"
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="repeat"
                                onChange={this.onChange}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mr-sm-2 mt-4 mr5"
                        >
                            Đăng ký
                        </Button>
                        <Button
                            className="mt-4 ml-3"
                            onClick={this.onRemore}
                        >
                            Hủy
                        </Button>
                    </Form>



                </div>
            </div>
        )
    }
}

export default Register;