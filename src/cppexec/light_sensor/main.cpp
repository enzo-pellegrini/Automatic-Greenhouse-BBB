#include"Light_Sensor.h"   
#include <iostream>

using namespace GreenHouseProject;
using namespace std;

int main(){
   LSENS lsens;

   int result = lsens.getLuminosityInPercentage();

   cout << result << endl;
}
