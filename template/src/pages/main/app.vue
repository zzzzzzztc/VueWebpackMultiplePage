<template>
<div>
    <divider>使用简单卡片头部和内容slot</divider>
    <card :header="{title:msg}">
        <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-l vux-1px-r">
                <span>1130</span>
                <br/> 京豆
            </div>
            <div class="vux-1px-r">
                <span>15</span>
                <br/> 京东券
            </div>
            <div class="vux-1px-r">
                <span>0</span>
                <br/> 京东卡/E卡
            </div>
            <div>
                <span>88</span>
                <br/> 七天待还
            </div>
        </div>
    </card>
    <br>
    <divider>简单头部,简单底部带链接</divider>
    <card :header="{title:'商品详情(简单头部)'}" :footer="{title:'设置(简单底部带链接)',link:settingUri}">
        <p slot="content" class="card-padding">
            这里是内容
            <Button v-touch:tap="loginAction" text="设&nbsp;&nbsp;置"></Button>
        </p>
    </card>
    <br>
    <divider>使用头部slot和内容slot</divider>
    <card>
        <tip slot="header" style="padding:10px;">2个头部:tip,image</tip>
        <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
        <div slot="content" class="card-padding">
            <p style="color:#999;font-size:12px;">2016-07-31 07:42:45</p>
            <p style="font-size:14px;line-height:1.2;padding-top:10px;">C语言终于超越了Java，登顶榜首．Python超过C++成为第三名，C#被R顶出前五．最近几年R一路飙升，主要是由于乘上了大数据分析的浪潮．</p>
        </div>
    </card>
</div>
</template>
<script>
import Tip from 'vux-components/tip';
import Divider from 'vux-components/Divider';
import Card from 'vux-components/card';
import {
    config,
    common,
    pages
}
from 'assets/Lib.js';
import Button from 'components/Button';
export default {
    components: {
        Tip,
        Card,
        Divider,
        Button
    },
    ready() {},
    data() {
        return {
            msg: "我的钱包(简单头部)",
            settingUri: pages["my.setting"].web
        }
    },
    asyncData: function(resolve, reject) {
        this.$http.get('http://demo.dcloud.net.cn/test/xhr/json.php')
            .then(function(response) {
                var data = JSON.parse(response.data);
                setTimeout(() => {
                    resolve({
                        msg: data.string
                    });
                }, 3000);
            }, function(response) {
                // handle error
            });
    },
    methods: {
        //登陆操作
        loginAction() {
            window.location.href = this.settingUri;
        }
    }
}
</script>

<style scoped lang="less">
.card-demo-flex {
    display: flex;
}
.card-demo-content01 {
    padding: 10px 0;
}
.card-padding {
    padding: 15px 20px;
}
.card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
}
.card-demo-flex span {
    color: #f74c31;
}
.btnstyle {
    border-radius: 100px;
    margin-top: 30px;
}
</style>
