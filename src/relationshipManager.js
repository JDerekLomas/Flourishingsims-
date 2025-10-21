export class RelationshipManager {
  constructor() {
    this.relationships = new Map(); // Map<characterId, Map<otherCharId, relationship>>
  }

  initializeCharacter(characterId) {
    if (!this.relationships.has(characterId)) {
      this.relationships.set(characterId, new Map());
    }
  }

  getRelationship(characterId, otherCharId) {
    if (!this.relationships.has(characterId)) {
      this.initializeCharacter(characterId);
    }

    const charRelationships = this.relationships.get(characterId);
    if (!charRelationships.has(otherCharId)) {
      charRelationships.set(otherCharId, {
        value: 0, // -100 to 100
        friendship: 0,
        romance: 0,
        name: '' // Will be set when we get the other character's name
      });
    }

    return charRelationships.get(otherCharId);
  }

  modifyRelationship(characterId, otherCharId, amount, otherCharName) {
    const relationship = this.getRelationship(characterId, otherCharId);
    relationship.value = Math.max(-100, Math.min(100, relationship.value + amount));
    relationship.name = otherCharName;

    // Update friendship/romance based on value
    if (relationship.value > 0) {
      relationship.friendship = relationship.value;
    }
  }

  interact(char1Id, char2Id, char1Name, char2Name, interactionType) {
    // Different interaction types have different relationship effects
    const effects = {
      'chat': 5,
      'joke': 8,
      'compliment': 10,
      'argue': -15,
      'insult': -20,
      'hug': 15,
      'gift': 20
    };

    const effect = effects[interactionType] || 5;

    this.modifyRelationship(char1Id, char2Id, effect, char2Name);
    this.modifyRelationship(char2Id, char1Id, effect, char1Name);
  }

  getRelationshipLevel(value) {
    if (value >= 80) return 'Best Friends';
    if (value >= 60) return 'Good Friends';
    if (value >= 40) return 'Friends';
    if (value >= 20) return 'Acquaintances';
    if (value >= -20) return 'Neutral';
    if (value >= -60) return 'Dislike';
    return 'Enemies';
  }

  updateUI(characterId) {
    const relationshipsList = document.getElementById('relationships-list');
    const charRelationships = this.relationships.get(characterId);

    if (!charRelationships || charRelationships.size === 0) {
      relationshipsList.innerHTML = '<div style="color: #999; font-style: italic;">No relationships yet</div>';
      return;
    }

    relationshipsList.innerHTML = '';

    charRelationships.forEach((rel, otherId) => {
      if (!rel.name) return;

      const item = document.createElement('div');
      item.className = 'relationship-item';

      const name = document.createElement('div');
      name.className = 'relationship-name';
      name.textContent = `${rel.name} - ${this.getRelationshipLevel(rel.value)}`;

      const barContainer = document.createElement('div');
      barContainer.className = 'relationship-bar-container';

      const bar = document.createElement('div');
      bar.className = 'relationship-bar';
      const percentage = ((rel.value + 100) / 200) * 100;
      bar.style.width = `${percentage}%`;

      barContainer.appendChild(bar);
      item.appendChild(name);
      item.appendChild(barContainer);
      relationshipsList.appendChild(item);
    });
  }
}
