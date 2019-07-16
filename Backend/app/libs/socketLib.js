// /*
//  * modules dependencies.
//  */
// const socketio = require('socket.io');
// const mongoose = require('mongoose');
// const shortid = require('shortid');
// const logger = require('./loggerLib');
// const events = require('events');
// const eventEmitter = new events.EventEmitter();

// const tokenLib = require('./tokenLib');
// const check = require('./checkLib');
// const response = require('./responseLib');

// const time = require('./timeLib');

// //const NotificationModel = mongoose.model('Notification');

// //const redisLib = require('./redisLib')
// const friendLib = require('./friendListLib')

// var dataSS = [];

// const allUsers = [];

// var rooms = [];
// let setServer = (server) => {
//     console.log('socketServer called');
//     let io = socketio.listen(server);
//     let myIo = io.of('/chat');

//     myIo.on('connection', (socket) => {
//         rooms = [];
//         console.log("on connection emitting verify user");
//         socket.emit("verifyUser", "verifying user");

//         //code to verify the user and make him online
//         socket.on('set-user', (authToken) => {
//             console.log("set-user called")
//             tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
//                 if (err) {
//                     socket.emit('auth-error', {
//                         status: 500,
//                         error: 'Please provide valid auth token'
//                     })
//                 } else {
//                     console.log('user is verified, setting details');
//                     let currentUser = user.data;
//                     console.log('\n\n\n\n\n\ncurrentUser');
//                     console.log(currentUser);
//                     //setting socket user id

//                     socket.userId = currentUser._id;

//                     friendLib.getAllFriendsId(currentUser._id, (err, result) => {
//                         if (err) {
//                             socket.emit('auth-error', {
//                                 status: 500,
//                                 error: 'Please provide valid auth token'
//                             })
//                         } else {
//                             console.log('result ' + currentUser.name)
//                             console.log(result)
//                             result.forEach(element => {
//                                 let room = '';
//                                 // currentUser._id === element.userId._id ? room = element.sentTo._id + 'Room' : room = element.userId._id + 'Room'
//                                 room = element + 'Room';
//                                 var index = rooms.indexOf(room);
//                                 if (index < 0)
//                                     rooms.push(room)
//                             });
//                             // console.log('\n\n\n\n\ntotal rooms')
//                             // console.log(rooms)
//                             rooms.forEach(e => {
//                                 let key = e;
//                                 userId = currentUser._id;
//                                 socketId = socket.id;
//                                 let d = [];

//                                 let value = {
//                                     userId: userId,
//                                     socketId: socketId
//                                 };
//                                 d.push(value);

//                                 // redisLib.getASingleDataFromHash("roomDa", key, (err, response) => {
//                                 //     if (err) {
//                                 //         console.log(err + "some error occurred")
//                                 //     } else if (!response) {
//                                 //         redisLib.setANewOnlineUserInHash("roomDa", key, JSON.stringify(d),
//                                 //             (error, result) => {
//                                 //                 if (error)
//                                 //                     console.log("some error occurred while saving user to hash " + err)
//                                 //                 else {
//                                 //                     console.log('socketLib user inserted in hash ' + result);
//                                 //                 }
//                                 //             })
//                                 //     } else {
//                                 //         let oldValues = JSON.parse(response);
//                                 //         // console.log('socket lib ln 107')
//                                 //         // console.log(oldValues)
//                                 //         let findData = oldValues.find(x => x.userId === userId)
//                                 //         if (!findData) {
//                                 //             oldValues.push(value);
//                                 //             redisLib.setANewOnlineUserInHash("roomDa", key, JSON.stringify(oldValues),
//                                 //                 (er, res) => {
//                                 //                     if (er)
//                                 //                         console.log("some error occurred while saving user to hash " + err)
//                                 //                     else {
//                                 //                         // console.log('socketLib user inserted in hash ' + res);
//                                 //                     }
//                                 //                 })
//                                 //         } else {

//                                 //         }
//                                 //     }
//                                 // })
//                             });

//                             // // socket.room = key;
//                             // // socket.join(room);
//                             createRoom()

//                                 .then((resolve) => {
//                                     // redisLib.getAllUsersInAHash("roomDa", (err, result) => {
//                                     //     console.log('All users in hash')
//                                     //     console.log(result)
//                                     // })

