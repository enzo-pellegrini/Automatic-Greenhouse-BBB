#ifndef _LSENS_H
#define _LSENS_H

#define PATH "/sys/bus/iio/devices/iio:device0/"
#define FILE_NAME "in_voltage0_raw"
#define MIN_VAL 500
#define MAX_VAL 3000

#include<iostream>
#include<fstream>
#include<sstream>
using namespace std;

namespace GreenHouseProject {
    class LSENS {
        private:
            int readLuminosity();
            int convertToPercentage(int value);
            int read(string path, string filename);
        public:
            LSENS();

            int getLuminosityInPercentage();

            ~LSENS();
    };
}

#endif
