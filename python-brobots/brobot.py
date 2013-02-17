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




#Server Information
#SERVER_NAME = 'localhost'
#SERVER_PORT = 3000
SERVER_NAME = 'mriveralee.brobots.jit.su'
SERVER_PORT = 80

def setup() :
    pinMode(LeftDirA, OUTPUT)
    pinMode(LeftDirB, OUTPUT)
    pinMode(RightDirA, OUTPUT)
    pinMode(RightDirB, OUTPUT)



class MainSocketSpace(BaseNamespace) :
    
    def on_connect(self, socketIO):
            print '[Connected]'


    def on_disconnect(self) :
        print '[Disconnected]'

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
        m1DirB = 0
        if (m1Dir == 0)
            m1DirB = 1
        #Get opposite value for other m2
        m2DirB = 0
        if (m2Dir == 0)
            m2DirB = 1


        #Write Speed to Motors
        analogWrite(LeftMotor, m1PWM) m2P
        analogWrite(RightMotor, m2PWM)
 
        #Write Direction to Motors
        digitalWrite(LeftDirA, m1Dir)
        digitalWrite(LeftDirB, m1DirB)
        digitalWrite(RightDirA, m2Dir)
        digitalWrite(RightDirB, m2DirB)

        #print "m1PWM: " + str(m1PWM)
        #print "m1Dir: " + str(m1Dir)
        #print "m2PWN " + str(m2PWM)
        #print "m2Dir: " + str(m2Dir)

        

# Set up sockets on the local hosthttp://
mainSocket = SocketIO(SERVER_NAME, SERVER_PORT)
brobotSocket = mainSocket.connect('/brobot', BrobotSocketSpace)

#
mainSocket.on('updated-bot-data', on_updated_bot_data)

mainSocket.wait()
brobotSocket.wait()



