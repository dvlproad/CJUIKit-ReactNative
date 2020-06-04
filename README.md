# CJUIKit-ReactNative
CJUIKit-ReactNative





## curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused的几种解决方式

参考文章：[curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused的几种解决方式](https://www.jianshu.com/p/c2e829027b0a)

### 1. 解决方式一

> 1.查看网址

打开网站[https://www.ipaddress.com/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.ipaddress.com%2F)
 查询一下  `raw.githubusercontent.com`对应的IP 地址



2.替换系统的`host`文件

```
1、终端 open /etc
2、拷贝该目录下的host文件出来，并进行修改
添加 199.232.68.133 githubusercontent.com
3、拷贝回去
```





```
npm config get registry

npm config set registry http://registry.npmjs.org

npm login
npm publish
```





## ChangeLog

* 2020-03-16
  * 增加SectionTableView在底部不能操作的手机上的适配
  * 增加 cjrn-demo-base  的主题设置



1、创建初始化工程

`react-native init CJUIKitReactNativeDemo`

2、安装基础库

①安装 `react-navigation`

`npm install react-navigation --save` 或 `yarn add react-navigation`

②安装 react-native-gesture-handler 

```
$ npm install --save react-native-gesture-handler
# or with yarn
# yarn add react-native-gesture-handler
```

1. 链接所有依赖项:

```
$ react-native link
```





```
yarn add react-native-root-toast
yarn add react-native-svg

```







