import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { AirQualityCardConfig, SensorType } from './airq-card';

@customElement('airq-card-editor')
export class AirQualityCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AirQualityCardConfig;

  private readonly _settingsSchema = [
    { name: 'title', selector: { text: {} } },
    { name: 'room', selector: { text: {} } },
    { name: 'columns', selector: { number: { min: 1, step: 1, mode: 'box' } } }
  ];

  private readonly _thresholdSchema = [
    { name: 'min', selector: { number: {} } },
    { name: 'max', selector: { number: {} } }
  ];

  private readonly _temperatureRangeToggleSchema = [
    { name: 'temperature_optimal_range_enabled', selector: { boolean: {} } }
  ];

  private readonly _temperatureRangeSchema = [
    { name: 'temperature_optimal_min', selector: { number: { mode: 'box', step: 0.1 } } },
    { name: 'temperature_optimal_max', selector: { number: { mode: 'box', step: 0.1 } } }
  ];

  setConfig(config: AirQualityCardConfig) {
    this._config = { ...config };
  }

  static styles = css`
    .sensor-entry {
      margin-bottom: 12px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
    .sensor-entry label {
      display: block;
      font-weight: bold;
      margin-bottom: 4px;
    }
  `;

  private _computeLabel(schema: { name: string }) {
    const labels: Record<string, string> = {
      title: 'Title',
      room: 'Room (optional)',
      columns: 'Number of columns (leave blank for automatic)',
      min: 'Absolute Min',
      max: 'Absolute Max',
      temperature_optimal_range_enabled: 'Eigenen Optimalbereich verwenden',
      temperature_optimal_min: 'Optimalbereich von (°C)',
      temperature_optimal_max: 'Optimalbereich bis (°C)'
    };
    return labels[schema.name] || schema.name;
  }

  private _hasValidTemperatureRange() {
    const min = this._config.temperature_optimal_min;
    const max = this._config.temperature_optimal_max;
    return min !== undefined && max !== undefined &&
      Number.isFinite(min) && Number.isFinite(max) && min < max;
  }

  private _settingsChanged(ev: CustomEvent<{ value: Partial<AirQualityCardConfig> }>) {
    this._config = { ...this._config, ...ev.detail.value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _thresholdsChanged(
    ev: CustomEvent<{ value: { min?: number; max?: number } }>,
    key: SensorType
  ) {
    this._config._customThresholds = {
      ...this._config._customThresholds,
      [key]: {
        ...this._config._customThresholds?.[key],
        ...ev.detail.value
      }
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const sensors: SensorType[] = ['co2', 'voc', 'pm25', 'temperature', 'humidity', 'rating'];

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._settingsSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._settingsChanged}
        ></ha-form>
        ${sensors.map(sensorKey => {
          const threshold = this._config._customThresholds?.[sensorKey] || {};
          return html`
            <div class="sensor-entry">
              <label>${sensorKey.toUpperCase()}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this._config.entities?.[sensorKey] || ''}
                .configValue=${sensorKey}
                @value-changed=${(e: any) => {
                  this._config.entities = {
                    ...this._config.entities,
                    [sensorKey]: e.detail.value
                  };
                  fireEvent(this, 'config-changed', { config: this._config });
                }}
                allow-custom-entity
              ></ha-entity-picker>
              ${sensorKey === 'temperature' ? html`
                <ha-form
                  .hass=${this.hass}
                  .data=${this._config}
                  .schema=${this._temperatureRangeToggleSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._settingsChanged}
                ></ha-form>
                ${this._config.temperature_optimal_range_enabled ? html`
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._temperatureRangeSchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._settingsChanged}
                  ></ha-form>
                  ${this._hasValidTemperatureRange() ? '' : html`
                    <ha-alert alert-type="warning">
                      Bitte beide Temperaturwerte eingeben. Der untere Wert muss kleiner als der obere sein.
                    </ha-alert>
                  `}
                ` : ''}
              ` : ''}
              ${sensorKey !== 'rating' ? html`
                <ha-form
                  .hass=${this.hass}
                  .data=${threshold}
                  .schema=${this._thresholdSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${(e: CustomEvent<{ value: { min?: number; max?: number } }>) =>
                    this._thresholdsChanged(e, sensorKey)}
                ></ha-form>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}
