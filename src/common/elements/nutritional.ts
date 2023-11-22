/* eslint-disable @typescript-eslint/naming-convention */
export const nutritionalKeys = {
  Water: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  Energy: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['Kcal'],
      default: 'Kcal',
    },
  },
  Protein: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  'Lipid Tot': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  Ash: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  Carbohydrt: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  'Fiber TD': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  'Sugar Tot': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  Calcium: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Iron: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Magnesium: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Phosphorus: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Potassium: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Sodium: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Zinc: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Copper: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Manganese: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Selenium: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Vit C': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Thiamin: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Riboflavin: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  Niacin: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  'Panto Acid': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  'Vit B6': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  'Folate Tot': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Folic Acid': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Food Folate': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Folate DFE': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Choline Tot ': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  'Vit B12': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Vit A IU': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['IU'],
      default: 'IU',
    },
  },
  'Vit A RAE': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['RAE'],
      default: 'RAE',
    },
  },
  Retinol: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  'Alpha Carot': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Beta Carot': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Beta Crypt': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  Lycopene: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Lut+Zea ': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Vit E': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
  'Vit D': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'Vit D IU': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['IU'],
      default: 'IU',
    },
  },
  'Vit K': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'ug',
    },
  },
  'FA Sat': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  'FA Mono': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  'FA Poly': {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'g',
    },
  },
  Cholestrl: {
    value: {
      type: Number,
      default: 0.0,
    },
    unit: {
      type: String,
      enum: ['g', 'mg', 'ug'],
      default: 'mg',
    },
  },
};
