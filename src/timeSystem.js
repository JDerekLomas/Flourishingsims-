export class TimeSystem {
  constructor() {
    this.day = 1;
    this.hour = 8; // Start at 8 AM
    this.minute = 0;
    this.timeSpeed = 1; // 1 real second = 1 game minute
    this.accumulator = 0;
  }

  update(deltaTime) {
    this.accumulator += deltaTime;

    // Every second in real time = 1 minute in game time
    if (this.accumulator >= this.timeSpeed) {
      this.minute++;
      this.accumulator = 0;

      if (this.minute >= 60) {
        this.minute = 0;
        this.hour++;

        if (this.hour >= 24) {
          this.hour = 0;
          this.day++;
        }
      }

      this.updateUI();
    }
  }

  updateUI() {
    const timeDisplay = document.getElementById('time-display');
    const hourStr = String(this.hour).padStart(2, '0');
    const minuteStr = String(this.minute).padStart(2, '0');
    timeDisplay.textContent = `Day ${this.day} - ${hourStr}:${minuteStr}`;
  }

  getTimeOfDay() {
    if (this.hour >= 6 && this.hour < 12) return 'morning';
    if (this.hour >= 12 && this.hour < 18) return 'afternoon';
    if (this.hour >= 18 && this.hour < 22) return 'evening';
    return 'night';
  }

  isNightTime() {
    return this.hour >= 22 || this.hour < 6;
  }
}
