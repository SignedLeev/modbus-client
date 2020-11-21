const modbus = require("jsmodbus")
const net = require('net')
const socket = new net.Socket()
module.exports = {socket: socket};
const options = {
    'host': '10.49.1.21',
    'port': '502'
}
var client = new modbus.client.TCP(socket)


socket.on('connect', function () {
    console.log("Client connected to " + options.host + ":" + options.port);
    // setInterval(function () {
    ////INPUT REGISTERS
        let InputRegisters = [1,2,4,65,66,68,"2328","232A","232C","232E"]
        for(let i = 0; i < InputRegisters.length; i++) {
            client.readInputRegisters(InputRegisters[i], 10)
                .then(function (resp) {
                    console.log("Input register number: " + InputRegisters[i] + "\n")
                    console.log(resp.response)
                    console.log("\n")
                }).catch(function () {
                console.error(arguments)
            })}
        //HOLDING REGISTERS
        // let HoldingRegisters = ["1F40","1F42","1F44","1F46","1F48","1F4A","2328","232A","232B"]
        // for(let i = 0; i < HoldingRegisters.length; i++) {
        //     client.readHoldingRegisters(HoldingRegisters[i], 10)
        //         .then(function (resp) {
        //             console.log("Holding register number:  " + HoldingRegisters[i] + "\n")
        //             console.log(resp.response._body)
        //             console.log("\n")
        //         }).catch(function () {
        //         console.error(arguments)
        //     })}
        // }, 5000);

    // client.writeSingleRegister("1F40",  0x0000)
    //     .then(function (resp) {
    //         console.log(resp)
    //         // socket.end()
    //     }).catch(function () {
    //     console.error(arguments)
    //     // socket.end()
    // })
    // client.writeSingleRegister("1F41",  0x1B58)
    //     .then(function (resp) {
    //         console.log(resp)
    //         // socket.end()
    //     }).catch(function () {
    //     console.error(arguments)
    //     // socket.end()
    // })
    // client.writeSingleRegister("2328",  0x0000)
    //     .then(function (resp) {
    //         console.log(resp)
    //         // socket.end()
    //     }).catch(function () {
    //     console.error(arguments)
    //     // socket.end()
    // })
    // client.writeSingleRegister("2329",  0x1B58)
    //     .then(function (resp) {
    //         console.log(resp)
    //         // socket.end()
    //     }).catch(function () {
    //     console.error(arguments)
    //     // socket.end()
    // })
});

socket.on('error', console.error)
socket.connect(options)

