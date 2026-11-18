console.info('%c AIRQ CARD  v1.1 ', 'color: white; background: green; font-weight: bold;');

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import './airq-card-editor';


export type SensorType = 'co2' | 'voc' | 'pm25' | 'temperature' | 'humidity' | 'rating';

export interface AirQualityCardConfig {
  type: string;
  title?: string;
  room?: string;
  columns?: number;
  entities: Partial<Record<SensorType, string>>;  // co2, voc, etc.
  show_bars?: SensorType[];  // explicitly typed for clarity
  _customThresholds?: Partial<Record<SensorType, { min?: number; max?: number }>>;
  temperature_optimal_range_enabled?: boolean;
  temperature_optimal_min?: number;
  temperature_optimal_max?: number;
}


interface hassWithFormat extends HomeAssistant {
  formatNumber(
    value: number,
    options?: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string;
}




interface Thresholds {
  min: number;
  max: number;
  unit: string;
  icon: string;
  absoluteMin: number;
  absoluteMax: number;
}

const SENSOR_THRESHOLDS: Record<string, Thresholds> = {
  co2: { min: 400, max: 1000, unit: 'ppm', icon: 'mdi:molecule-co2', absoluteMin: 400, absoluteMax: 1300 },
  voc: { min: 0, max: 500, unit: 'ppb', icon: 'mdi:chemical-weapon', absoluteMin: 0, absoluteMax: 1000 },
  pm25: { min: 0, max: 35, unit: 'µg/m³', icon: 'mdi:blur', absoluteMin: 0, absoluteMax: 50 },
  temperature: { min: 18, max: 26, unit: '°C', icon: 'mdi:thermometer', absoluteMin: -20, absoluteMax: 60 },
  humidity: { min: 30, max: 60, unit: '%', icon: 'mdi:water-percent', absoluteMin: 0, absoluteMax: 100 },
};

const PM25_LEVELS = [
  { max: 5, label: 'Sehr gut', range: '0–5', color: '#2e7d32', gradientStart: 0 },
  { max: 10, label: 'Gut', range: '5–10', color: '#8bc34a', gradientStart: 5 },
  { max: 15, label: 'Mäßig', range: '10–15', color: '#fbc02d', gradientStart: 10 },
  { max: 25, label: 'Schlecht', range: '15–25', color: '#fb8c00', gradientStart: 15 },
  { max: 50, label: 'Sehr schlecht', range: '25–50', color: '#e53935', gradientStart: 25, includeMax: true },
  { max: Infinity, label: 'Kritisch', range: '> 50', color: '#7f0000', gradientStart: 50.001 },
];

function getPm25Level(value: number) {
  return PM25_LEVELS.find(level => level.includeMax ? value <= level.max : value < level.max)
    ?? PM25_LEVELS[PM25_LEVELS.length - 1];
}

function getPm25Gradient(min: number, max: number, value: number): string | undefined {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return undefined;

  const stops = [
    { value: min, color: getPm25Level(min).color },
    ...PM25_LEVELS
      .filter(level => level.gradientStart > min && level.gradientStart < max)
      .map(level => ({ value: level.gradientStart, color: level.color })),
    {
      value: max,
      color: value > 50 && max <= 50 ? PM25_LEVELS[PM25_LEVELS.length - 1].color : getPm25Level(max).color
    }
  ];

  return `linear-gradient(to right, ${stops
    .map(stop => `${stop.color} ${((stop.value - min) / (max - min)) * 100}%`)
    .join(', ')})`;
}

const RATING_KEYS: Record<string, string> = {
  excellent: 'excellent',
  ausgezeichnet: 'excellent',
  good: 'good',
  gut: 'good',
  moderate: 'moderate',
  'mäßig': 'moderate',
  maessig: 'moderate',
  poor: 'poor',
  schlecht: 'poor',
  unhealthy: 'unhealthy',
  ungesund: 'unhealthy',
};

const RATING_LABELS: Record<string, string> = {
  excellent: 'Ausgezeichnet',
  good: 'Gut',
  moderate: 'Mäßig',
  poor: 'Schlecht',
  unhealthy: 'Ungesund',
};

export class AirQualityCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() private config!: AirQualityCardConfig;

