
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface MockMapProps {
  className?: string;
  startPoint?: Coordinates;
  endPoint?: Coordinates;
  showDriverLocation?: boolean;
  isMoving?: boolean;
}

// This is a simple map component that mimics a real map
// In a production app, you would use a real map service like Google Maps, Mapbox, etc.
export function MockMap({ 
  className, 
  startPoint = { lat: 18.5204, lng: 73.8567 }, // Pune coordinates as default
  endPoint = { lat: 18.5314, lng: 73.8446 },
  showDriverLocation = true,
  isMoving = false
}: MockMapProps) {
  const [driverLocation, setDriverLocation] = useState<Coordinates>({
    lat: startPoint.lat - 0.008, // Start a bit away from pickup
    lng: startPoint.lng - 0.007
  });

  // Simulate driver movement
  useEffect(() => {
    if (!isMoving || !showDriverLocation) return;

    // Calculate the increments to move the driver toward the start point
    const latIncrement = (startPoint.lat - driverLocation.lat) / 30;
    const lngIncrement = (startPoint.lng - driverLocation.lng) / 30;
    
    const interval = setInterval(() => {
      setDriverLocation(prev => {
        const newLocation = {
          lat: prev.lat + latIncrement,
          lng: prev.lng + lngIncrement
        };

        // Check if we've reached the destination (approximately)
        const distance = Math.sqrt(
          Math.pow(newLocation.lat - startPoint.lat, 2) +
          Math.pow(newLocation.lng - startPoint.lng, 2)
        );

        if (distance < 0.0005) {
          clearInterval(interval);
        }

        return newLocation;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isMoving, showDriverLocation, startPoint, driverLocation]);

  // Convert geo coordinates to pixel positions
  const mapWidth = 400;  // Base map width
  const mapHeight = 300; // Base map height
  
  // Function to convert lat/lng to pixel positions
  const getPixelPosition = (coords: Coordinates): { x: number, y: number } => {
    // Get the range of coordinates
    const minLat = Math.min(startPoint.lat, endPoint.lat, driverLocation.lat) - 0.01;
    const maxLat = Math.max(startPoint.lat, endPoint.lat, driverLocation.lat) + 0.01;
    const minLng = Math.min(startPoint.lng, endPoint.lng, driverLocation.lng) - 0.01;
    const maxLng = Math.max(startPoint.lng, endPoint.lng, driverLocation.lng) + 0.01;
    
    // Convert to pixels (invert lat because pixels increase downward)
    const x = ((coords.lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - coords.lat) / (maxLat - minLat)) * mapHeight;
    
    return { x, y };
  };

  const startPosition = getPixelPosition(startPoint);
  const endPosition = getPixelPosition(endPoint);
  const driverPosition = getPixelPosition(driverLocation);

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800", className)}
         style={{ height: mapHeight, width: "100%" }}>
      {/* Map paths and grid lines */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Grid lines */}
        <g stroke="rgba(200,200,200,0.2)" strokeWidth="1">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * mapHeight / 10} x2="100%" y2={i * mapHeight / 10} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * mapWidth / 10} y1="0" x2={i * mapWidth / 10} y2="100%" />
          ))}
        </g>
        
        {/* Road between points */}
        <path
          d={`M${startPosition.x},${startPosition.y} L${endPosition.x},${endPosition.y}`}
          stroke="#9b87f5"
          strokeWidth="3"
          strokeDasharray="5,5"
          fill="none"
        />
      </svg>
      
      {/* Start point marker */}
      <div 
        className="absolute flex items-center justify-center w-6 h-6 bg-medical-primary text-white rounded-full"
        style={{ 
          left: startPosition.x, 
          top: startPosition.y,
          transform: "translate(-50%, -50%)" 
        }}
      >
        <MapPin size={14} />
      </div>
      
      {/* End point marker */}
      <div 
        className="absolute flex items-center justify-center w-6 h-6 bg-medical-secondary text-white rounded-full"
        style={{ 
          left: endPosition.x, 
          top: endPosition.y,
          transform: "translate(-50%, -50%)" 
        }}
      >
        <MapPin size={14} />
      </div>
      
      {/* Driver location */}
      {showDriverLocation && (
        <div 
          className="absolute flex items-center justify-center w-8 h-8 bg-white text-medical-primary rounded-full shadow-lg animate-pulse-soft"
          style={{ 
            left: driverPosition.x, 
            top: driverPosition.y,
            transform: "translate(-50%, -50%)" 
          }}
        >
          <Ambulance size={18} />
        </div>
      )}
      
      {/* Map attribution */}
      <div className="absolute bottom-1 right-2 text-[10px] text-gray-400">
        Mock Map (Simulated)
      </div>
    </div>
  );
}
