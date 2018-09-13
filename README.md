# REACT模版(loke)

## 介绍
  此框架采用react+webpack搭建，兼容IE9+，Chrome等主流浏览器。
  
## 使用
	项目初始化 		npm install
	运行开发模式		npm start 或 npm run dev
	项目打包发布  	npm run build
	
## ISUSE
    1. 如果上传出现 "cross domain error for Upload", 修改/node_modules/rc-upload/es/IframeUploader.js 第55行
       将  response = doc.body.innerHTML; 修改为  response = doc.body.innerText;
