//--========================================================================--
//-- 系统配置管理
//-- loke 2018-02-05 15:23:25
//--========================================================================--
import {Authority} from './utils/authority';

const config = {
    sysName: "SUI后台管理框架",
    tokenName: "sx.suimaster",
};

if(ENV_PRODUCE) {
    //开发调试版本
    config.apiPrefix = "/api";
    config.version = "1.0.2";
}else {
    //打包发布版本
    config.apiPrefix = "http://szsxtc.f3322.net:7004/power";
    config.version = "1.5.2";
}

config.token = () => {
    return Authority.authorize();
};

export {config};
