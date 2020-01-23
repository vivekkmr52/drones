import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Drones from './Drones';
import jsonResponse from '../quads';
import './app.css'
class ChargingStations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cs1: [],
            cs2: [],
            cs3: [],
            disableButton: Boolean,
            modelName: '',
            crashDrone: [],
            crashTimer: ''
        }
    }
    componentDidMount() {

        let cs1 = [], cs2 = [], cs3 = [];

        for (let i = 0; i < 10; i++) {
            cs1 = [...cs1, jsonResponse.quads[i]]
        }

        for (let i = 10; i < 15; i++) {
            cs2 = [...cs2, jsonResponse.quads[i]]
        }

        for (let i = 15; i < jsonResponse.quads.length; i++) {
            cs3 = [...cs3, jsonResponse.quads[i]]
        }

        this.setState({
            cs1: cs1,
            cs2: cs2,
            cs3: cs3,
            disableButton: false,
        })

        if (localStorage.getItem('Logged In User') === '' || localStorage.getItem('Logged In User') === null) {
            this.setState({
                disableButton: true
            })
        }
    }
    handleClick = (e) => {
        const { cs1, cs2, cs3 } = this.state
        this.setState({
            disableButton: true,
            modelName: e.target.value
        })
        let maxTime = (maxFlightTime) => {
            return (parseInt(maxFlightTime) * 1000 * 60);
        }
        let SaveDataToLocalStorage = (data) => {
            let a = [];
            if (JSON.parse(localStorage.getItem('crashDrone')) !== null) {
                a = JSON.parse(localStorage.getItem('crashDrone'));
            }
            a.push(data);
            localStorage.setItem('crashDrone', JSON.stringify(a));
        }
        for (let i = 0; i < cs1.length; i++) {
            if (e.target.value === cs1[i].model) {
                this.setState({
                    crashDrone: cs1[i]
                })

                this.setState({
                    crashTimer: setTimeout(() => {
                        this.setState({
                            cs1: [...cs1, this.state.crashDrone],
                            crashDrone: []
                        })
                        SaveDataToLocalStorage(localStorage.getItem('Logged In User'))
                        this.props.history.push("/DroneCrash");
                        localStorage.removeItem('Logged In User');
                    }, maxTime(cs1[i].maxFlightTime))
                })
                cs1.splice(i, 1);
            }

        }

        for (let i = 0; i < cs2.length; i++) {
            if (e.target.value === cs2[i].model) {
                this.setState({
                    crashDrone: cs2[i]
                })

                this.setState({
                    crashTimer: setTimeout(() => {
                        this.setState({
                            cs2: [...cs2, this.state.crashDrone],
                            crashDrone: []
                        })
                        SaveDataToLocalStorage(localStorage.getItem('Logged In User'))
                        this.props.history.push("/DroneCrash");
                        localStorage.removeItem('Logged In User');
                    }, maxTime(cs2[i].maxFlightTime))
                })
                cs2.splice(i, 1);
            }

        }

        for (let i = 0; i < cs3.length; i++) {
            if (e.target.value === cs3[i].model) {
                this.setState({
                    crashDrone: cs3[i]
                })

                this.setState({
                    crashTimer: setTimeout(() => {
                        this.setState({
                            cs3: [...cs3, this.state.crashDrone],
                            crashDrone: []
                        })
                        SaveDataToLocalStorage(localStorage.getItem('Logged In User'));
                        localStorage.removeItem('Logged In User');
                        this.props.history.push("/DroneCrash");
                    }, maxTime(cs3[i].maxFlightTime))
                })
                cs3.splice(i, 1);
            }

        }
    }


    handleStation1 = (e) => {
        e.preventDefault()
        let temp = [];
        const { cs1, modelName, crashDrone } = this.state
        if (this.state.disableButton && cs1.length < 10 && crashDrone.length !== 0) {
            for (let i = 0; i < jsonResponse.quads.length; i++) {
                if (modelName === jsonResponse.quads[i].model) {
                    temp = [...cs1, crashDrone]
                }
            }
            clearTimeout(this.state.crashTimer)
            this.setState({
                cs1: temp,
                disableButton: false,
                crashDrone: []
            })
        }
        else {
            console.log('Couldnt move');
        }

    }

    handleStation2 = (e) => {
        e.preventDefault();
        let temp = [];
        const { cs2, modelName, crashDrone } = this.state;
        if (this.state.disableButton && cs2.length < 10 && crashDrone.length !== 0) {
            for (let i = 0; i < jsonResponse.quads.length; i++) {
                if (modelName === jsonResponse.quads[i].model) {
                    temp = [...cs2, crashDrone]
                }
            }
            clearTimeout(this.state.crashTimer)
            this.setState({
                cs2: temp,
                disableButton: false,
                crashDrone: [],
                
            })
        }
        else {
            console.log('Couldnt move');
        }
    }

    handleStation3 = (e) => {
        e.preventDefault()
        let temp = [];
        const { cs3, modelName, crashDrone } = this.state;
        if (this.state.disableButton && cs3.length < 10 && crashDrone.length !== 0) {
            for (let i = 0; i < jsonResponse.quads.length; i++) {
                if (modelName === jsonResponse.quads[i].model) {
                    temp = [...cs3, crashDrone]
                }
            }
            clearTimeout(this.state.crashTimer)
            this.setState({
                cs3: temp,
                disableButton: false,
                crashDrone: []
            })
        }
        else {
            console.log('Couldnt move');
        }
    }

    handleSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('Logged In User');
        this.props.history.push("/");
    }

    render() {
        const { cs1, cs2, cs3 } = this.state;

        const chargingStation1 = cs1.map((station1, i) =>
            <li key={i} > <Drones
                modelName={station1.model}
                manufacturer={station1.manufacturer}
                charge={station1.charge}
                fligtTime={station1.maxFlightTime}
                handleClick={this.handleClick}
                disable={this.state.disableButton}
                value={station1.model}
            />
            </li>
        )
        const chargingStation2 = cs2.map((station2, i) =>
            <li key={i}> <Drones
                modelName={station2.model}
                manufacturer={station2.manufacturer}
                charge={station2.charge}
                fligtTime={station2.maxFlightTime}
                handleClick={this.handleClick}
                disable={this.state.disableButton}
                value={station2.model}
            />
            </li>
        )
        const chargingStation3 = cs3.map((station3, i) =>
            <li key={i}> <Drones
                modelName={station3.model}
                manufacturer={station3.manufacturer}
                charge={station3.charge}
                fligtTime={station3.maxFlightTime}
                handleClick={this.handleClick}
                disable={this.state.disableButton}
                value={station3.model}
            />
            </li>
        )

        return (
            <div>
                {/* <Link to="/">Sign Out</Link> */}
                <Button disabled={this.state.disableButton} onClick={this.handleSignOut} className='text-center' variant="primary">
                    Sign Out
                </Button>
                {
                    (this.state.crashDrone !== null && this.state.crashDrone.length !== 0) ? <div>
                        You have rented {this.state.crashDrone.model}. Please return in {this.state.crashDrone.maxFlightTime}
                    </div> : <div></div>
                }
                <div>Charging Station 1:
                    <Button onClick={this.handleStation1} variant='info' >Return</Button>
                    {this.state.cs1.length}
                </div>

                <div className="charging-station ">{chargingStation1}</div>

                <div>Charging Station 2:
                    <Button onClick={this.handleStation2} variant='info' >Return</Button>
                    {this.state.cs2.length}
                </div>

                <div className="charging-station">{chargingStation2}</div>

                <div>Charging Station 3:
                    <Button onClick={this.handleStation3} variant='info' >Return</Button>
                    {this.state.cs3.length}
                </div>

                <div className="charging-station">{chargingStation3}</div>
            </div>
        )
    }
}

export default ChargingStations;
