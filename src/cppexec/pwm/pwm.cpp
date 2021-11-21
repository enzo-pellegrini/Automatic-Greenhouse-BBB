/*
 * Pwm.cpp, to interact with pwm led strip
 * By Vincenzo Pellegrini and Francesco Palma
 * 313291 313301
 */

#include "pwm.h"
#include <cstdlib>
#include <fstream>
#include <filesystem>
#include <cstring>	

#define DUTY_PATH "/sys/class/pwm/pwmchip1/pwm-1:1/duty_cycle"
#define ENABLE_PATH "/sys/class/pwm/pwmchip1/pwm-1:1/enable"
#define PERIOD_PATH "/sys/class/pwm/pwmchip1/pwm-1:1/period"

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
	state_file.open("/sys/devices/platform/ocp/ocp:P9_21_pinmux/state");
	char state[50];
	state_file >> state;
	if (strcmp(state, "pwm") != 0) {
		system("config-pin P9_21 pwm");
	}

	// Check if exported, if not export
	ifstream p;
	p.open("/sys/class/pwm/pwmchip1/pwm-1:1");
 	if (!p.is_open()) {
		ofstream exp_file;
		exp_file.open("/sys/class/pwm/pwmchip1/export");
		exp_file << 1;
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
	int duty = (float)m_period * val;
	duty_file << duty;
}

void Pwm::set_on(bool val)
{
	ofstream enable_file;
	enable_file.open(ENABLE_PATH);
	enable_file << val ? 1 : 0;
}