//                                     socketssss = myIo;
//                                     //  d=[];
//                                     // sockets = myIo.in('dlx_cQZ6nRoom');
//                                     // Object.keys(sockets.sockets).forEach((item) => {
//                                     //     d.push(sockets.sockets[item])
//                                     //     console.log("TODO: Item:", sockets.sockets[item].userId)
//                                     // })
//                                     // sockets = myIo.in("dlx_cQZ6nRoom")
//                                     // Object.keys(sockets.sockets).forEach((item) => {
//                                     //     console.log("TODO: Item:", sockets.sockets[item].userId)
//                                     // })
//                                 })
//                         }
//                     });
//                     createRoom = () => {
//                         return new Promise((resolve, reject) => {
//                             for (room in rooms) {
//                                 socket.userId = currentUser._id;
//                                 socket.room = rooms[room];
//                                 socket.join(rooms[room])
//                             }
//                             resolve();
//                         });
//                     }
//                 }
//             })
//         }) // end of listening set-user event

//         socket.on('disconnect', () => {
//             console.log('user is disconnected');
//             console.log(socket.userId);
//             if (socket.userId) {
//                 socket.leaveAll();
//             }
//         }) //end of on disconnect

//         //once a new issue is created and send toast to assignee
//         socket.on('notify-assignee', (newIssueData) => {
//             debugger;

//             let roomName = newIssueData.issueId + 'Room';
//             assignee = newIssueData.assignee;

//             socket.userId = newIssueData.createdBy;
//             socket.room = roomName;
//             socket.join(roomName);

//             let allConnectedSockets = myIo.connected;
//             let assigneeSocket = '';
//             Object.keys(allConnectedSockets).forEach(e => {
//                 if (allConnectedSockets[e].userId === assignee) {
//                     assigneeSocket = allConnectedSockets[e];
//                 }
//             })
//             if (!check.isEmpty(assigneeSocket)) {
//                 assigneeSocket.room = roomName;
//                 assigneeSocket.join(roomName);
//             }

//             let assdsss = myIo;
//             dataObj = {
//                 issueId: newIssueData.issueId
//             }

//             socket.to(roomName)
//                 .broadcast.emit('new-issue-created', dataObj);

//         });

//         socket.on('add-watcher',(data) =>{
//             let roomName = data.roomName + 'Room';
//             socket.room = roomName;
//             socket.join(roomName);
//         });

//         //once a issue is upadted and there's change in watcher
//         socket.on('update-user', (data) => {
//             let roomName = data.issueId + 'Room';
//             let userId = data.oldAssignee;
//             let newAssignee = data.newAssignee;
//             let createdBy = data.createdBy
//             debugger;
//             d = [];
//             sockets = myIo.in(roomName);
//             Object.keys(sockets.sockets).forEach((item) => {
//                 d.push(sockets.sockets[item])
//             })
//             socketToRemove = ''; assigneeAlreadyExist = false;
//             d.forEach(e => {
//                 roomArry = [];
//                 Object.keys(e.rooms).forEach((item) => {
//                     roomArry.push(e.rooms[item]);
//                 });
//                 if (roomArry != null && roomArry.length > 0)
//                     findRoomAvailable = roomArry.find(x => x === roomName);

//                 if (findRoomAvailable) {
//                     if (e.userId === userId) {
//                         socketToRemove = e;
//                     }
//                     if (e.userId === newAssignee) {
//                         assigneeAlreadyExist = true;
//                     }
//                 }
//             })
//             if (!assigneeAlreadyExist) {
//                 let allConnectedSockets = myIo.connected;
//                 let assigneeSocket = '';
//                 Object.keys(allConnectedSockets).forEach(e => {
//                     if (allConnectedSockets[e].userId === newAssignee) {
//                         assigneeSocket = allConnectedSockets[e];
//                     }
//                 })
//                 if (!check.isEmpty(assigneeSocket)) {
//                     assigneeSocket.room = roomName;
//                     assigneeSocket.join(roomName);
//                 }
//             }
//             let dataObj = {
//                 issueId: data.issueId,
//                 title: data.title
//             };
            
//             if (!check.isEmpty(socketToRemove) && createdBy != userId) {
//                 socketToRemove.leave(roomName);
//             }
//             socket.to(roomName)
//                 .broadcast.emit('user-updated-data', dataObj);

//         })
//         //once issue is updated
//         socket.on('update-issue', (data) => {
//             let roomName = data.issueId + 'Room';
//             console.log('roomName')
//             console.log(roomName)
//             let dataObj = {
//                 issueId: data.issueId,
//                 title: data.title
//             };
//             socket.to(roomName)
//                 .broadcast.emit('issue-updated-data', dataObj);
//         })
//         //once receive a comment
//         socket.on('comment-post', (data) => {
//             let roomName = data.issueId + 'Room';
//             console.log('roomName')
//             console.log(roomName)
//             let dataObj = {
//                 issueId: data.issueId,
//                 title: data.title,
//             };
//             socket.to(roomName)
//                 .broadcast.emit('comment-posted-notification', dataObj);
//         })
//         // socket.on('friend-request', (data) => {
//         //     console.log("socket friend-request called")
//         //     let newData = {
//         //         notificationId: shortid.generate(),
//         //         senderId: data.userId_id,
//         //         receiverId: data.sentTo_id,
//         //         message: `You've received a friend request from ${data.senderName}`,
//         //         createdOn: time.now()
//         //     };

