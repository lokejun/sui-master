/*--============================---
 *  母版页面
 *  loke    2018-07-11 17:07:22
 *--==============================*/
import React, { PureComponent } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BaseLayout, Icon, Modal, Input} from '../component/index';
import {Authority} from '../utils/authority';
import {DataFunc} from '../utils/datafunc';
import RouterData from './router';
import MenusData from './menus';
import {ValidComponent} from '../utils/validcomp';

class Master extends PureComponent{
    mounted = true;
    state = {
        userName: '测试员（test）',
        menuGrants: null,
        passInfo: { modalVisible: false, oldPass: null, newPass: null, newPass2: null },
    };

    componentWillMount(){

    };

    initData = () => {
        if(!Authority.authorize()){
            this.props.history.replace("/login");
        }else{
            //如果已经登录，换取权限以及用户信息
            const httpInfo = [
                {key: 'user', url: '/sys/users'},
                {key: 'grant', url: '/sys/permission/getUserByPermissions'}
            ];
            DataFunc.async(...httpInfo).then(data=>{
                if(data[0].status === 200){
                    if(data[0].result){
                        this.setState({userName: data[0].result.usrName + "(" + data[0].result.loginCode + ")"});
                        Authority.saveData("userId", data[0].result.usrId);
                        Authority.saveData("userName", data[0].result.usrName);
                        Authority.saveData("code", data[0].result.loginCode);
                    }
                }
                if(data[1].status === 200){
                    const grants = [];
                    data[1].result && data[1].result.map(item=>{
                        grants.push(item.permissionsMark);
                    });
                    if(grants.length > 0){
                        Authority.saveData("grants", grants.join(","));
                        this.setState({menuGrants: grants});
                    }
                }
            });
        }
    };

    componentWillUnmount(){
        this.mounted = false;
    }

    handleClick = (type, arg, event) => {
        switch (type){
            case "menu": //菜单点击事件
                if(event){
                    this.linkHandler(event.path);
                }
                break;
            case "logout":  //退出登录事件
                this.logoutHandler();
                break;
        }
    };

    linkHandler = (path) => {
        const {history, match, location} = this.props;
        path = match.url + path;
        if(location.pathname === path) return;
        history.push(path);
    };

    logoutHandler = () => {
        Authority.clear();
        this.props.history.replace("/login");
    };

    modifyPassHandler = (type, callback) =>{
        switch (type){
            case "show":
                this.state.passInfo.modalVisible = true;
                if(this.mounted) this.setState({ passInfo: {...this.state.passInfo}});
                break;
            case "modify":
                console.log(this.state.passInfo);
                if(callback){
                    callback(true);
                }
                break;
        }
    };

    handlePassModifyChange = (type, value) => {
        this.state.passInfo[type] = value;
        if(this.mounted) this.setState({ passInfo: {...this.state.passInfo}});
    };

    render(){
        const {match: {url}} = this.props;
        const {userName, menuGrants} = this.state;
        const getMenusData = () => {
            const menuData = [];
            MenusData.map(menu => {
                if (menuGrants && menuGrants.indexOf("[menu]" + menu.key) >= 0) {
                    menuData.push(menu);
                    let parent = MenusData.select(menu.parent, "key");
                    if(parent && !menuData.select(parent.key, "key")){
                        menuData.push(parent);
                    }
                    if(parent) {
                        let parentParent = MenusData.select(parent.parent, "key");
                        if (parentParent && !menuData.select(parentParent.key, "key")) {
                            menuData.push(parentParent);
                        }
                    }
                }else{
                    menuData.push(menu);
                }
            });
            return menuData;
        };

        const layoutProps = {
            ...this.props,
            menusData: getMenusData(),
            menuClick: this.handleClick.bind(this, 'menu'),
            headers: {
                prefix: null,
                suffix: <div>
                    <span className={"userinfo"}>
                        <a className="ico"><Icon type="bell" /></a>
                    </span>
                    <span className={"userinfo"}>
                        <a className="droplist"><i><img src={require('../assets/images/user-head.png')} /></i>{userName}</a>
                        <div className={"dropdown-list"}>
                            <a className={"disabled"}><Icon type="user" />个人中心</a>
                            <a className={"disabled"}><Icon type="setting" />设置</a>
                            <a onClick={this.modifyPassHandler.bind(this, "show")}><Icon type="lock" />修改密码</a>
                            <a className={"split"}></a>
                            <a onClick={this.handleClick.bind(this, "logout")}><Icon type="logout" />退出登录</a>
                        </div>
                    </span>
                </div>
            }
        };
        const createModifyPassForm = (
            <Modal.Page width={320} height={320} title="修改密码" visible={this.state.passInfo.modalVisible} onCancel={()=>{ this.setState({ passInfo: { ...this.state.passInfo, modalVisible: false } }) }} onOk={this.modifyPassHandler.bind(this, "modify")} bodyStyle={{textAlign: 'left'}}>
                <div style={{height: 32, lineHeight: '32px'}}>旧密码</div>
                <div><Input type="password" style={{width: '100%'}} maxLength={20} onChange={this.handlePassModifyChange.bind(this, "oldPass")} /></div>
                <div style={{height: 32, lineHeight: '32px'}}>新密码</div>
                <div><Input type="password" style={{width: '100%'}} maxLength={20} onChange={this.handlePassModifyChange.bind(this, "newPass")} /></div>
                <div style={{height: 32, lineHeight: '32px'}}>再输一次</div>
                <div><Input type="password" style={{width: '100%'}} maxLength={20} onChange={this.handlePassModifyChange.bind(this, "newPass2")} /></div>
            </Modal.Page>
        );
        return(
            <BaseLayout {...layoutProps}>
                <ValidComponent {...this.props}>
                    <Switch>
                        <Route exact path={url} component={RouterData[0].component} />
                        {RouterData.map((router, idx)=>{
                            if(idx > 0) {
                                return <Route key={idx} path={url + router.path} component={router.component}/>
                            }
                        })}
                    </Switch>
                </ValidComponent>
                {createModifyPassForm}
            </BaseLayout>
        );
    }
}

export default Master;
