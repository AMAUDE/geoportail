(function () {
  'use strict';

  // Centre Côte d'Ivoire
  var center = [7.54, -5.55];
  var defaultZoom = 7;

  var map = L.map('map', {
    center: center,
    zoom: defaultZoom,
    zoomControl: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'topright' }).addTo(map);

  var infoContent = document.getElementById('info-content');

  function setInfo(html) {
    infoContent.innerHTML = html;
  }

  function propsToRows(properties) {
    if (!properties || typeof properties !== 'object') return '';
    var rows = [];
    var labels = {
      PAYS: 'Pays',
      DISTRICT: 'District',
      REGION: 'Région',
      PREFECTURE: 'Département / Préfecture'
    };
    Object.keys(properties).forEach(function (key) {
      var label = labels[key] || key;
      var value = properties[key];
      if (value != null && value !== '') {
        rows.push('<div class="row"><span class="key">' + label + '</span><span>' + value + '</span></div>');
      }
    });
    return rows.length ? rows.join('') : '<p>Aucune donnée</p>';
  }

  function styleLayer(color, weight) {
    return {
      fillColor: color,
      weight: weight,
      color: '#fff',
      opacity: 0.9,
      fillOpacity: 0.25
    };
  }

  function onMouseOver(e) {
    var layer = e.target;
    layer.setStyle({
      fillOpacity: 0.45,
      weight: 2
    });
    layer.bringToFront();
    var props = layer.feature && layer.feature.properties;
    setInfo(propsToRows(props));
  }

  function onMouseOut(e, baseStyle) {
    var layer = e.target;
    layer.setStyle(baseStyle);
    setInfo('Survoler une zone...');
  }

  function bindPopupAndHover(layer, baseStyle) {
    var props = layer.feature && layer.feature.properties;
    if (props) {
      layer.bindPopup(propsToRows(props), { className: 'custom-popup' });
    }
    layer.on('mouseover', onMouseOver);
    layer.on('mouseout', function (e) { onMouseOut(e, baseStyle); });
  }

  var layerRegion = null;
  var layerDepartement = null;
  var layerDistrict = null;

  function addRegionLayer() {
    if (typeof region === 'undefined') return;
    var style = styleLayer('#3182ce', 1.5);
    layerRegion = L.geoJSON(region, {
      style: style,
      onEachFeature: function (feature, layer) {
        bindPopupAndHover(layer, style);
      }
    });
    layerRegion.addTo(map);
  }

  function addDepartementLayer() {
    if (typeof departement === 'undefined') return;
    var style = styleLayer('#38a169', 1.2);
    layerDepartement = L.geoJSON(departement, {
      style: style,
      onEachFeature: function (feature, layer) {
        bindPopupAndHover(layer, style);
      }
    });
    layerDepartement.addTo(map);
  }

  function addDistrictLayer() {
    if (typeof district === 'undefined') return;
    var style = styleLayer('#d69e2e', 1.5);
    layerDistrict = L.geoJSON(district, {
      style: style,
      onEachFeature: function (feature, layer) {
        bindPopupAndHover(layer, style);
      }
    });
    layerDistrict.addTo(map);
  }

  function toggleLayer(name, addToMap) {
    if (name === 'region') {
      if (layerRegion) {
        if (addToMap) map.addLayer(layerRegion); else map.removeLayer(layerRegion);
      } else if (addToMap) addRegionLayer();
    } else if (name === 'departement') {
      if (layerDepartement) {
        if (addToMap) map.addLayer(layerDepartement); else map.removeLayer(layerDepartement);
      } else if (addToMap) addDepartementLayer();
    } else if (name === 'district') {
      if (layerDistrict) {
        if (addToMap) map.addLayer(layerDistrict); else map.removeLayer(layerDistrict);
      } else if (addToMap) addDistrictLayer();
    }
  }

  document.getElementById('layer-region').addEventListener('change', function () {
    toggleLayer('region', this.checked);
  });
  document.getElementById('layer-departement').addEventListener('change', function () {
    toggleLayer('departement', this.checked);
  });
  document.getElementById('layer-district').addEventListener('change', function () {
    toggleLayer('district', this.checked);
  });

  // Charger la couche Régions par défaut
  addRegionLayer();
})();
