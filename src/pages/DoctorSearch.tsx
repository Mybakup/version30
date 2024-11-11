import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mic, ArrowLeft, Star, Navigation2 } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { mockDoctors } from '../data/mockDoctors';
import type { Doctor } from '../types';
import DoctorProfile from '../components/DoctorProfile';

export default function DoctorSearch() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const { startListening, stopListening, isSupported } = useVoiceRecognition({
    onResult: (text) => {
      console.log('Voice result:', text);
    },
  });

  return (
    <div className="h-screen flex flex-col">
      {/* Map Container */}
      <div className={`flex-1 relative ${isListExpanded ? 'h-[30vh]' : ''}`}>
        <img 
          src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/2.3522,48.8566,13,0/1200x800@2x?access_token=pk.eyJ1IjoibXliYWt1cCIsImEiOiJjbHNlMWN4Y2wwMXZtMmpyd2V5ZXB1NXlqIn0.v7EZWiw1XkR1fGuZtxqWYg"
          alt="Paris Map"
          className="w-full h-full object-cover"
        />

        {/* Search Filters */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="flex w-full">
              <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex">
                <div className="flex-1 relative border-r border-gray-200">
                  <select className="w-full h-12 pl-4 pr-10 bg-transparent text-mybakup-blue focus:outline-none appearance-none">
                    <option value="">Spécialité médicale</option>
                    <option>Généraliste</option>
                    <option>Dentiste</option>
                    <option>Pédiatre</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <select className="w-full h-12 pl-4 pr-10 bg-transparent text-mybakup-blue focus:outline-none appearance-none">
                    <option value="">Langues</option>
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Adresse"
                className="w-full h-12 pl-10 pr-24 bg-white border border-gray-200 rounded-xl text-mybakup-blue focus:outline-none focus:border-mybakup-coral"
              />
              <MapPin className="absolute left-3 w-5 h-5 text-gray-400" />
              <div className="absolute right-3 flex items-center gap-2">
                <button
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <Navigation2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/voice-command')}
                  disabled={!isSupported}
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div 
        className={`bg-white rounded-t-[2rem] shadow-lg transition-all duration-300 ease-in-out ${
          isListExpanded ? 'h-[70vh]' : 'h-auto'
        }`}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">Nearby Doctors</h2>
            <button 
              onClick={() => setIsListExpanded(!isListExpanded)}
              className="text-mybakup-coral hover:text-mybakup-coral/80 transition-colors px-4 py-2 bg-red-50 rounded-full"
            >
              {isListExpanded ? 'Voir carte' : 'Voir liste'}
            </button>
          </div>

          {isListExpanded ? (
            // Liste verticale
            <div className="space-y-4 overflow-y-auto max-h-[calc(70vh-8rem)]">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                    selectedDoctor?.id === doctor.id 
                      ? 'border-2 border-mybakup-coral' 
                      : 'border border-gray-100 hover:border-mybakup-coral'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                          </div>
                          <span className="text-xs font-medium text-mybakup-coral">{doctor.distance}</span>
                        </div>
                        <h3 className="font-semibold text-mybakup-blue mt-1">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <span className="text-sm text-mybakup-coral font-medium">€{doctor.consultationPrice}</span>
                            <span className="text-xs text-gray-500 ml-1">/ visit</span>
                          </div>
                          <button 
                            className="px-4 py-2 bg-mybakup-coral text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Slider horizontal
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`flex-shrink-0 w-72 bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                    selectedDoctor?.id === doctor.id 
                      ? 'border-2 border-mybakup-coral shadow-md' 
                      : 'border border-gray-100 hover:border-mybakup-coral'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                          </div>
                          <span className="text-xs font-medium text-mybakup-coral">{doctor.distance}</span>
                        </div>
                        <h3 className="font-semibold text-mybakup-blue mt-1">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm text-mybakup-coral font-medium">€{doctor.consultationPrice}</span>
                        <span className="text-xs text-gray-500 ml-1">/ visit</span>
                      </div>
                      <button 
                        onClick={() => setSelectedDoctor(doctor)}
                        className="px-4 py-2 bg-mybakup-coral text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfile 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
    </div>
  );
}