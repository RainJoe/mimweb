<template>
    <div class="hello">
        <div class="receive"></div>
        <div class="send">
            <div>
                <span>消息内容: </span>
                <input type="text" v-model="msgToSend" style="width: 80%">
            </div>
            <div>
                <span>接收者id: </span>
                <input type="text" v-model="toId" style="width: 80%">
            </div>
            <div>
                <span>群组id: </span>
                <input type="text" v-model="groupId" style="width: 80%">
            </div>
            <button @click="handleClick">发送</button>
            <button @click="handleClickGroup">群发送</button>
            <button @click="handleClickPull">拉取离线</button>
            <button @click="handleClickLogout">断开连接</button>
        </div>
        <div class="log">send: {{sendMsg}} recv: {{recvMsg}}</div>
    </div>
</template>

<script>
    import {
        newAuthRequestMessage,
        newC2CSendRequestMessage,
        newC2GPushResponseMessage,
        newC2SPullRequestMessage,
        newLogoutRequestMessage,
        parseAuthResponseMessage,
        parseMessage,
        parseC2CSendResponseMessage,
        parseC2CPushRequestMessage,
        newC2CPushResponseMessage,
        newC2GSendRequestMessage,
        parseC2GSendResponseMessage,
        parseC2GPushRequestMessage,
        parseLogoutResponseMessage,
        parseC2SPullResponseMessage
    } from '../utils/protocol'

    const HeartBeatRequestMessage = 0
    const HeartBeatResponseMessage = 1
    const AuthRequestMessage = 2
    const AuthResponseMessage = 3
    const LogoutRequestMessage = 4
    const LogoutResponseMessage = 5
    const C2CSendRequestMessage = 6
    const C2CSendResponseMessage = 7
    const C2CPushRequestMessage = 8
    const C2CPushResponseMessage = 9
    const C2GSendRequestMessage = 10
    const C2GSendResponseMessage = 11
    const C2GPushRequestMessage = 12
    const C2GPushResponseMessage = 13
    const C2SPullRequestMessage = 14
    const C2SPullResponseMessage = 15

    export default {
        name: 'HelloWorld',
        data() {
            return {
                websock: null,
                sendMsg: "",
                recvMsg: "",
                msgToSend: "",
                groupId: "",
                toId: ""
            }
        },
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.websock.close() //离开路由之后断开websocket连接
        },
        methods: {
            initWebSocket() { //初始化weosocket
                const wsuri = "ws://127.0.0.1:8080/ws"
                this.websock = new WebSocket(wsuri)
                this.websock.onmessage = this.websocketonmessage
                this.websock.onopen = this.websocketonopen
                this.websock.onerror = this.websocketonerror
                this.websock.onclose = this.websocketclose
                this.websock.binaryType = 'arraybuffer'
            },
            websocketonopen() { //连接建立之后执行send方法发送数据
                const data = {
                    token: "token",
                    uid: this.$route.params.id,
                    ts: new Date().getTime(),
                }
                let authReq = newAuthRequestMessage(data)
                this.websocketsend(authReq)
                this.sendMsg = data
            },
            websocketonerror() {//连接建立失败重连
                this.initWebSocket()
            },
            websocketonmessage(evt) { //数据接收
                let message = parseMessage(evt.data)
                switch (message.cmd) {
                    case AuthResponseMessage:
                        let auth = parseAuthResponseMessage(evt.data)
                        this.recvMsg = auth
                        break
                    case LogoutResponseMessage:
                        break
                    case C2CSendResponseMessage:
                        let c2cs = parseC2CSendResponseMessage(evt.data)
                        this.recvMsg = c2cs
                        break
                    case C2GSendResponseMessage:
                        let c2gs = parseC2GSendResponseMessage(evt.data)
                        this.recvMsg = c2gs
                        break
                    case C2CPushRequestMessage:
                        let c2cp = parseC2CPushRequestMessage(evt.data)
                        this.recvMsg = c2cp
                        let m = newC2CPushResponseMessage({msgId: c2cp.msgId})
                        this.websocketsend(m)
                        break
                    case C2GPushRequestMessage:
                        let c2gp = parseC2GPushRequestMessage(evt.data)
                        this.recvMsg = c2gp
                        let rspg = {
                            msgId: c2gp.msgId
                        }
                        let mg = newC2GPushResponseMessage(rspg)
                        this.websocketsend(mg)
                        break
                    case C2SPullResponseMessage:
                        let c2s = parseC2SPullResponseMessage(evt.data)
                        this.recvMsg = c2s
                    default:
                        break
                }
            },
            websocketsend(Data) {//数据发送
                this.websock.send(Data)
            },
            websocketclose(e) {  //关闭
                console.log('断开连接', e)
            },
            handleClick() {
                let data = {
                    to: this.toId,
                    from: this.$route.params.id,
                    content: this.msgToSend,
                    ts: new Date().getTime(),
                }
                let msg = newC2CSendRequestMessage(data)
                this.websocketsend(msg)
            },
            handleClickGroup() {
                let data = {
                    from: this.$route.params.id,
                    group: this.groupId,
                    content: this.msgToSend,
                    ts: new Date().getTime()
                }
                let msg = newC2GSendRequestMessage(data)
                this.websocketsend(msg)
            },
            handleClickPull() {
                let data = {
                    uid: this.$route.params.id,
                    limit: 10,
                    ts: new Date().getTime()
                }
                let msg = newC2SPullRequestMessage(data)
                this.websocketsend(msg)
            },
            handleClickLogout() {
                let data = {
                    token: 'token',
                    uid: this.$route.params.id,
                    ts: new Date().getTime()
                }
                let msg = newLogoutRequestMessage(data)
                this.websocketsend(msg)
            },
        },
    }
</script>
