/*
 * TempHumidity.cpp, to interact with the temperature and humidity sensor
 * By Vincenzo Pellegrini, Francesco Palma
 * 313291, 313301
 */


#include "temphumidity.h"

#define ADDRESS 0x27

#include <iostream>
#include <bitset>

using namespace exploringBB;

TempHumidity::TempHumidity() : I2CDevice(2, ADDRESS)
{}

MeasureRes TempHumidity::read()
{
	// Request data
	write(ADDRESS << 1);

	unsigned char *data;

	data = readDevice(4);
	int status = 0;
	bool not_first(false);
	while (status != 1) {
		if (not_first) 
			delete[] data;
		else 
			not_first=true;

		data = readDevice(4);

		status = (data[0] & 0b11000000) >> 6;
	}

	MeasureRes r;

	int t_humidity = 0;
	t_humidity |= data[1];
	t_humidity |= (data[0] & 0b00111111) << 8;

	r.humidity = (float)100*t_humidity/((float)(
					(1<<14) - 2
				));

	int t_temperature = 0;
	t_temperature |= data[3] >> 2;
	t_temperature |= data[2] << 6;

	r.temperature = t_temperature/((float)(
					(1<<14) - 2
				))*(float)165 - 40;

	delete[] data;

	return r;
}



/*
 *
 * Moduli Cpp
 *    | node js extension
 * Backend node js & webscokets
 * 		| rest call & socket.io
 * FrontEnd
 *
 */
