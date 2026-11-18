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

  private readonly _temperatureRangeToggleSchema = [
    { name: 'temperature_optimal_range_enabled', selector: { boolean: {} } }
  ];

  private readonly _betterThermostatToggleSchema = [
    { name: 'better_thermostat_enabled', selector: { boolean: {} } }
  ];

  private readonly _betterThermostatEntitySchema = [
    { name: 'better_thermostat_entity', selector: { entity: { domain: 'climate' } } }
  ];

  private readonly _betterThermostatToleranceSchema = [
    {
      name: 'better_thermostat_tolerance',
      required: true,
      selector: { number: { min: 0.1, max: 2, step: 0.1, mode: 'box' } }
    }
  ];

  private readonly _temperatureScalePaddingSchema = [
    {
      name: 'temperature_scale_padding',
      required: true,
      selector: { number: { min: 1, max: 15, step: 1, mode: 'slider' } }
    }
  ];

  private readonly _temperatureRangeSchema = [
    { name: 'temperature_optimal_min', selector: { number: { mode: 'box', step: 0.1 } } },
    { name: 'temperature_optimal_max', selector: { number: { mode: 'box', step: 0.1 } } }
  ];

  setConfig(config: AirQualityCardConfig) {
    this._config = {
      ...config,
      better_thermostat_tolerance: config.better_thermostat_tolerance ?? 1,
      temperature_scale_padding: config.temperature_scale_padding ?? 10,
      temperature_optimal_range_enabled: config.better_thermostat_enabled
        ? false
        : config.temperature_optimal_range_enabled
    };
  }

  static styles = css`
    .sensor-entry {
      margin-bottom: 12px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
    .temperature-range-toggle {
      display: block;
      margin-top: 24px;
    }
    .better-thermostat-toggle,
    .better-thermostat-entity {
      display: block;
      margin-top: 24px;
    }
    .temperature-scale-slider {
      display: block;
      margin-top: 24px;
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
      temperature_optimal_range_enabled: 'Eigenen Optimalbereich verwenden',
      temperature_optimal_min: 'Optimalbereich min (°C)',
      temperature_optimal_max: 'Optimalbereich max (°C)',
      better_thermostat_enabled: 'Better Thermostat nutzen',
      better_thermostat_entity: '',
      better_thermostat_tolerance: 'Toleranz um den Sollwert (°C)',
      temperature_scale_padding: 'Temperaturskala-Bereich'
    };
    return labels[schema.name] ?? schema.name;
  }

  private _computeHelper(schema: { name: string }) {
    return schema.name === 'temperature_scale_padding'
      ? 'Erweitert den Optimalbereich auf beiden Seiten um den gewählten Wert (z. B. 10 °C darunter und darüber).'
      : undefined;
  }

  private _getBetterThermostatTarget() {
    const entityId = this._config.better_thermostat_entity;
    const entity = entityId ? this.hass.states[entityId] : undefined;
    if (!entity || entity.state === 'unavailable') return undefined;

    const target = entity.attributes.temperature;
    if (typeof target !== 'number' && typeof target !== 'string') return undefined;
    const numericTarget = Number(target);
    return Number.isFinite(numericTarget) ? numericTarget : undefined;
  }

  private _hasValidTemperatureRange() {
    const min = this._config.temperature_optimal_min;
    const max = this._config.temperature_optimal_max;
    return min !== undefined && max !== undefined &&
      Number.isFinite(min) && Number.isFinite(max) && min < max;
  }

  private _settingsChanged(ev: CustomEvent<{ value: Partial<AirQualityCardConfig> }>) {
    const nextConfig = { ...this._config, ...ev.detail.value };
    if (nextConfig.better_thermostat_tolerance == null) {
      nextConfig.better_thermostat_tolerance = this._config.better_thermostat_tolerance ?? 1;
    }
    if (nextConfig.temperature_scale_padding == null) {
      nextConfig.temperature_scale_padding = this._config.temperature_scale_padding ?? 10;
    }
    const manualRangeEnabled = nextConfig.temperature_optimal_range_enabled &&
      !this._config.temperature_optimal_range_enabled;
    const betterThermostatEnabled = nextConfig.better_thermostat_enabled &&
      !this._config.better_thermostat_enabled;

    if (betterThermostatEnabled) {
      nextConfig.temperature_optimal_range_enabled = false;
    } else if (manualRangeEnabled) {
      nextConfig.better_thermostat_enabled = false;
    }

    if (nextConfig.better_thermostat_enabled && nextConfig.temperature_optimal_range_enabled) {
      nextConfig.temperature_optimal_range_enabled = false;
    }

    this._config = nextConfig;
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
                  class="temperature-range-toggle"
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
                <ha-form
                  class="better-thermostat-toggle"
                  .hass=${this.hass}
                  .data=${this._config}
                  .schema=${this._betterThermostatToggleSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._settingsChanged}
                ></ha-form>
                ${this._config.better_thermostat_enabled ? html`
                  <ha-form
                    class="better-thermostat-entity"
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._betterThermostatEntitySchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._settingsChanged}
                  ></ha-form>
                  ${this._getBetterThermostatTarget() === undefined ? html`
                    <ha-alert alert-type="warning">
                      Bitte eine Climate-Entität mit einem gültigen Attribut „temperature“ auswählen.
                    </ha-alert>
                  ` : ''}
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._betterThermostatToleranceSchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._settingsChanged}
                  ></ha-form>
                ` : ''}
                <ha-form
                  class="temperature-scale-slider"
                  .hass=${this.hass}
                  .data=${this._config}
                  .schema=${this._temperatureScalePaddingSchema}
                  .computeLabel=${this._computeLabel}
                  .computeHelper=${this._computeHelper}
                  @value-changed=${this._settingsChanged}
                ></ha-form>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}
