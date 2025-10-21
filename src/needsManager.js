export class NeedsManager {
  constructor() {
    this.needs = {
      autonomy: { value: 50, label: 'Autonomy', description: 'Freedom & self-determination' },
      beauty: { value: 50, label: 'Beauty', description: 'Aesthetic appreciation' },
      comfort: { value: 50, label: 'Comfort', description: 'Physical & psychological ease' },
      community: { value: 50, label: 'Community', description: 'Belonging to a group' },
      competence: { value: 50, label: 'Competence', description: 'Effectiveness & mastery' },
      fitness: { value: 50, label: 'Fitness', description: 'Physical health & vitality' },
      impact: { value: 50, label: 'Impact', description: 'Influence on the world' },
      morality: { value: 50, label: 'Morality', description: 'Living by ethical principles' },
      purpose: { value: 50, label: 'Purpose', description: 'Meaning & direction' },
      recognition: { value: 50, label: 'Recognition', description: 'Being acknowledged' },
      relatedness: { value: 50, label: 'Relatedness', description: 'Close connections' },
      security: { value: 50, label: 'Security', description: 'Safety & stability' },
      stimulation: { value: 50, label: 'Stimulation', description: 'Novelty & challenge' }
    };

    this.initializeUI();
  }

  initializeUI() {
    const needsList = document.getElementById('needs-list');

    Object.keys(this.needs).forEach(needKey => {
      const need = this.needs[needKey];

      const needItem = document.createElement('div');
      needItem.className = 'need-item';
      needItem.id = `need-${needKey}`;

      const needName = document.createElement('div');
      needName.className = 'need-name';
      needName.innerHTML = `
        <span>${need.label}</span>
        <span class="need-value">${need.value}%</span>
      `;

      const barContainer = document.createElement('div');
      barContainer.className = 'need-bar-container';

      const bar = document.createElement('div');
      bar.className = 'need-bar';
      bar.id = `bar-${needKey}`;
      this.updateBarStyle(bar, need.value);

      barContainer.appendChild(bar);
      needItem.appendChild(needName);
      needItem.appendChild(barContainer);
      needsList.appendChild(needItem);
    });
  }

  updateBarStyle(bar, value) {
    bar.style.width = `${value}%`;

    if (value >= 60) {
      bar.className = 'need-bar high';
    } else if (value >= 30) {
      bar.className = 'need-bar medium';
    } else {
      bar.className = 'need-bar low';
    }
  }

  modifyNeed(needKey, amount) {
    if (this.needs[needKey]) {
      this.needs[needKey].value = Math.max(0, Math.min(100, this.needs[needKey].value + amount));
    }
  }

  decayNeeds() {
    // Gradually decay all needs over time
    Object.keys(this.needs).forEach(needKey => {
      this.modifyNeed(needKey, -2); // Decay by 2 points every 5 seconds
    });
  }

  updateUI() {
    Object.keys(this.needs).forEach(needKey => {
      const need = this.needs[needKey];
      const needItem = document.getElementById(`need-${needKey}`);
      const bar = document.getElementById(`bar-${needKey}`);

      if (needItem && bar) {
        const valueSpan = needItem.querySelector('.need-value');
        valueSpan.textContent = `${Math.round(need.value)}%`;
        this.updateBarStyle(bar, need.value);
      }
    });
  }
}