  public setConfig(config: AirQualityCardConfig) {
    if (!config.entities) throw new Error('Entities required');
    if (config.columns !== undefined && (!Number.isInteger(config.columns) || config.columns < 1)) {
      throw new Error('Columns must be a positive integer');
    }
    this.config = config;
  }

  static styles = css`
    ha-card {
      padding: 15px;
      overflow: visible;
      max-width: 100%;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .title {
      color: var(--ha-card-header-color, var(--primary-text-color));
      font-family: var(--ha-card-header-font-family, inherit);
      font-size: var(--ha-card-header-font-size, var(--ha-font-size-2xl));
      letter-spacing: -0.012em;
      line-height: var(--ha-line-height-condensed);
      font-weight: var(--ha-font-weight-normal);
    }
    .attributes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 12px;
      width: 100%;
    }
    .bar-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .icon {
      margin-right: 8px;
      font-size: 24px;
    }
    .bar {
      flex-grow: 1;
      height: 10px;
      border-radius: 3px;
      background: var(--primary-background-color);
      position: relative;
      overflow: hidden;
    }
    .value-above {
    text-align: right;
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-bottom: 6px;
    padding-right: 2px;
    }

    .gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right,
        #1e8449 0%,
        #27ae60 25%,
        #2ecc71 50%,
        #f1c40f 60%,
        #e67e22 75%,
        #c0392b 90%,
        #922b21 100%);
      z-index: 1;
    }

    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--primary-background-color);
      z-index: 2;
      right: 0;
    }

    .bar-wrapper {
      position: relative;
      flex-grow: 1;
    }

    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #555;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      z-index: 10;
    }

    .bar-wrapper:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  `;

  static getConfigElement(): Promise<HTMLElement> {
    return Promise.resolve(document.createElement('airq-card-editor'));
  }

  static getStubConfig(): Record<string, any> {
    return {
      type: 'custom:airq-card',
      title: 'Luftqualität',
      entities: {},
    };
  }


  renderBar(key: string, entityId: string | undefined) {
    if (!entityId) return html``;
    const state = this.hass.states[entityId];
    if (!state || state.state === 'unavailable') return html``;

    // const value = parseFloat(state.state);
    const raw = state.state;
    const numeric = Number(raw);
    // const rounded = Math.round(numeric * 100) / 100;

    const hass = this.hass as hassWithFormat;

    // Round value to 2 decimal places safely
    const formatted = (Math.round((numeric + Number.EPSILON) * 100) / 100).toFixed(2);
    console.log('Raw:', raw, 'Numeric:', numeric, 'Formatted:', formatted);



    const name = state.attributes.friendly_name || key.toUpperCase();
    const threshold = SENSOR_THRESHOLDS[key];
    const custom = (this.config as any)._customThresholds?.[key] || {};
    let min = custom.min ?? threshold.min;
    let max = custom.max ?? threshold.max;
    if (key === 'temperature' && this.config.temperature_optimal_range_enabled) {
      const optimalMin = this.config.temperature_optimal_min;
      const optimalMax = this.config.temperature_optimal_max;
      if (
        optimalMin !== undefined &&
        optimalMax !== undefined &&
        Number.isFinite(optimalMin) &&
        Number.isFinite(optimalMax) &&
        optimalMin < optimalMax
      ) {
        min = optimalMin;
        max = optimalMax;
      } else {
        min = threshold.min;
        max = threshold.max;
      }
    }
    const absoluteMin = custom.min ?? threshold.absoluteMin;
    const absoluteMax = custom.max ?? threshold.absoluteMax;
    const unit = threshold.unit;
    const icon = threshold.icon;

    const pm25Level = key === 'pm25' && Number.isFinite(numeric) ? getPm25Level(numeric) : undefined;
    const tooltip = pm25Level
      ? `${name} — ${pm25Level.label}: ${pm25Level.range} ${unit}`
      : `${name} — optimal (${min}–${max} ${unit})`;

    const fillPercent = Math.max(0, Math.min(100, ((numeric - absoluteMin) / (absoluteMax - absoluteMin)) * 100));
    const pm25Gradient = key === 'pm25' && Number.isFinite(numeric)
      ? getPm25Gradient(absoluteMin, absoluteMax, numeric)
      : undefined;

    return html`
      <div
        class="bar-container"
        @click=${() => fireEvent(this, 'hass-more-info', { entityId })}
        style="cursor: pointer;"
        title="${tooltip}"
      >
        <ha-icon class="icon" icon="${icon}"></ha-icon>
        <div class="bar-wrapper">
          <div class="value-above">${formatted} ${unit}</div>


          <div class="bar">
            <div class="gradient" style=${pm25Gradient ? `background: ${pm25Gradient};` : ''}></div>
            <div class="mask" style="left: ${fillPercent}%; right: 0;"></div>
          </div>
          <div class="tooltip">${tooltip}</div>
        </div>
      </div>
    `;
  }



