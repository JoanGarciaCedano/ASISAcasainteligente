var gpio = require('rpi-gpio');
var GPIOS = require('onoff').Gpio;

gpio.setup(1, gpio.DIR_IN, readInput1);
gpio.setup(2, gpio.DIR_IN, readInput2);
gpio.setup(3, gpio.DIR_IN, readInput3);
gpio.setup(4, gpio.DIR_IN, readInput4);
gpio.setup(5, gpio.DIR_IN, readInput5);
gpio.setup(6, gpio.DIR_IN, readInput6);
gpio.setup(7, gpio.DIR_IN, readInput7);
gpio.setup(8, gpio.DIR_IN, readInput8);
gpio.setup(9, gpio.DIR_IN, readInput9);
gpio.setup(10, gpio.DIR_IN, readInput10);
gpio.setup(11, gpio.DIR_IN, readInput11);
gpio.setup(12, gpio.DIR_IN, readInput12);
gpio.setup(13, gpio.DIR_IN, readInput13);
gpio.setup(14, gpio.DIR_IN, readInput14);
gpio.setup(15, gpio.DIR_IN, readInput15);
gpio.setup(16, gpio.DIR_IN, readInput16);
gpio.setup(17, gpio.DIR_IN, readInput17);
gpio.setup(18, gpio.DIR_IN, readInput18);
gpio.setup(19, gpio.DIR_IN, readInput19);
gpio.setup(20, gpio.DIR_IN, readInput20);
gpio.setup(21, gpio.DIR_IN, readInput21);
gpio.setup(22, gpio.DIR_IN, readInput22);
gpio.setup(23, gpio.DIR_IN, readInput23);
gpio.setup(24, gpio.DIR_IN, readInput24);
gpio.setup(25, gpio.DIR_IN, readInput25);
gpio.setup(26, gpio.DIR_IN, readInput26);
gpio.setup(27, gpio.DIR_IN, readInput27);
gpio.setup(28, gpio.DIR_IN, readInput28);
gpio.setup(29, gpio.DIR_IN, readInput29);
gpio.setup(30, gpio.DIR_IN, readInput30);
gpio.setup(31, gpio.DIR_IN, readInput31);
gpio.setup(32, gpio.DIR_IN, readInput32);
gpio.setup(33, gpio.DIR_IN, readInput33);
gpio.setup(34, gpio.DIR_IN, readInput34);
gpio.setup(35, gpio.DIR_IN, readInput35);
gpio.setup(36, gpio.DIR_IN, readInput36);
gpio.setup(37, gpio.DIR_IN, readInput37);
gpio.setup(38, gpio.DIR_IN, readInput38);
gpio.setup(39, gpio.DIR_IN, readInput39);
gpio.setup(40, gpio.DIR_IN, readInput40);

function readInput1() {
    gpio.read(1, function(err, value) {
        console.log('El valor del pin 1 es: ' + value);
    });
}

function readInput2() {
    gpio.read(2, function(err, value) {
        console.log('El valor del pin 2 es: ' + value);
    });
}

function readInput3() {
    gpio.read(3, function(err, value) {
        console.log('El valor del pin 3 es: ' + value);
    });
}

function readInput4() {
    gpio.read(4, function(err, value) {
        console.log('El valor del pin 4 es: ' + value);
    });
}

function readInput5() {
    gpio.read(5, function(err, value) {
        console.log('El valor del pin 5 es: ' + value);
    });
}

function readInput6() {
    gpio.read(6, function(err, value) {
        console.log('El valor del pin 6 es: ' + value);
    });
}

function readInput7() {
    gpio.read(7, function(err, value) {
        console.log('El valor del pin 7 es: ' + value);
    });
}

function readInput8() {
    gpio.read(8, function(err, value) {
        console.log('El valor del pin 8 es: ' + value);
    });
}

function readInput9() {
    gpio.read(9, function(err, value) {
        console.log('El valor del pin 9 es: ' + value);
    });
}

