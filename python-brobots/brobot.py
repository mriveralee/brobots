#!/usr/bin/python
# Servo_sweep.py

import json, sys
from socketIO_client import SocketIO, BaseNamespace

#Servo Packages
from bbio import *
from Servo import *

#Instances of Servos
ArmServo = Servo(PWM1A)
GripperServo = Servo(PWM1B)

#Instances of the Wheel Motors
LeftMotor = PWM2B
RightMotor = PWM2A

LeftDirA = GPIO1_6
LeftDirB = GPIO1_7

RightDirA = GPIO1_2
RightDirB = GPIO1_3



def setup() :
    pinMode(LeftDirA, OUTPUT, -1)
    pinMode(LeftDirB, OUTPUT, -1)
    pinMode(RightDirA, OUTPUT, -1)
    pinMode(RightDirB, OUTPUT, -1)

    #Start all LOW
    analogWrite(LeftMotor, 0)
    analogWrite(RightMotor, 0)
    digitalWrite(LeftDirA, LOW)
    digitalWrite(LeftDirB, LOW)
    digitalWrite(RightDirA, LOW)
    digitalWrite(RightDirB, LOW)

 
#Server Information
#SERVER_NAME = 'localhost'
#SERVER_PORT = 3000
SERVER_NAME = 'mriveralee.brobots.jit.su'
SERVER_PORT = 80

 


class MainSocketSpace(BaseNamespace) :
    
    def on_connect(self, socketIO):
            print '[Connected]'


    def on_disconnect(self) :
        print '[Disconnected]'
        bbio_cleaup()

    def on_error(self, name, message)   :
        print '[Error] %s: %s' % (name, message)

    

class BrobotSocketSpace(BaseNamespace) :

    def on_msg(msg) :
      ''' DO NOTHING '''
      #Handles socket for bot data



#Handles socket for bot data
def on_updated_bot_data(botData, *args) :
    #//dataDic = json.load(botData)  
    numValues = botData['values']
    if (numValues == 2) :
        #Do something with gripper data
        angleArm = botData['angle1']
        angleGripper = botData['angle2']
        #print "Arm Angle: " + str(angleArm)
        #print "Gripper Angle: " + str(angleGripper)
        ArmServo.write(angleArm)
        GripperServo.write(angleGripper)
    elif (numValues == 4) :
        #Do something with driver data
        m1PWM = botData['m1PWM']
        m1Dir = botData['m1Dir']
        m2PWM = botData['m2PWM']
        m2Dir = botData['m2Dir']

        #Get opposite value for other m1
        m1DirB = LOW
        if (m1Dir == 0) :
            m1DirB = HIGH
            m1Dir = LOW
        else :
            m1DirB = LOW
            m1Dir = HIGH
        #Get opposite value for other m2
        m2DirB = 0
        if (m2Dir == 0) :
            m2DirB = HIGH
            m2Dir = LOW
        else :
            m2DirB = LOW
            m2Dir = HIGH

        m1DirB = LOW
        m1Dir = LOW
        m2DirB = LOW
        m2Dir = LOW   
        #Write Speed to Motors
        analogWrite(LeftMotor, m1PWM)
        analogWrite(RightMotor, m2PWM)
 
        #Write Direction to Motors
        # digitalWrite(LeftDirA, m1Dir)
        # digitalWrite(LeftDirB, m1DirB)
        # digitalWrite(RightDirA, m2Dir)
        # digitalWrite(RightDirB, m2DirB)

        # print "m1PWM: " + str(m1PWM)
        # print "m1Dir: " + str(m1Dir)
        # print "m2PWN " + str(m2PWM)
        # print "m2Dir: " + str(m2Dir)
        

# Set up sockets on the local hosthttp://
mainSocket = SocketIO(SERVER_NAME, SERVER_PORT)
brobotSocket = mainSocket.connect('/brobot', BrobotSocketSpace)

#
mainSocket.on('updated-bot-data', on_updated_bot_data)

mainSocket.wait()
brobotSocket.wait()
bbio_init()
setup()

