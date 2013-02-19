// author:	
// date:	

#include "saast.h"
#include "m_general.h"

#define ARM_SERVO_LOWER -50
#define ARM_SERVO_UPPER 150

#define GRIPPER_SERVO_LOWER -50
#define GRIPPER_SERVO_UPPER 150

int main(void)
{	
	// declare variables:
	
	// single execution:
	m_init();	// initialize the m2 system
	mx_servo_init(G); // init servo -- ARM
	mx_servo_init(H); // init servo -- GRIPPER

	
	// primary loop:
	while(1){

		// m_red(ON);
		// m_green(OFF);
		// mx_servo(G,-50);
		// m_wait(1000);

		// m_red(ON);
		// m_green(OFF);
		// mx_servo(G,150);
		// m_wait(1000);


		m_red(ON);
		m_green(OFF);
		mx_servo(H,-50);
		m_wait(1000);

		m_red(ON);
		m_green(OFF);
		mx_servo(H,150);
		m_wait(1000);


		// m_red(OFF);
		// m_green(ON);
		// mx_servo(G,0);
		// m_wait(100);

		// int i;
		// for (i=0; i<100; i++){
		// 	m_wait(100);
		// 	mx_servo(G,i);
		// }
		// for (i=100; i>0; i--){
		// 	m_wait(100);
		// 	mx_servo(G,i);
		// }
	
	}
}