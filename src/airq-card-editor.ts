import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { AirQualityCardConfig, SensorType } from './airq-card';

@customElement('airq-card-editor')
export class AirQualityCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AirQualityCardConfig;

  setConfig(config: AirQualityCardConfig) {
    this._config = { ...config };
  }

  static styles = css`
    .config-field {
      display: block;
      width: 100%;
      margin-bottom: 12px;
    }
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

  private _valueChanged(ev: Event, key: SensorType, field: string) {
    if (!this._config.entities) return;
    const target = ev.target as HTMLInputElement;
    const newVal = field === 'min' || field === 'max' ? parseFloat(target.value) : target.value;

    if (!this._config.entities[key]) this._config.entities[key] = '';

    if (!('_customThresholds' in this._config)) {
      (this._config as any)._customThresholds = {};
    }

    (this._config as any)._customThresholds[key] = {
      ...(this._config as any)._customThresholds?.[key],
      [field]: newVal
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const sensors: SensorType[] = ['co2', 'voc', 'pm25', 'temperature', 'humidity', 'rating'];
    const customThresholds = (this._config as any)._customThresholds || {};

    return html`
      <div class="card-config">
        <ha-textfield
          class="config-field"
          label="Title"
          .value=${this._config.title || ''}
          @input=${(e: Event) => {
            this._config.title = (e.target as HTMLInputElement).value;
            fireEvent(this, 'config-changed', { config: this._config });
          }}
        ></ha-textfield>
        <ha-textfield
          class="config-field"
          label="Room (optional)"
          .value=${this._config.room || ''}
          @input=${(e: Event) => {
            this._config.room = (e.target as HTMLInputElement).value;
            fireEvent(this, 'config-changed', { config: this._config });
          }}
        ></ha-textfield>
        <ha-textfield
          class="config-field"
          label="Number of columns (leave blank for automatic)"
          type="number"
          min="1"
          step="1"
          placeholder="Automatic"
          .value=${this._config.columns ?? ''}
          @input=${(e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input.value === '') {
              delete this._config.columns;
            } else {
              const columns = Number(input.value);
              if (!Number.isInteger(columns) || columns < 1) return;
              this._config.columns = columns;
            }
            fireEvent(this, 'config-changed', { config: this._config });
          }}
        ></ha-textfield>
        ${sensors.map(sensorKey => {
          const threshold = customThresholds[sensorKey] || {};
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
              ${sensorKey !== 'rating' ? html`
                <ha-textfield
                  class="config-field"
                  label="Absolute Min"
                  type="number"
                  .value=${threshold.min ?? ''}
                  @input=${(e: Event) => this._valueChanged(e, sensorKey, 'min')}
                ></ha-textfield>
                <ha-textfield
                  class="config-field"
                  label="Absolute Max"
                  type="number"
                  .value=${threshold.max ?? ''}
                  @input=${(e: Event) => this._valueChanged(e, sensorKey, 'max')}
                ></ha-textfield>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}
