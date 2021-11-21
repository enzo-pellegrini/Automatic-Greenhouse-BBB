
namespace PWM {
	class Pwm {
		public: 
			Pwm();
			Pwm(int period);
			void set(float val);
			void set_on(bool val);
		private:
			int m_period;
	};
}
