
import React, { PureComponent } from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

import LoginComp from './login';
import MasterComp from './master';
import Err404Comp from './error';

class Index extends PureComponent{

    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={()=> <Redirect to="/acts" /> } />
                    <Route path="/acts" component={MasterComp} />
                    <Route path="/login" component={LoginComp} />
                    <Route component={Err404Comp} />
                </Switch>
            </HashRouter>
        );
    }
}

export default Index;
