//============================================================================
// Name        : Servo_Motor.cpp
// Author      : Spid3rmn (313301)
// Description : Module to interact with Light Sensor
//============================================================================

#include "Light_Sensor.h"
#include <cstdlib>

namespace GreenHouseProject {
    LSENS::LSENS() {}

    int LSENS::readLuminosity() {
        return read(PATH, FILE_NAME);
    }

    int LSENS::read(string path, string filename) {
       ifstream fs;
       string value;
       fs.open((path + filename).c_str());
       if (!fs.is_open()){
    	   perror("GPIO: write failed to open file ");
    	   return -1;
       }
       fs >> value;
       fs.close();
       return std::stoi(value);
    }

    int LSENS::convertToPercentage(int value) {
        return 100 * (value / (float)(MAX_VAL - MIN_VAL));
    }

    int LSENS::getLuminosityInPercentage() {
        int value = readLuminosity();

        return convertToPercentage(value);
    }

    LSENS::~LSENS() {}
}
