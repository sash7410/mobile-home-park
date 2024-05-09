"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const googlemap = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const markersRef = useRef([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      const center = { lat: 35.630066, lng: -79.806419 };
      const map = new google.maps.Map(googlemap.current, { center, zoom: 7 });

      const parks = [
        { lat: 35.7796, lng: -78.6382, name: 'Park A', size: 'large', amenities: ['pool', 'wifi'] },
        { lat: 36.0726, lng: -79.7920, name: 'Park B', size: 'small', amenities: ['safari', 'food']  },
        { lat: 35.2271, lng: -80.8431, name: 'Park C', size: 'medium', amenities: ['sauna', 'drinks']  },
      ];

      parks.forEach(park => {
        const marker = new google.maps.Marker({
          position: { lat: park.lat, lng: park.lng },
          map: map,
          title: park.name
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="width: 280px; padding: 15px; background: white; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <h3 style="color: #333; font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 8px;">${park.name}</h3>
                      <p style="color: #555; font-size: 14px; margin-top: 0;">Description or other details here, kept brief. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <div style="text-align: right; margin-top: 12px;">
                        <button style="padding: 6px 12px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;">
                          More Info
                        </button>
                      </div>
                    </div>`
        });

        marker.addListener('click', () => {
          if (window.prevInfoWindow) {
            window.prevInfoWindow.close();
          }
          window.prevInfoWindow = infoWindow;
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      });
    });
  }, []);

  const handleSearchChange = event => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    markersRef.current.forEach(marker => {
      const isVisible = marker.title.toLowerCase().includes(value);
      marker.setVisible(isVisible);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search for parks..."
          onChange={handleSearchChange}
          style={{ width: '300px', padding: '10px', margin: '10px', color: 'black' }}
        />
      </div>
      <div style={{ width: '100%', height: '500px', marginTop: '20px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} ref={googlemap}></div>
    </div>
  );
};

export default Map;
