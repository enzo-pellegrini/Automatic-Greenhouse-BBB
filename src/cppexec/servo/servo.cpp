#include "servo.h"
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <filesystem>
#include <cstring>	

#define DUTY_CYCLE_ON 2350000
#define DUTY_CYCLE_OFF 1460000

#define DUTY_PATH "/sys/class/pwm/pwmchip0/pwm-0:0/duty_cycle"
#define ENABLE_PATH "/sys/class/pwm/pwmchip0/pwm-0:0/enable"
#define PERIOD_PATH "/sys/class/pwm/pwmchip0/pwm-0:0/period"

using namespace std;
using namespace PWM;

Pwm::Pwm() : Pwm(20000000)
{
}

Pwm::Pwm(int period)
	: m_period(period)
{
	// Config PIN to pwm mode if it's not configured as pwm
	ifstream state_file;
	state_file.open("/sys/devices/platform/ocp/ocp:P9_42_pinmux/state");
	char state[50];
	state_file >> state;
	if (strcmp(state, "pwm") != 0) {
		system("config-pin P9_42 pwm");
	}

	// Check if exported, if not export
	ifstream p;
	p.open("/sys/class/pwm/pwmchip0/pwm-0:0");
 	if (!p.is_open()) {
		ofstream exp_file;
		exp_file.open("/sys/class/pwm/pwmchip0/export");
		exp_file << 0;
	}
	

	// Set period
	ofstream period_file;
	period_file.open(PERIOD_PATH);
	period_file << period;
}

void Pwm::set(float val)
{
	ofstream duty_file;
	duty_file.open(DUTY_PATH);
	int duty = val*(float)(DUTY_CYCLE_ON-DUTY_CYCLE_OFF)+DUTY_CYCLE_OFF;
	std::cout << duty << std::endl;
	duty_file << duty;
}

void Pwm::set_on(bool val)
{
	ofstream enable_file;
	enable_file.open(ENABLE_PATH);
	std::cout << val << std::endl;
	enable_file << val ? 1 : 0;
}
