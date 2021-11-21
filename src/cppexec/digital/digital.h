#ifndef DIGITAL_H
#define DIGITAL_H

#include <stdbool.h>

typedef struct digital_s *Digital;
typedef enum DigitalMode{In, Out} DMode;

Digital initDigital(int pin, DMode mode);
void setDigital(Digital d, bool val);			// Fails with error 5 if mode is wrong
bool readDigital(Digital d);			
void destroyDigital(Digital d);

#endif
