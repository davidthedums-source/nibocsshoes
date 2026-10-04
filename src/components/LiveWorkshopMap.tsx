// Source: Google Maps Platform Code Assist
import React, { useState, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  ColorScheme,
  useMap,
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, ExternalLink, Copy, Check, Compass, Layers, Globe } from 'lucide-react';
import { BUSINESS_INFO } from '../data/footwearData';

const WORKSHOP_COORDINATES = {
  lat: 6.4715,
  lng: 3.6288,
};

// Valid Google Cloud API keys start with 'AIza' and are approximately 39 characters
const isValidGoogleMapsKey = (key: string | undefined): boolean => {
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.startsWith('AIza') && trimmed.length >= 35;
};

// Component to recenter the map on the workshop
const RecenterControl: React.FC = () => {
  const map = useMap();

  const handleRecenter = useCallback(() => {
    if (map) {
      map.panTo(WORKSHOP_COORDINATES);
      map.setZoom(16);
    }
  }, [map]);

  return (
    <button
      type="button"
      onClick={handleRecenter}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/10 shadow-lg backdrop-blur-md transition-colors cursor-pointer"
      title="Recenter on NIBOCS Workshop"
    >
      <Compass className="w-3.5 h-3.5 text-[#c69c6d]" />
      <span>Recenter</span>
    </button>
  );
};

export const LiveWorkshopMap: React.FC = () => {
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'hybrid'>('roadmap');
  const [authFailed, setAuthFailed] = useState(false);

  // Load API key from Vite environment variable
  const rawApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const hasValidKey = isValidGoogleMapsKey(rawApiKey) && !authFailed;

  useEffect(() => {
    const handleAuthFailure = () => {
      setAuthFailed(true);
    };

    window.addEventListener('gmp-auth-failure', handleAuthFailure);
    return () => {
      window.removeEventListener('gmp-auth-failure', handleAuthFailure);
    };
  }, []);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${WORKSHOP_COORDINATES.lat}, ${WORKSHOP_COORDINATES.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'DKK Street, Sangotedo, Cannan Estate, Lagos, Nigeria'
  )}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${WORKSHOP_COORDINATES.lat},${WORKSHOP_COORDINATES.lng}`;

  const embedMapUrl = `https://maps.google.com/maps?q=${WORKSHOP_COORDINATES.lat},${WORKSHOP_COORDINATES.lng}&hl=en&z=15&output=embed`;

  return (
    <div className="rounded-2xl overflow-hidden bg-neutral-950/80 border border-white/15 p-4 sm:p-5 space-y-4 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#14ae5c] animate-pulse" />
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c69c6d]" />
              Live Workshop Map
            </h4>
            <p className="text-[11px] text-neutral-400">
              Cannan Estate, Sangotedo, Lagos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasValidKey && (
            <button
              type="button"
              onClick={() => setMapType((prev) => (prev === 'roadmap' ? 'hybrid' : 'roadmap'))}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Satellite / Map view"
            >
              <Layers className="w-3.5 h-3.5 text-[#c69c6d]" />
              <span className="capitalize">{mapType === 'roadmap' ? 'Satellite' : 'Roadmap'}</span>
            </button>
          )}

          {/* Coordinates chip */}
          <button
            type="button"
            onClick={handleCopyCoords}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-[#0d99ff] hover:border-[#0d99ff]/30 transition-colors cursor-pointer"
            title="Click to copy coordinates"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#14ae5c]" />
                <span className="text-[#14ae5c]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-neutral-400" />
                <span>6.4715° N, 3.6288° E</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Map Viewport */}
      <div className="relative w-full h-[340px] sm:h-[400px] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
        {hasValidKey ? (
          <APIProvider apiKey={rawApiKey} libraries={['marker']}>
            <div className="w-full h-full relative">
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={WORKSHOP_COORDINATES}
                defaultZoom={15}
                gestureHandling="cooperative"
                disableDefaultUI={false}
                colorScheme={ColorScheme.DARK}
                mapTypeId={mapType}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
              >
                {/* Workshop Advanced Marker */}
                <AdvancedMarker
                  position={WORKSHOP_COORDINATES}
                  title="NIBOCS SHOE Workshop & Showroom"
                  onClick={() => setShowInfoWindow((prev) => !prev)}
                >
                  <Pin
                    background="#c69c6d"
                    borderColor="#262626"
                    glyphColor="#0b0c0e"
                    scale={1.15}
                  />
                </AdvancedMarker>

                {/* Info Window */}
                {showInfoWindow && (
                  <InfoWindow
                    position={WORKSHOP_COORDINATES}
                    onCloseClick={() => setShowInfoWindow(false)}
                    pixelOffset={[0, -42]}
                    headerDisabled
                  >
                    <div className="p-2 max-w-[240px] text-neutral-950 font-sans">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#c69c6d]" />
                        <span className="text-xs font-bold tracking-tight text-neutral-900">
                          NIBOCS SHOE
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-neutral-700 leading-snug">
                        Workshop, Production & Showroom
                      </p>
                      <p className="text-[10px] text-neutral-600 mt-1">
                        DKK Street, Sangotedo, Cannan Estate, Lagos
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px]">
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#8a5e30] hover:text-[#5c3a1b] flex items-center gap-1 transition-colors"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Directions</span>
                        </a>
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 hover:text-neutral-900 flex items-center gap-0.5 transition-colors"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>

              {/* Floating Quick Action Overlay on Map */}
              <div className="absolute top-3 left-3 z-10">
                <RecenterControl />
              </div>
            </div>
          </APIProvider>
        ) : (
          /* Live Interactive Google Map Embed (Zero invalid key crash, fully interactive) */
          <div className="w-full h-full relative">
            <iframe
              title="NIBOCS SHOE Workshop Live Map"
              src={embedMapUrl}
              className="w-full h-full border-0"
              style={{
                filter: 'invert(90%) hue-rotate(180deg) contrast(105%) brightness(95%)',
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Custom Location Overlay Badge */}
            <div className="absolute top-3 left-3 z-10 pointer-events-auto">
              <div className="px-3 py-1.5 rounded-lg bg-neutral-950/90 border border-[#c69c6d]/30 text-white shadow-xl backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14ae5c] animate-ping" />
                <span className="text-xs font-semibold">NIBOCS Workshop · Sangotedo</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-white/5">
        <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
          <span>{BUSINESS_INFO.address}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#c69c6d] hover:text-[#e4be91] font-semibold text-xs transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>

          <span className="text-neutral-700">|</span>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-400 hover:text-white text-xs transition-colors"
          >
            <span>Open Fullscreen</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
