"use client";
import Select from 'react-select';
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
    const googlemap = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [parks, setParks] = useState([]);
    const markersRef = useRef([]);

  
    useEffect(() => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });
  
      loader.load().then(() => {
        const center = { lat: 35.630066, lng: -79.806419 };
        const map = new google.maps.Map(googlemap.current, { center, zoom: 7 });
  
        const initialParks = [
          { lat: 35.7796, lng: -78.6382, name: 'Park A', size: 'large', amenities: ['pool', 'food'] },
          { lat: 36.0726, lng: -79.7920, name: 'Park B', size: 'small', amenities: ['safari', 'wifi'] },
          { lat: 35.2271, lng: -80.8431, name: 'Park C', size: 'medium', amenities: ['sauna', 'drinks'] },
          { lat: 35.5951, lng: -82.5515, name: 'Park D', size: 'medium', amenities: ['wifi', 'sauna', 'food'] },
          { lat: 35.0527, lng: -78.8784, name: 'Park E', size: 'large', amenities: ['safari', 'pool', 'drinks'] },
          { lat: 35.9132, lng: -79.0558, name: 'Park F', size: 'small', amenities: ['food', 'wifi', 'sauna'] },
          { lat: 36.0999, lng: -80.2442, name: 'Park G', size: 'large', amenities: ['safari', 'sauna', 'pool'] },
          { lat: 34.2257, lng: -77.9447, name: 'Park H', size: 'medium', amenities: ['drinks', 'wifi', 'food'] }        
        ];
  
      setParks(initialParks);
      initialParks.forEach(park => {
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

  useEffect(() => {
    markersRef.current.forEach(marker => {
      const park = parks.find(p => p.name === marker.title);
      const selectedFilters = selectedOptions.map(option => option.value);
      const matchesFilters = selectedFilters.every(filter => 
        park.size === filter || park.amenities.includes(filter)
      );
      const matchesSearch = marker.title.toLowerCase().includes(searchTerm);
      marker.setVisible(matchesFilters && matchesSearch);
    });
  }, [selectedOptions, searchTerm, parks]);
  

  const handleSearchChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const filterOptions = getFilterOptions(parks);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Select
        isMulti
        options={filterOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleFilterChange}
        placeholder="Select Filters..."
        value={selectedOptions}
        styles={customStyles} 
      />
      <input
        type="text"
        placeholder="Search for parks..."
        onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        style={{ width: '300px', padding: '10px', margin: '10px', color: 'black' }}
      />
      <div ref={googlemap} style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>
    </div>
  );
};
const getFilterOptions = (parks) => {
    const sizeOptions = new Set();
    const amenityOptions = new Set();
  
    parks.forEach(park => {
      sizeOptions.add(park.size);
      park.amenities.forEach(amenity => amenityOptions.add(amenity));
    });
  
    return [
      ...Array.from(sizeOptions).map(size => ({ value: size, label: size.charAt(0).toUpperCase() + size.slice(1) })),
      ...Array.from(amenityOptions).map(amenity => ({ value: amenity, label: amenity.charAt(0).toUpperCase() + amenity.slice(1) }))
    ];
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#007BFF' : 'white'
    }),
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    input: styles => ({ ...styles, color: 'black' }),
    placeholder: styles => ({ ...styles, color: 'black' }),
    singleValue: (styles, { data }) => ({ ...styles, color: 'black' }),
  };

export default Map;