//         //     console.log(newData)
//         //         // event to save chat.
//         //     setTimeout(function() {
//         //         eventEmitter.emit('save-request', newData);
//         //     }, 2000)

//         //     console.log('noti');
//         //     console.log(newData);
//         //     myIo.emit(data.sentTo_id, newData)
//         // })

//         // socket.on('typing', (fullName) => {
//         //     socket.to(socket.room).broadcast.emit('typing', fullName);
//         // })
//     });
// }


// // database operations are kept outside of socket.io code.

// // saving chats to database.
// // eventEmitter.on('save-request', (data) => {

// //     let notificationObj = new NotificationModel(data);
// //     notificationObj.save((err, result) => {
// //         if (err) {
// //             console.log(`error occurred: ${err}`);
// //         } else if (result === undefined || result === null || result === "") {
// //             console.log("Notification is not saved.");
// //         } else {
// //             console.log("notification saved.");
// //             console.log(result);
// //             dataSS = result;
// //         }
// //     });
// // }); // end of saving notifications.

// module.exports = {
//     setServer: setServer
// }



const express = require('express')
const events = require('events')
const eventEmitter = new events.EventEmitter() //new eventEmitter instance
const socketio = require('socket.io')
const shortid = require('shortid')
//const response = require('./response')
const logger = require('./loggerLib')
const mongoose = require('mongoose')
const tokenLib = require('./tokenLib')
const check = require('./checkLib')

//const FriendListModel = require('../model/FriendList');
//here server is http server initialized in app.js
let setServer = (server) => {

    //socket initialization
    let io = socketio.listen(server)
    let myIo = io.of('') //no namespace

    //main event handler,inside this series of events can be handled
    myIo.on('connection', (socket) => {
        console.log("on connection success => emitting verify user");
        socket.emit("verifyUser", ""); //event emit=>listening on frontend

        //to set user via verifying authToken received via verifyUser event
        //event set-user listening emitted on frontend
        socket.on('set-user', (authToken) => {
            console.log("set-user called")
            if (check.isEmpty(authToken)) {
                console.log('Empty authToken')
            } else {
                tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                    if (err) {
                        socket.emit('auth-error', {
                            status: 500,
                            error: 'Please provide correct auth token'
                        })
                    } else {

                        console.log("user is verified..setting details");
                        let currentUser = user.data;
                        console.log(currentUser)
                        // setting socket user id 
                        socket.userId = currentUser.userId
                        let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                        let key = currentUser.userId
                        let value = fullName

                    }
                })
            }
        })

        //event listening
        //friend-info event emitted from frontend
        socket.on('friend-info', (senderInfo) => {
            console.log(senderInfo);

            let notification = {
                senderId: senderInfo.senderId,
                receiverId: senderInfo.receiverId,
                message: `You have received friend request from ${senderInfo.userName}`
            }
            //emit receiverId event across all(pipes) passing notifcation
            //on frontend userId matching receiverId will receive data
            myIo.emit(senderInfo.receiverId, notification)
        }) //end socket listening with event(friend-info)

        socket.on('accept-request', (receiverInfo) => {
            console.log(receiverInfo)
            let notification = {
                senderId: receiverInfo.senderId,
                message: `${receiverInfo.userName} has accepted your request`
            }
            myIo.emit('fRAccept'+receiverInfo.senderId, notification)
        }) //end socket listening

        socket.on('multi-todo-create', (data) => {
            FriendListModel.find({
                    'senderId': data.senderId
                })
                .select('receiverId')
                .lean()
                .exec((err, result) => {
                    if (result && result.length > 0) {

                        console.log('result')
                        console.log(result)
                        for (let d of result) {
                            console.log('\n\ncreate' + d.receiverId)
                            myIo.emit('create' + d.receiverId, data.message);
                        }
                    }
                })
        })

        socket.on('logout',(userId)=>{
            socket.disconnect();
        })
        socket.on('disconnect', () => {
            console.log('user is disconnected');
            console.log(socket.userId);
        }) //end of on disconnect

    }) //end main socket 'connection
} //end setServer


module.exports = {
    setServer: setServer
}