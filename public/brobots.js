//Debug fxn for running tests
var DEBUG = true;
/////// GLOBAL VARS 
var GLOBAL = {};
//Get user type from url
GLOBAL.userType = (document.URL).replace(/.*(?=(driver|brobot|gripper))/, "");
GLOBAL.userID = Math.round(Math.random()*1127640+13);

//Socket Connection
var socket = io.connect('http://localhost:3000');


//Test socket for bot data
socket.on('updated-bot-data', function(botData) {
    receivedBotDataFromServer(botData);
});

//Client Type Names
var CLIENT_TYPE = {
    driver: 'driver',
    brobot: 'brobot',
    gripper: 'gripper'
}



//Driver Test Function
function testDriveData() {
 sendDriveDataToServer(1,2,3,4);


}

//Gripper Test
function testGripData() {
 sendGripDataToServer(9,10);
}

if (DEBUG) {
    console.log("USER_TYPE: " + GLOBAL.userType);
    testGripData();
    testDriveData();
}



//Receive Bot data from server
function receivedBotDataFromServer(botData) {
    if (GLOBAL.userType.toLowerCase() == CLIENT_TYPE.brobot) {
        var numValues = botData.values;
        if (numValues == 2) {
            console.log("Bot Received Grip Data: " + botData );
            console.log(botData);
        }
        else if ( numValues == 4) {
            console.log("Bot Received Drive Data!");
            console.log(botData);
        }
        
    }
}


//Send Gripper Data to Server through Socket
function sendGripDataToServer(angle1, angle2) {
    if (GLOBAL.userType.toLowerCase() == CLIENT_TYPE.gripper) {
        angle1 = (angle1) ? angle1 : 0.0;
        angle2 = (angle2) ? angle2 : 0.0; 

        var gripData = {
            angle1: angle1,
            angle2: angle2,
            values: 2
        };
        socket.emit('updated-grip-data', gripData);
    }
}

//Send Driver Data to Server through Socket
function sendDriveDataToServer(m1Dir, m1PWM, m2Dir, m2PWM) {
    if (GLOBAL.userType.toLowerCase() == CLIENT_TYPE.driver) {
        m1Dir = (m1Dir) ? m1Dir : 0.0;
        m1PWM = (m1PWM) ? m1PWM : 0.0; 
        m2Dir = (m2Dir) ? m2Dir : 0.0; 
        m2PWM = (m2PWM) ? m2PWM : 0.0;  


        var driveData = {
            m1Dir: m1Dir,
            m1PWM: m1PWM,
            m2Dir: m2Dir,
            m2PWM: m2PWM,
            values: 4
        };

        socket.emit('updated-drive-data', driveData);
    }
}


