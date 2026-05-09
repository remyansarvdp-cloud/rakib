import { Language } from '../types';

export interface Earthquake {
  id: string;
  mag: number;
  place: string;
  time: number;
  lat: number;
  lon: number;
  depth: number;
  distance?: number;
}

const USGS_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// Haversine formula to calculate distance between two points in km
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; 
  return d;
}

export async function fetchLiveEarthquakes(userLat: number, userLon: number): Promise<Earthquake[]> {
  try {
    const response = await fetch(USGS_API_URL);
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    
    return data.features.map((feature: any) => {
      const { mag, place, time } = feature.properties;
      const [lon, lat, depth] = feature.geometry.coordinates;
      const distance = calculateDistance(userLat, userLon, lat, lon);
      
      return {
        id: feature.id,
        mag,
        place,
        time,
        lat,
        lon,
        depth,
        distance
      };
    }).sort((a: Earthquake, b: Earthquake) => (a.distance || 0) - (b.distance || 0));
  } catch (error) {
    console.error('Error fetching earthquakes:', error);
    return [];
  }
}
