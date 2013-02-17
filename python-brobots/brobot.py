#!/usr/bin/python
# Servo_sweep.py
import json, sys
from socketIO_client import SocketIO, BaseNamespace


#SERVER_NAME = 'localhost'
#SERVER_PORT = 3000
SERVER_NAME = 'mriveralee.brobots.jit.su'
SERVER_PORT = 80





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
        print "Arm Angle: " + str(angleArm)
        print "Gripper Angle: " + str(angleGripper)
    elif (numValues == 4) :
        #Do something with driver data
        m1PWM = botData['m1PWM']
        m1Dir = botData['m1Dir']
        m2PWM = botData['m2PWM']
        m2Dir = botData['m2Dir']
        print "m1PWM: " + str(m1PWM)
        print "m1Dir: " + str(m1Dir)
        print "m2PWN " + str(m2PWM)
        print "m2Dir: " + str(m2Dir)

        

# Set up sockets on the local hosthttp://
mainSocket = SocketIO(SERVER_NAME, SERVER_PORT)
brobotSocket = mainSocket.connect('/brobot', BrobotSocketSpace)

#
mainSocket.on('updated-bot-data', on_updated_bot_data)

mainSocket.wait()
brobotSocket.wait()



