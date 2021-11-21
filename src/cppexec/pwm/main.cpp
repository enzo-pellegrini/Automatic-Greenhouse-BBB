#include "pwm.h"
#include <cstdlib>

using namespace PWM;

int main(int argc, char **argv)
{
	if (argc < 2)
		return 1;

	Pwm mio = Pwm();
	
	int tmp = std::atol(argv[1]);
	mio.set(std::atol(argv[1])/(float)100);
	mio.set_on(tmp != 0);
}
