
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface MapboxMapProps {
  onLocationSelect?: (location: { address: string; coordinates: [number, number] }) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  showRadiusControl?: boolean;
  radius?: number;
  onRadiusChange?: (radius: number) => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  onLocationSelect,
  center = [5.2913, 52.1326], // Netherlands center
  zoom = 7,
  height = "400px",
  showRadiusControl = false,
  radius = 30,
  onRadiusChange
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const radiusCircle = useRef<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [needsToken, setNeedsToken] = useState(false);

  useEffect(() => {
    // Check if we have a token in environment or need user input
    const token = import.meta.env.VITE_MAPBOX_TOKEN || '';
    if (token) {
      setMapboxToken(token);
      initializeMap(token);
    } else {
      setNeedsToken(true);
    }
  }, []);

  useEffect(() => {
    if (map.current && showRadiusControl) {
      updateRadiusCircle();
    }
  }, [radius]);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add click handler
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      addMarker([lng, lat]);
      
      // Reverse geocoding to get address
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
          const address = data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          onLocationSelect?.({ address, coordinates: [lng, lat] });
        })
        .catch(() => {
          onLocationSelect?.({ address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, coordinates: [lng, lat] });
        });
    });

    if (showRadiusControl) {
      map.current.on('load', () => {
        updateRadiusCircle();
      });
    }
  };

  const addMarker = (coordinates: [number, number]) => {
    if (!map.current) return;

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Add new marker
    marker.current = new mapboxgl.Marker({ color: '#10B981' })
      .setLngLat(coordinates)
      .addTo(map.current);

    // Center map on marker
    map.current.flyTo({ center: coordinates, zoom: 10 });

    if (showRadiusControl) {
      updateRadiusCircle(coordinates);
    }
  };

  const updateRadiusCircle = (centerCoords?: [number, number]) => {
    if (!map.current) return;

    // Get center coordinates - either provided or from map center
    let mapCenter: { lng: number; lat: number };
    if (centerCoords) {
      mapCenter = { lng: centerCoords[0], lat: centerCoords[1] };
    } else {
      const center = map.current.getCenter();
      mapCenter = { lng: center.lng, lat: center.lat };
    }

    const radiusInMeters = radius * 1000;

    // Remove existing circle
    if (radiusCircle.current) {
      if (map.current.getLayer(radiusCircle.current)) {
        map.current.removeLayer(radiusCircle.current);
      }
      if (map.current.getSource(radiusCircle.current)) {
        map.current.removeSource(radiusCircle.current);
      }
    }

    // Create circle
    const circleId = 'radius-circle';
    radiusCircle.current = circleId;

    // Calculate circle points
    const points = [];
    const numPoints = 64;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const lat = mapCenter.lat + (radiusInMeters / 111320) * Math.cos(angle);
      const lng = mapCenter.lng + (radiusInMeters / (111320 * Math.cos(mapCenter.lat * Math.PI / 180))) * Math.sin(angle);
      points.push([lng, lat]);
    }
    points.push(points[0]); // Close the circle

    map.current.addSource(circleId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [points]
        },
        properties: {}
      }
    });

    map.current.addLayer({
      id: circleId,
      type: 'fill',
      source: circleId,
      paint: {
        'fill-color': '#10B981',
        'fill-opacity': 0.2
      }
    });

    map.current.addLayer({
      id: `${circleId}-outline`,
      type: 'line',
      source: circleId,
      paint: {
        'line-color': '#10B981',
        'line-width': 2
      }
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      setNeedsToken(false);
      initializeMap(mapboxToken);
    }
  };

  if (needsToken) {
    return (
      <div className="border rounded-lg p-6 text-center" style={{ height }}>
        <h3 className="text-lg font-semibold mb-4">Mapbox Token Required</h3>
        <p className="text-gray-600 mb-4">
          Please enter your Mapbox public token to enable the map. You can get one at{' '}
          <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-brand-lightGreen hover:underline">
            mapbox.com
          </a>
        </p>
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <Button onClick={handleTokenSubmit} disabled={!mapboxToken}>
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="rounded-lg" style={{ height }} />
      {showRadiusControl && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
          <Label htmlFor="radius-slider" className="text-sm font-medium">
            Straal: {radius} km
          </Label>
          <input
            id="radius-slider"
            type="range"
            min="5"
            max="100"
            step="5"
            value={radius}
            onChange={(e) => onRadiusChange?.(parseInt(e.target.value))}
            className="w-24 mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
