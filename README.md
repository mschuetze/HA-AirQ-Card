# AirQ Card


A custom Lovelace card for Home Assistant to display air quality data with healthy ranges.

## Installation (via HACS)

1. Go to HACS → Frontend → Menu (top right) → Custom Repositories
2. Add this GitHub repository URL:
   Type: Lovelace

   `https://github.com/mschuetze/HA-AirQ-Card`

3. Search for **AirQ Card** in HACS and install
4. Add the following resource to your dashboard:

```yaml
url: /hacsfiles/HA-AirQ-Card/airq-card.js
type: module
```

# Usage

```yaml
type: custom:airq-card
title: Luftqualität
room: Wohnzimmer
columns: 2
entities:
  co2: sensor.your_co2
  voc: sensor.your_voc
  pm25: sensor.your_pm25
  temperature: sensor.your_temp
  humidity: sensor.your_humidity
  rating: sensor.your_rating
```

`room` ergänzt optional den Raumnamen im Kartentitel. Du kannst ihn im visuellen Editor als Text eingeben.

`columns` legt die Anzahl der Sensor-Spalten fest. Wenn die Option fehlt, wird die Anzahl wie bisher automatisch anhand der Kartenbreite bestimmt. Die Einstellung ist auch im visuellen Editor verfügbar.

Für die Temperatur kannst du im visuellen Editor optional einen eigenen Optimalbereich aktivieren und die Unter- und Obergrenze in °C festlegen. Ohne eigene Werte gilt weiterhin der Standardbereich von 18–26 °C.

Alternativ kannst du „Better Thermostat nutzen“ aktivieren und eine Climate-Entität auswählen. Deren Attribut `temperature` legt zusammen mit der einstellbaren Toleranz von 0,1 bis 2,0 °C den Optimalbereich fest. Die Toleranz wird in 0,1-°C-Schritten angepasst; die beiden Temperatur-Modi schließen sich gegenseitig aus. Mit dem Slider „Temperaturskala-Bereich“ stellst du den zusätzlichen Bereich unter und über dem aktiven Optimalbereich auf 1 bis 15 °C ein (Standard: 10 °C).

  - OR you may use the UI for picking the entities
  - Hoovering over the bars will reveal the name of the entity as well as the healthy range expected.
  - An Air Quality Rating entity is optional. The card recognizes unhealthy (ungesund), poor (schlecht), moderate (mäßig), good (gut), and excellent (ausgezeichnet) values, and displays the rating in German.
  - Rating images are no longer used by the card; there is no need to copy image files to Home Assistant.

  ![AirQ Card](./img/base.png)
  ![AirQ Card](./img/hoover.png)
  ![AirQ Card](./img/danger.png)
  

  

## Herkunft und Lizenz

Diese angepasste Version basiert auf [Air Quality Card von RR](https://github.com/UrbanTechIO/air-quality-card).
Die ursprüngliche MIT-Lizenz und der Copyright-Hinweis aus dem Originalprojekt bleiben in [LICENSE](./LICENSE) erhalten.
Das Originalprojekt wurde vom [Flower Card von Olen](https://github.com/Olen/lovelace-flower-card) inspiriert.

  
