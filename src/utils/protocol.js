import protoRoot from '../pb/proto'
import protobuf from 'protobufjs'

const AuthRequest = protoRoot.lookup('protocol.AuthRequest')
const AuthResponse = protoRoot.lookup('protocol.AuthResponse')
const LogoutRequest = protoRoot.lookup('protocol.LogoutRequest')
const LogoutResponse = protoRoot.lookup('protocol.LogoutResponse')
const C2CSendRequest = protoRoot.lookup('protocol.C2CSendRequest')
const C2CSendResponse = protoRoot.lookup('protocol.C2CSendResponse')
const C2CPushRequest = protoRoot.lookup('protocol.C2CPushRequest')
const C2CPushResponse = protoRoot.lookup('protocol.C2CPushResponse')
const C2GSendRequest = protoRoot.lookup('protocol.C2GSendRequest')
const C2GSendResponse = protoRoot.lookup('protocol.C2GSendResponse')
const C2GPushRequest = protoRoot.lookup('protocol.C2GPushRequest')
const C2GPushResponse = protoRoot.lookup('protocol.C2GPushResponse')
const C2SPullRequest = protoRoot.lookup('protocol.C2SPullMessageRequest')
const C2SPullResponse = protoRoot.lookup('protocol.C2SPullMessageResponse')

const HeaderLength = 12
const Version = 0

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

const versionOffset = 0;
const cmdOffset = 4;
const bodyLengthOffset = 8;

function mergeArrayBuffer(ab1, ab2) {
    let u81 = new Uint8Array(ab1),
        u82 = new Uint8Array(ab2),
        res = new Uint8Array(ab1.byteLength + ab2.byteLength);
    res.set(u81, 0);
    res.set(u82, ab1.byteLength);
    return res.buffer;
}

function newMessage(msg, cmd) {
    let headerBuf = new ArrayBuffer(HeaderLength)
    let headerView = new DataView(headerBuf, 0)
    headerView.setInt32(versionOffset, Version)
    headerView.setInt32(cmdOffset, cmd)
    headerView.setInt32(bodyLengthOffset, msg.length)
    let buf = mergeArrayBuffer(headerBuf, msg)
    return buf
}

function newAuthRequestMessage(data) {
    const msg = AuthRequest.create(data)
    let auth = AuthRequest.encode(msg).finish()
    return newMessage(auth, AuthRequestMessage)
}

function newLogoutRequestMessage (data) {
    const msg = LogoutRequest.create(data)
    let auth = LogoutRequest.encode(msg).finish()
    return newMessage(auth, LogoutRequestMessage)
}

function newC2CSendRequestMessage(data) {
    const msg = C2CSendRequest.create(data)
    let c2c = C2CSendRequest.encode(msg).finish()
    return newMessage(c2c, C2CSendRequestMessage)
}

function newC2CPushResponseMessage(data) {
    const msg = C2CPushResponse.create(data)
    let c2c = C2CPushResponse.encode(msg).finish()
    return newMessage(c2c, C2CPushResponseMessage)
}

function newC2GSendRequestMessage(data) {
    const msg = C2GSendRequest.create(data)
    let c2c = C2GSendRequest.encode(msg).finish()
    return newMessage(c2c, C2GSendRequestMessage)
}

function newC2GPushResponseMessage(data) {
    const msg = C2GPushResponse.create(data)
    let c2c = C2GPushResponse.encode(msg).finish()
    return newMessage(c2c, C2GPushResponseMessage)
}

function newC2SPullRequestMessage(data) {
    const msg = C2SPullRequest.create(data)
    let c2c = C2SPullRequest.encode(msg).finish()
    return newMessage(c2c, C2SPullRequestMessage)
}


function parseMessage(data) {
    let dataView = new DataView(data, 0);
    let version = dataView.getInt32(versionOffset);
    let cmd = dataView.getInt32(cmdOffset);
    let bodyLength = dataView.getInt32(bodyLengthOffset);
    return {version, cmd, bodyLength}
}

function parseAuthResponseMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = AuthResponse.decode(buf)
    return rsp
}

function parseLogoutResponseMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = LogoutResponse.decode(buf)
    return rsp
}

function parseC2CSendResponseMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = C2CSendResponse.decode(buf)
    return rsp
}

function parseC2GSendResponseMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = C2GSendResponse.decode(buf)
    return rsp
}

function parseC2CPushRequestMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = C2CPushRequest.decode(buf)
    return rsp
}

function parseC2GPushRequestMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = C2GPushRequest.decode(buf)
    return rsp
}

function parseC2SPullResponseMessage(data) {
    const buf = protobuf.util.newBuffer(data.slice(HeaderLength))
    let rsp = C2SPullResponse.decode(buf)
    return rsp
}

export {
    newAuthRequestMessage,
    newC2CSendRequestMessage,
    newC2CPushResponseMessage,
    newC2GSendRequestMessage,
    newC2GPushResponseMessage,
    newC2SPullRequestMessage,
    newLogoutRequestMessage,
    parseMessage,
    parseAuthResponseMessage,
    parseC2CSendResponseMessage,
    parseC2CPushRequestMessage,
    parseC2GPushRequestMessage,
    parseC2GSendResponseMessage,
    parseC2SPullResponseMessage,
    parseLogoutResponseMessage
}