  isValueHealthy(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  render() {
    const { title, room, entities } = this.config;
    const show_bars: SensorType[] = this.config.show_bars ?? Object.keys(entities) as SensorType[];
    const barElements = show_bars
      .filter((key: SensorType) => SENSOR_THRESHOLDS[key])
      .map((key: SensorType) => this.renderBar(key, entities[key]));

    const allHealthy = show_bars
      .filter(key => SENSOR_THRESHOLDS[key]) // skip "rating"
      .every((key: SensorType) => {
        const entityId = entities[key];
        const state = entityId ? this.hass.states[entityId] : undefined;
        if (!state || state.state === 'unavailable') return false;
        const value = parseFloat(state.state);
        const { min, max } = SENSOR_THRESHOLDS[key];
        return this.isValueHealthy(value, min, max);
      });


    const ratingEntityId = entities.rating;
    let rawState = '';
    let ratingKey = 'moderate';
    // console.log('[AirQualityCard] ratingEntityId:', ratingEntityId);
    // console.log('[AirQualityCard] rawState:', rawState);


    if (ratingEntityId && this.hass.states[ratingEntityId]) {
      const state = this.hass.states[ratingEntityId].state;
      rawState = state ?? ''; // ensure it's at least an empty string
      // console.log('[AirQualityCard] NewrawState:', rawState);

      const candidate = rawState.toLowerCase().trim();
      if (candidate && Object.prototype.hasOwnProperty.call(RATING_KEYS, candidate)) {
        ratingKey = RATING_KEYS[candidate];
      } else {
        console.warn(`[AirQualityCard] Unknown air quality rating: "${rawState}" — defaulting to "moderate"`);
      }
    }

    const displayedRating = rawState ? RATING_LABELS[ratingKey] || rawState : '';
    const headerTitle = [title, room].filter(Boolean).join(' ');
    const header = [headerTitle, displayedRating].filter(Boolean).join(' - ');




    return html`
      <ha-card>
        <div class="card-wrapper">
          <div class="header">
            <div class="title">${header}</div>
          </div>
          <div
            class="attributes"
            style=${this.config.columns
              ? `grid-template-columns: repeat(${this.config.columns}, minmax(0, 1fr));`
              : ''}
          >
            ${barElements}
          </div>
        </div>
      </ha-card>
    `;
  }
}



if (!customElements.get('airq-card')) {
  customElements.define('airq-card', AirQualityCard);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'airq-card',
  name: 'Luftqualität',
  description: 'Zeigt Luftqualitätssensoren mit Wertebereichen und Farbverläufen.',
  preview: true
});

console.info('🧪 Registering card...');

customElements.whenDefined('airq-card').then(() => {
  console.info('✅ airq-card is defined and ready.');
});

if (!customElements.get('airq-card')) {
  console.warn('🚨 airq-card not defined yet, defining now...');
  customElements.define('airq-card', AirQualityCard);
} else {
  console.info('✅ airq-card already defined');
}
