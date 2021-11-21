#include "servo.h"
#include <cstdlib>

using namespace PWM;

int main(int argc, char **argv)
{
	if (argc < 2)
		return 1;

	Pwm mio = Pwm();
	
	mio.set((float)std::atol(argv[1])/(float)100);
	mio.set_on(true);
}
