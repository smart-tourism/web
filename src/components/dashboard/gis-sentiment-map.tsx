'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Button } from "@/components/ui/button"

const containerStyle = {
  width: '100%',
  height: '600px'
}

const center = {
  lat: -2.5489,
  lng: 118.0149
}

const locations = [
  { name: "Yogyakarta", lat: -7.7956, lng: 110.3695 },
  { name: "Mandalika", lat: -8.8955, lng: 116.2951 },
  { name: "Likupang", lat: 1.6824, lng: 125.0568 },
  { name: "Labuan Bajo", lat: -8.4539, lng: 119.8890 },
  { name: "Danau Toba", lat: 2.6845, lng: 98.8588 }
]

type Sentiment = {
  type: 'positive' | 'negative'
  score: number
  text: string
}

type SentimentSummary = {
  positiveCount: number
  negativeCount: number
  averageScore: number
}

// mock buat generate sentiment
const generateMockSentiments = (count: number): Sentiment[] => {
  const sentiments: Sentiment[] = []
  for (let i = 0; i < count; i++) {
    sentiments.push({
      type: Math.random() > 0.5 ? 'positive' : 'negative',
      score: Math.random() * 2 - 1, // Score between -1 and 1
      text: `Sample sentiment ${i + 1}`
    })
  }
  return sentiments
}

// mock sentiment data kalo ribuan
const mockSentiments: Record<string, Sentiment[]> = {
  "Yogyakarta": generateMockSentiments(5000),
  "Mandalika": generateMockSentiments(3000),
  "Likupang": generateMockSentiments(2000),
  "Labuan Bajo": generateMockSentiments(4000),
  "Danau Toba": generateMockSentiments(3500)
}

const ITEMS_PER_PAGE = 10

export default function GISSentimentMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAPS_KEY}` // Replace with your actual API key
  })

  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sentimentSummary, setSentimentSummary] = useState<SentimentSummary | null>(null)

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center)
    locations.forEach(location => bounds.extend({ lat: location.lat, lng: location.lng }))
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const handleMarkerClick = (locationName: string) => {
    setSelectedLocation(locationName)
    setCurrentPage(1)
    calculateSentimentSummary(locationName)
  }

  const closeInfoWindow = () => {
    setSelectedLocation(null)
    setSentimentSummary(null)
  }

  const calculateSentimentSummary = (locationName: string) => {
    const sentiments = mockSentiments[locationName]
    const positiveCount = sentiments.filter(s => s.type === 'positive').length
    const negativeCount = sentiments.length - positiveCount
    const averageScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length

    setSentimentSummary({
      positiveCount,
      negativeCount,
      averageScore
    })
  }

  const getPaginatedSentiments = () => {
    if (!selectedLocation) return []
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return mockSentiments[selectedLocation].slice(start, start + ITEMS_PER_PAGE)
  }

  const totalPages = selectedLocation
    ? Math.ceil(mockSentiments[selectedLocation].length / ITEMS_PER_PAGE)
    : 0

  return isLoaded ? (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-black">Maps / GIS Analisis</h1>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              onClick={() => handleMarkerClick(location.name)}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={locations.find(loc => loc.name === selectedLocation)}
              onCloseClick={closeInfoWindow}
            >
              <div className="max-w-md">
                <h2 className="text-black text-xl font-semibold mb-2">{selectedLocation}</h2>
                {sentimentSummary && (
                  <div className="mb-4 p-2 bg-gray-100 rounded text-black">
                    <p>Total Sentiments: {sentimentSummary.positiveCount + sentimentSummary.negativeCount}</p>
                    <p>Positive: {sentimentSummary.positiveCount}</p>
                    <p>Negative: {sentimentSummary.negativeCount}</p>
                    <p>Average Score: {sentimentSummary.averageScore.toFixed(2)}</p>
                  </div>
                )}
                <div className="text-black max-h-60 overflow-y-auto">
                  {getPaginatedSentiments().map((sentiment, index) => (
                    <div key={index} className={`mb-2 p-2 rounded ${sentiment.type === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
                      <p className="font-semibold">{sentiment.type === 'positive' ? 'Positive' : 'Negative'} Sentiment</p>
                      <p>{sentiment.text}</p>
                      <p className="text-sm text-gray-600">Score: {sentiment.score.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  ) : <></>
}
