#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "digital.h"

#define LEN 60
#define BASE_PATH "/sys/class/gpio/gpio"

struct digital_s {
	int pin;
	char *val_file;
	DMode mode;
};

Digital initDigital(int pin, DMode mode)
{
	static char buffer_val[LEN];
	static char buffer_dir[LEN];
	Digital s = malloc(sizeof(struct digital_s));
	s->pin = pin;
	snprintf(buffer_val, LEN, BASE_PATH"%d/value", pin);
	snprintf(buffer_dir, LEN, BASE_PATH"%d/direction", pin);

	s->mode = mode;
	FILE* direction_file = fopen(buffer_dir, "w");
	switch (mode) {
		case In:
			fprintf(direction_file, "in");
			break;
		case Out:
			fprintf(direction_file, "out");
			break;
		default:
			fprintf(stderr, "Invalid direction");
			exit(5);
			break;
	}
	fclose(direction_file);

	//s->val_file = fopen(buffer_val, (mode==In) ? "r" : "r+");
	s->val_file = strdup(buffer_val);

	return s;
}

void setDigital(Digital d, bool val)
{
	if (d->mode != Out)
		exit(5);

	FILE *f = fopen(d->val_file, "w");
	fprintf(f, "%d", val ? 1 : 0);
	fflush(f);
	fclose(f);
}


bool readDigital(Digital d)
{
	FILE *f = fopen(d->val_file, "r");
	int val;
	fscanf(f, "%d", &val);
	fclose(f);

	return val==1;
}


void destroyDigital(Digital d)
{
	free(d->val_file);
	free(d);
}
