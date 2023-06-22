import React, { useEffect,useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet-providers';
import 'leaflet/dist/leaflet.css';
import '../../css/Map.css';
import '../../css/Map_Popup.css';
import Loading from '../../pages/Loading/Loading';
import markerIcon from '../../icons/location-pin.png';
import parisImage from '../../icons/eiffeltower.gif'; // Example image for Paris
import osakaImage from '../../icons/japan.gif'; // Example image for osaka
import egyptImage from '../../icons/egypt.gif'; // Example image for egypt
import newYorkImage from '../../icons/usa.gif'; // Example image for New York
import sydneyImage from '../../icons/sydney.gif'; // Example image for Sydney

function Map() {
  const { character } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // Create the map instance
    const map = L.map(mapRef.current, {
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
      maxBounds: [[85, -180], [-85, 180]],
      maxZoom: 2,
    });

    // Set the initial view and zoom level
    map.setView([0, 0], 2);

    // Create a custom icon
    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [55, 55], // Increase the size of the icon
      iconAnchor: [29, 48], // Adjust the icon anchor accordingly
    });

    // Create markers with popups
    const parisMarker = L.marker([44, -11], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${parisImage}" alt="Paris" class="popup-image" />
          <p class="popup-text">파리</p>
        </div>
      `);

    const osakaMarker = L.marker([35, 120], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${osakaImage}" alt="osaka" class="popup-image" />
          <p class="popup-text">오사카</p>
        </div>
      `);

    const egyptMarker = L.marker([24, 14], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${egyptImage}" alt="egypt" class="popup-image" />
          <p class="popup-text">이집트</p>
        </div>
      `);

    const newYorkMarker = L.marker([40, -86], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${newYorkImage}" alt="New York" class="popup-image" />
          <p class="popup-text">뉴욕</p>
        </div>
      `);

    const sydneyMarker = L.marker([-42, 133], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${sydneyImage}" alt="Sydney" class="popup-image" />
          <p class="popup-text">시드니</p>
        </div>
      `);

    // Mouseover event handler
    const onMouseOver = (e) => {
      const marker = e.target;
      marker.openPopup();
    };

    // Mouseout event handler
    const onMouseOut = (e) => {
      const marker = e.target;
      marker.closePopup();
    };

    // To airport.js
    const handleClick = () => {
      navigate(`/${character}/airport`);
    };

    // Add mouseover, mouseout, and click event listeners to markers
    parisMarker.on('mouseover', onMouseOver);
    parisMarker.on('mouseout', onMouseOut);
    parisMarker.on('click', handleClick);

    osakaMarker.on('mouseover', onMouseOver);
    osakaMarker.on('mouseout', onMouseOut);
    osakaMarker.on('click', handleClick);

    egyptMarker.on('mouseover', onMouseOver);
    egyptMarker.on('mouseout', onMouseOut);
    egyptMarker.on('click', handleClick);

    newYorkMarker.on('mouseover', onMouseOver);
    newYorkMarker.on('mouseout', onMouseOut);
    newYorkMarker.on('click', handleClick);

    sydneyMarker.on('mouseover', onMouseOver);
    sydneyMarker.on('mouseout', onMouseOut);
    sydneyMarker.on('click', handleClick);

    // Clean up the map instance when the component is unmounted
    return () => {
      map.remove();
    };
  }, []);
  // <h1 className="map-title">{character}님, 여행할 도시를 선택해 주세요.</h1>
  
  useEffect(() => {
    // Hide the loading spinner after 2 seconds
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="map-wrapper">
      {showLoading && <Loading />}
      <div id="map" className="map-container" ref={mapRef}></div>
    </div>
  );
}

export default Map;