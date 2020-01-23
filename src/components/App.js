import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ChargingStations from './ChargingStations';
import Login from './Login';
import { Container } from 'react-bootstrap';
import Error from './Error';
import DroneCrash from './DroneCrash';

class App extends Component {
    
    render() {
        return (
            <div>
                <Container>
                <Switch>
                    <Route path="/" component={Login} exact />
                        <Route path="/chargingStations" component={ChargingStations} />
                        <Route path="/droneCrash" component={DroneCrash} />
                        <Route component={Error} />
                    </Switch>
                    {/* <ChargingStations /> */}
                    {/* <Login /> */}
                </Container>
            </div>
        )
    }
}

export default App;
