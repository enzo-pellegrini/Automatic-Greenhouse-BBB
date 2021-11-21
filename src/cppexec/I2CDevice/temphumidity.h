#include "I2CDevice.h"

namespace exploringBB {

	typedef struct {
		float temperature;
		float humidity;
	} MeasureRes;

	class TempHumidity : public I2CDevice {
	public:
		TempHumidity();
		MeasureRes read();
	};
}
