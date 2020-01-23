import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            loginEmail: '',
            existingUser: Boolean,
            userRegisteredSuccessfully: Boolean,
            userNotRegistered: Boolean

        }
    }
    componentDidMount() {
        this.setState({
            userRegisteredSuccessfully: false,
            existingUser: false,
            userNotRegistered: true
        })
    }
    

    handleRegister = (e) => {
        let existingUser;
        e.preventDefault();

        let SaveDataToLocalStorage = (data) => {
            let a = [];
            if (JSON.parse(localStorage.getItem('session')) !== null) {
                a = JSON.parse(localStorage.getItem('session'));
            }
            a.push(data);
            localStorage.setItem('session', JSON.stringify(a));
        }

        if (localStorage.getItem('session')) {
            for (let i = 0; i < JSON.parse(localStorage.getItem('session')).length; i++) {
                if (JSON.parse(localStorage.getItem('session'))[i] === this.state.registerEmail) {
                    existingUser = true;
                    this.setState({
                        existingUser: true
                    })
                }
            }
        }
        else {
            existingUser = false
        }

        if (!existingUser) {
            SaveDataToLocalStorage(this.state.registerEmail);
            this.setState({
                existingUser: false,
                userRegisteredSuccessfully: true
            })
        }
    }
    handleSignIn = (e) => {
        e.preventDefault();
        let crashedDrone;
        if (localStorage.getItem('crashDrone')){
            for (let i = 0; i < JSON.parse(localStorage.getItem('crashDrone')).length; i++) {
                if (JSON.parse(localStorage.getItem('crashDrone'))[i] === this.state.loginEmail) {
                    this.props.history.push("/DroneCrash");
                    crashedDrone = true;
                }
            }
        }

        this.setState({
            userNotRegistered: false
        })
        
        if (localStorage.getItem('session') && !crashedDrone) {
            for (let i = 0; i < JSON.parse(localStorage.getItem('session')).length; i++) {
                if (JSON.parse(localStorage.getItem('session'))[i] === this.state.loginEmail) {
                    this.props.history.push("/chargingStations");
                    localStorage.setItem('Logged In User', this.state.loginEmail)
                    
                }
            }
        }
    }
    handleRegisterEmail = (e) => {
        this.setState({
            registerEmail: e.target.value
        })
    }
    handleLoginEmail = (e) => {
        this.setState({
            loginEmail: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        Not a member? Register here to start renting drones
                        <Form onSubmit={this.handleRegister}>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicRegisterEmail">
                                <Form.Control value={this.state.registerEmail} onChange={this.handleRegisterEmail} required type="email" placeholder="Email Address*" />
                            </Form.Group>
                            <Form.Group controlId="formBasicNumber">
                                <Form.Control type="tel" placeholder="Emergency Phone Number" />
                            </Form.Group>
                            <Button className='text-center' variant="primary" type="submit">
                                Register
                            </Button>
                            {
                                this.state.userRegisteredSuccessfully && !this.state.existingUser ? <div>Registered Successfully! Please Sign In</div> : <div></div>
                            }
                            {
                                this.state.existingUser ? <div>Registered Account! Please Sign In</div> : <div></div>
                            }
                            <div>
                            </div>
                        </Form>
                    </Col>
                    <Col>
                        Or Sign In
                        <Form onSubmit={this.handleSignIn}>
                            <Form.Group controlId="formBasicLoginEmail">
                                <Form.Control value={this.state.loginEmail} onChange={this.handleLoginEmail} required type="email" placeholder="Email Address*" />
                            </Form.Group>
                            <Button className='text-center' variant="primary" type="submit">
                                Sign In
                            </Button>
                            {
                                (!this.state.existingUser && !this.state.userNotRegistered) ? <div>Please register first to start renting drones.</div> :
                                <div></div>
                            }
                        </Form>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Login
