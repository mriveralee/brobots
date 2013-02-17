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
function sendDriveDataToServer(m1PWM, m1Dir, m2PWM, m2Dir) {
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

///////////Leap Motion Web Socket
var ws;

// Support both the WebSocket and MozWebSocket objects
if ((typeof(WebSocket) == 'undefined') &&
    (typeof(MozWebSocket) != 'undefined')) {
  WebSocket = MozWebSocket;
}

// Create the socket with event handlers
function init() {
  //Create and open the socket
  ws = new WebSocket("ws://localhost:6437/");

  // On successful connection
  ws.onopen = function(event) {
    document.getElementById("main").style.visibility = "visible";
    document.getElementById("connection").innerHTML = "WebSocket connection open!";
  };
  
  // On message received
  ws.onmessage = function(event) {
    var obj = JSON.parse(event.data);
    var str = JSON.stringify(obj, undefined, 2);

     if (GLOBAL.userType.toLowerCase() == CLIENT_TYPE.brobot) {
      return;
    } else if (GLOBAL.userType.toLowerCase() == CLIENT_TYPE.driver) {
      captureDriverData(obj);
    } else  if (GLOBAL.userType.toLowerCase() == CLIENT_TYPE.gripper) {
      captureGripperData(obj);
    }
  }

    // Nick's variables
    const LEFT_lowerYBound = 200; // Calculated empirically
    const LEFT_upperYBound = 500; // Calculated empirically

    const speed = 0.75;           // Maximum duty cycle of motors
    const yaw_scaler_max = 0.5;   // Maximum puck scaler value
    const PWM_lower = 0;                // 10-bit timer
    const PWM_upper = Math.pow(2,10)-1; // Will map to OCR1A on M2


    const RAD2DEG = 180/Math.PI;    // [degrees/radians]
    const RIGHT_yawCCWBound = -35;  // [degrees]
    const RIGHT_yawCWBound = 15;    // [degrees]


    const ROBOT_turningAngle = 45;
    const ROBOT_yawCCWBound = -ROBOT_turningAngle;  // [degrees]
    const ROBOT_yawCWBound = ROBOT_turningAngle;    // [degrees]
    const YAW_mapping = (ROBOT_yawCWBound-ROBOT_yawCCWBound) / (RIGHT_yawCWBound - RIGHT_yawCCWBound);
    

  ///////////////////////////////////////////
  //----Function that captures DRIVER Data---
  ///////////////////////////////////////////
  function captureDriverData(obj) {
    var leftHand;
    var rightHand;
    var PWM_desired = 0;
    var PWM_mapping = (PWM_upper-PWM_lower)/(LEFT_upperYBound-LEFT_lowerYBound);
    var rightStrPitch;// [degrees]
    var rightStrRoll; // [degrees]
    var rightStrYaw;  // [degrees]
    var RIGHT_yaw;    // [degrees]
    var ROBOT_yaw;

    // Output Variables for the driver
    var m1PWM, m1Dir, m2PWM, m2Dir;
    
    // If we don't have both hands recognized, set the motor PWM to 0 so 
    //they won't move!
    if(obj.hands){
      if(obj.hands.length <= 1) {
        PWM_desired = 0;
      }
      else if(obj.hands.length == 2 ) {
        var hasPointables = obj.pointables && obj.pointables.length >= 2;

        var hasFingers = hasPointables && obj.pointables[0].id !== obj.pointables[1].id;
        if (!hasFingers) {
          //Quit function if we don't have more than 2 fingers
          return;
        }
        // ______________________________________
        // +Hand sorting function
        // ______________________________________
        // Compare hand positions along the X-axis: Left hand is more negative
        if(obj.hands[0].palmPosition[0] < obj.hands[1].palmPosition[0]){
          leftHand = obj.hands[0];
          var leftStr = JSON.stringify(leftHand.palmPosition);
          rightHand = obj.hands[1];
          var rightStr = JSON.stringify(rightHand.palmPosition);
        }
        else{
          leftHand = obj.hands[1];
          var leftStr = JSON.stringify(leftHand.palmPosition);
          rightHand = obj.hands[0];
          var rightStr = JSON.stringify(rightHand.palmPosition);
        }

        // ______________________________________
        //  +Motor speed calculation (left hand)
        // ______________________________________
        if (leftHand.palmPosition[1] <= LEFT_lowerYBound){
          // If hand is low, let's stop the robot!
          PWM_desired = 0;
        }
        else if(leftHand.palmPosition[1] >= LEFT_upperYBound){
          // If hand is higher than our upper bound, assume it's at the upper bound.
          PWM_desired = 1023;
        }
        else{
          PWM_desired = (PWM_mapping*(leftHand.palmPosition[1]-LEFT_lowerYBound))+LEFT_lowerYBound;
        }

        // ______________________________________
        // ______________________________________
        //  +Direction Calculation (right hand)
        // ______________________________________
        // ______________________________________
        // rightStrPitch = JSON.stringify(rightHand.direction[1]*RAD2DEG);
        // rightStrRoll = JSON.stringify(rightHand.palmNormal[0]*RAD2DEG);
        //Calculate m1 & m2Dir
        m1Dir = 1.0;
        m2Dir = 1.0;

        if (rightHand.palmPosition[1] <= LEFT_lowerYBound){
          // If hand is low, let's stop the robot!
          m1Dir = 1.0;
          m2Dir = 1.0;
        }
        else if(rightHand.palmPosition[1] >= LEFT_upperYBound){
          // If hand is higher than our upper bound, assume it's at the upper bound.
          m1Dir = 1.0;
          m2Dir = 1.0
        }
        rightStrYaw = JSON.stringify(rightHand.direction[0]*RAD2DEG);
        // Make yaw positive within the bounds
        RIGHT_yaw = rightHand.direction[0]*RAD2DEG;
        if(RIGHT_yaw < RIGHT_yawCCWBound){ RIGHT_yaw = RIGHT_yawCCWBound; }
        if(RIGHT_yaw > RIGHT_yawCWBound){ RIGHT_yaw = RIGHT_yawCWBound; }
        RIGHT_yaw += RIGHT_yawCCWBound; // Now from [0-50] degrees

        ROBOT_yaw = RIGHT_yaw*YAW_mapping; // Now we've got robot yaw in [deg] between [0-90]
        ROBOT_yaw = ROBOT_yaw-ROBOT_turningAngle;  // Robot yaw [-45,90] [deg]
        yawScaler = (ROBOT_yaw)/(2*ROBOT_turningAngle); // Dimensionless [-.5,.5]

        // Scale the PWM output for each motor  
        if(yawScaler < 0){
          // If we want to turn left:
          m1PWM = PWM_desired*(speed - yawScaler); // Will map to OCR1B on the M2
          m2PWM = PWM_desired*(speed);               // Will map to OCR3A on the M2
        }
        else{
          // If we want to turn right:
          m1PWM = PWM_desired*(speed);               // Will map to OCR1B on the M2
          m2PWM = PWM_desired*(speed-yawScaler);   // Will map to OCR3A on the M2
        }
        // ______________________________________
        //  -Direction Calculation (right hand)
        // ______________________________________
        document.getElementById("output").innerHTML =
        'Left Hand Z: ' + leftHand.palmPosition[1]
        + '<br>PWM Output: ' + PWM_desired
        + '<br>Right Hand Yaw: '+ rightStrYaw
        + '<br>M1 PWM: ' + m1PWM
        + '<br>M1 Dir: ' + m1Dir
        + '<br>M2 PWM: ' + m2PWM
        + '<br>M2 Dir: ' + m2Dir;

        //Send our Vars to the Server Using sockets
        sendDriveDataToServer(m1PWM, m1Dir, m2PWM, m2Dir);

      }
      // ______________________________________
      //  If there are more than two hands identified, stop the robot
      // ______________________________________
      else{
        // If we don't have both hands recognized, set the motor PWM to 0 so they won't move!
        PWM_desired = 0;
        document.getElementById("output").innerHTML = 'MORE THAN 2 HANDS!!!';
      }
    } // End check for Hands being NULL
    // document.getElementById("output").innerHTML = 'No hands!!';

  }


////////////////////////////////////////////
//----Function that captures GRIPPER Data---
////////////////////////////////////////////
function captureGripperData(obj) {



}



  // On socket close
  ws.onclose = function(event) {
    ws = null;
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("connection").innerHTML = "WebSocket connection closed";
  };
  
  //On socket error
  ws.onerror = function(event) {
    alert("Received error");
  };
}




//////////// Driver Code
