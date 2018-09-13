/*--============================---
 *  母版页面
 *  loke    2018-07-11 17:07:22
 *--==============================*/
import React, { PureComponent } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import RouterData from './router';
import Err404Comp from './error';

class Master extends PureComponent{
    mounted = true;

    componentDidMount(){

    };

    componentWillUnmount(){
        this.mounted = false;
    }

    render(){
        const {match: {url}} = this.props;
        return(
            <Switch>
                {RouterData && RouterData.length> 0 && <Route exact path={url} component={RouterData[0].component} />}
                {RouterData && RouterData.map((router, idx)=>{
                    if(idx > 0) {
                        return <Route exact key={idx} path={url + router.path} component={router.component}/>
                    }
                })}
                <Route component={Err404Comp} />
            </Switch>
        );
    }
}

export default Master;
