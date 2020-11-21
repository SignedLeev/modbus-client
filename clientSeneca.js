const modbus = require("jsmodbus")
const net = require('net')
const socket = new net.Socket()
module.exports = {socket:socket};
const options = {
    'host': '10.10.3.220',
    'port': '502'
}
//Waiting for connection
var client = new modbus.client.TCP(socket)


socket.on('connect', function () {
    console.log("Client connected to " + options.host + ":" + options.port);
    setInterval(function () {
        //Reading PowerPhase1 Total
        // client.readInputRegisters(0, 2)
        //     .then(function (resp) {
        //         console.log( resp.response._body)
        //     }).catch(function () {
        //     console.error(arguments)
        // })
        //Reading PowerPhase1 Total Max
        client.readHoldingRegisters("AC4D", 10)
            .then(function (resp) {
                console.log("Timestamp " + Date.now())
                console.log(resp.response._body)
                console.log("\n")
            }).catch(function () {
            console.error(arguments)
        })
    }, 5000)

});

socket.on('readCoils', function () {
    let x;
    client.readCoils(0, 8)
        .then(function (resp) {
            x = resp.response
            console.log(resp);
            return x;
            socket.end()
        }).catch(function () {
        console.error(arguments)
        socket.end()
    })
    return x;
})

socket.on('writeCoil', function () {
    let x;
    client.writeSingleCoil(17, false)
        .then(function (resp) {
            console.log(resp)
            socket.end()
        }).catch(function () {
        console.error(arguments)
        socket.end()
    })
    return x;
})

socket.on('error', console.error)
socket.connect(options)

// socket.on('connect', function () {
//     setInterval(function () {
//         client.readHoldingRegisters(0, 2)
//             .then(function (resp) {}).catch(function () {
//             console.error(arguments)
//             socket.end()
//         })
//     }, 200)
// })
