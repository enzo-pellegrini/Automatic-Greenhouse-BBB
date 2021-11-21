#include "digital.h"
#include <stdlib.h>

int main(int argc, char **argv)
{
	if (argc < 2)
		return 1;

	int t =	atoi(argv[1]);

	Digital led = initDigital(49, Out);

	setDigital(led, t==1);
	
	destroyDigital(led);
}
