/*--============================---
 *  登录页面
 *--==============================*/

import React, { PureComponent } from 'react';
import {BaseLogin, Modal} from '../component/index';
import {DataFunc} from '../utils/datafunc';
import {Base64} from '../utils/encrypt';
import {Authority} from '../utils/authority';
import {config} from '../config';

class Login extends PureComponent{

    handleClick = (values, event) => {
        // const rstBody = encodeURIComponent(Base64.encrypt(JSON.stringify({code: values.code, pass: values.pass})));
        // const httpInfo = {url: '/o/login', params: rstBody, type: 'post'};
        // DataFunc.async(httpInfo).then(data=>{
        //     if(data.status === 200){
        //         Authority.saveToken(data.result, values.auto);
        //         this.props.history.push("/acts");
        //         Modal.message({text: "登录成功", type: 'success', duration: 1});
        //     }else{
        //         Modal.message({text: data.message, type: "error"});
        //     }
        // });
        Modal.load();
        setTimeout(()=>{
            Modal.load(true);
            if(values.code === "test" && values.pass === "123456") {
                Authority.saveToken("666666", false);
                this.props.history.push("/acts");
                Modal.message({text: "登录成功", type: 'success', duration: 1});
            }else{
                Modal.message({text: "帐号或密码不正确", type: "error"});
            }
        },1000);
    };

    render(){
        return(<div>
            <BaseLogin title={config.sysName} subTitle={<div>全新的系统结构<br />重构的业务处理流程<br />更流畅的交互体验</div>} onClick={this.handleClick} />
        </div>);
    }
}

export default Login;