function readInput10() {
    gpio.read(10, function(err, value) {
        console.log('El valor del pin 10 es: ' + value);
    });
}

function readInput11() {
    gpio.read(11, function(err, value) {
        console.log('El valor del pin 11 es: ' + value);
    });
}

function readInput12() {
    gpio.read(12, function(err, value) {
        console.log('El valor del pin 12 es: ' + value);
    });
}

function readInput13() {
    gpio.read(13, function(err, value) {
        console.log('El valor del pin 13 es: ' + value);
    });
}

function readInput14() {
    gpio.read(14, function(err, value) {
        console.log('El valor del pin 14 es: ' + value);
    });
}

function readInput15() {
    gpio.read(15, function(err, value) {
        console.log('El valor del pin 15 es: ' + value);
    });
}

function readInput16() {
    gpio.read(16, function(err, value) {
        console.log('El valor del pin 16 es: ' + value);
    });
}

function readInput17() {
    gpio.read(17, function(err, value) {
        console.log('El valor del pin 17 es: ' + value);
    });
}

function readInput18() {
    gpio.read(18, function(err, value) {
        console.log('El valor del pin 18 es: ' + value);
    });
}

function readInput19() {
    gpio.read(19, function(err, value) {
        console.log('El valor del pin 19 es: ' + value);
    });
}

function readInput20() {
    gpio.read(20, function(err, value) {
        console.log('El valor del pin 20 es: ' + value);
    });
}

function readInput21() {
    gpio.read(21, function(err, value) {
        console.log('El valor del pin 21 es: ' + value);
    });
}

function readInput22() {
    gpio.read(22, function(err, value) {
        console.log('El valor del pin 22 es: ' + value);
    });
}

function readInput23() {
    gpio.read(23, function(err, value) {
        console.log('El valor del pin 23 es: ' + value);
    });
}

function readInput24() {
    gpio.read(24, function(err, value) {
        console.log('El valor del pin 24 es: ' + value);
    });
}

function readInput25() {
    gpio.read(25, function(err, value) {
        console.log('El valor del pin 25 es: ' + value);
    });
}

function readInput26() {
    gpio.read(26, function(err, value) {
        console.log('El valor del pin 26 es: ' + value);
    });
}

function readInput27() {
    gpio.read(27, function(err, value) {
        console.log('El valor del pin 27 es: ' + value);
    });
}

function readInput28() {
    gpio.read(28, function(err, value) {
        console.log('El valor del pin 28 es: ' + value);
    });
}

function readInput29() {
    gpio.read(29, function(err, value) {
        console.log('El valor del pin 29 es: ' + value);
    });
}

function readInput30() {
    gpio.read(30, function(err, value) {
        console.log('El valor del pin 30 es: ' + value);
    });
}

function readInput31() {
    gpio.read(31, function(err, value) {
        console.log('El valor del pin 31 es: ' + value);
    });
}

function readInput32() {
    gpio.read(32, function(err, value) {
        console.log('El valor del pin 32 es: ' + value);
    });
}

function readInput33() {
    gpio.read(33, function(err, value) {
        console.log('El valor del pin 33 es: ' + value);
    });
}

function readInput34() {
    gpio.read(34, function(err, value) {
        console.log('El valor del pin 34 es: ' + value);
    });
}

function readInput35() {
    gpio.read(35, function(err, value) {
        console.log('El valor del pin 35 es: ' + value);
    });
}

function readInput36() {
    gpio.read(36, function(err, value) {
        console.log('El valor del pin 36 es: ' + value);
    });
}

function readInput37() {
    gpio.read(37, function(err, value) {
        console.log('El valor del pin 37 es: ' + value);
    });
}

function readInput38() {
    gpio.read(38, function(err, value) {
        console.log('El valor del pin 38 es: ' + value);
    });
}

function readInput39() {
    gpio.read(39, function(err, value) {
        console.log('El valor del pin 39 es: ' + value);
    });
}

function readInput40() {
    gpio.read(40, function(err, value) {
        console.log('El valor del pin 40 es: ' + value);
    });
}
