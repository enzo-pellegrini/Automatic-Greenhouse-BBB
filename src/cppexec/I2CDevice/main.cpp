#include "temphumidity.h"
#include <iostream>

using namespace std;

using namespace exploringBB;

int main()
{
	TempHumidity s = TempHumidity();

	MeasureRes r = s.read();

	//cout << "Humidity: " << r.humidity << endl;
	//cout << "Temperature: " << r.temperature << endl;
	

	cout << r.humidity << " " << r.temperature << endl;
}
