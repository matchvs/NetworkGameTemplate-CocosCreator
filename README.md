# NetworkGameTemplate-CocosCreator

CocosCreator静态联网案例，本案例适用于CocosCreate2.0+版本。

## 1: 联网案例体验

本页面主要展示Matchvs向大家提供的游戏demo与游戏案例，其中贪吃星球，游侠姐妹已经登录微信小游戏平台，参考案例可以快速打造微信小游戏。demo功能比较齐全，实现了帧同步等功能。代码可以在官网下载，同时我们在github同步更新我们的demo与案例。

## 2: 联网流程

本页面主要展示Matchvs的基本交互流程，适用于新手了解联网接入过程及API使用方法。

## 3：范例说明

本页面主要展示对静态联网案例的说明。链接到官网文档页面。

## 4：代码分析

ExamplesData.js 主要存放MatchvsSDK 游戏信息，例如 gameID，appKey，secret信息。如何创建游戏请参考：[http://www.matchvs.com/service?page=creatorStart]

matchvs.all.js  本文件是MatchvsJS SDK。

Matchvs.js 统一加载JSSDK。

MatchvsEngine.js 封装了使用的Matchvs的请求方法。

MatchvsResponse.js 封装了Matchvs的异步请求回调方法，通过cocos提供的事件传递方法进行事件传递。cocos事件传递请参考 [http://docs.cocos.com/creator/manual/zh/scripting/events.html?h=%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92]

MatvhsvsMessage.js 自定义了事件传递所需的常量。

CaseExperience.js  联网案例体验脚本。

NetworkFlow.js 联网流程脚本。

ExampleExplain.js 范例说明脚本。

index.js 首页脚本。





