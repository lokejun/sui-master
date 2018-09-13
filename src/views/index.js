
import React, { PureComponent } from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

import LoginComp from './login';
import MasterComp from './master';

class Index extends PureComponent{

    render(){
        return(
            <HashRouter>
                <div>
                    <Route exact path="/" render={()=> <Redirect to="/acts" /> } />
                    <Route path="/acts" component={MasterComp} />
                    <Route path="/login" component={LoginComp} />
                </div>
            </HashRouter>
        );
    }
}

export default Index;
