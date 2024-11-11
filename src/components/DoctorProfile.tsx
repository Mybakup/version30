import React, { useState } from 'react';
import { 
  Globe2, Phone, Clock, MapPin, CreditCard, 
  GraduationCap, Stethoscope, Shield, X,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Doctor } from '../types';
import PremiumModal from './PremiumModal';

interface DoctorProfileProps {
  doctor: Doctor;
  onClose: () => void;
}

export default function DoctorProfile({ doctor, onClose }: DoctorProfileProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!doctor.officePictures) return;
    
    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left
        setCurrentImageIndex((prev) => 
          prev === doctor.officePictures!.length - 1 ? 0 : prev + 1
        );
      } else {
        // Swipe right
        setCurrentImageIndex((prev) => 
          prev === 0 ? doctor.officePictures!.length - 1 : prev - 1
        );
      }
    }
  };

  const handlePhoneClick = () => {
    setShowPremiumModal(true);
  };

  const handleBookingClick = () => {
    navigate('/appointment', { state: { doctor } });
  };

  return (
    <div className="fixed inset-0 bg-[#EDF5FF] z-50 overflow-y-auto overflow-x-hidden">
      {/* Header with background shapes */}
      <div className="relative h-48">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE8E8] rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E8F4FF] rounded-full transform -translate-x-1/2 translate-y-1/2" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-mybakup-blue flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Retour</span>
        </button>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-mybakup-blue"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Doctor info */}
      <div className="px-6 -mt-24 mb-6">
        <div className="flex flex-col items-center">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-2xl font-bold mt-4 text-mybakup-blue">{doctor.name}</h1>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-2">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">{doctor.distance}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleBookingClick}
            className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium"
          >
            Demander un rendez-vous
          </button>
          <button
            onClick={handlePhoneClick}
            className="w-full py-3 border border-gray-200 rounded-xl font-medium text-mybakup-blue bg-white"
          >
            {doctor.phone}
          </button>
        </div>
      </div>

      {/* Content sections */}
      <div className="px-6 space-y-6 pb-6">
        {/* Languages */}
        <section>
          <div className="flex items-center mb-4">
            <Globe2 className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Langues parlées</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang) => (
              <span key={lang} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* Consultation Fees */}
        <section>
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Tarifs</h3>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Consultation</span>
              <span className="font-medium text-mybakup-blue">€{doctor.consultationPrice}</span>
            </div>
            {doctor.medicalActs.map((act) => (
              <div key={act.name} className="flex justify-between items-center">
                <span className="text-gray-600">{act.name}</span>
                <span className="font-medium text-mybakup-blue">€{act.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section>
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Moyens de paiement</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.paymentMethods.map((method) => (
              <span key={method} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                {method}
              </span>
            ))}
          </div>
        </section>

        {/* Insurance */}
        <section>
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Assurances acceptées</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.insurance.map((ins) => (
              <span key={ins} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                {ins}
              </span>
            ))}
          </div>
        </section>

        {/* Office Pictures */}
        {doctor.officePictures && doctor.officePictures.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-mybakup-coral mr-2" />
                <h3 className="font-semibold text-mybakup-blue">Photos du cabinet</h3>
              </div>
              <div className="flex gap-1">
                {doctor.officePictures.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? 'bg-mybakup-coral' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div 
              className="relative bg-white rounded-xl overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={doctor.officePictures[currentImageIndex]}
                alt={`Cabinet de ${doctor.name}`}
                className="w-full h-48 object-cover"
              />
            </div>
          </section>
        )}

        {/* Opening Hours */}
        <section>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Horaires d'ouverture</h3>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-2">
            {doctor.openingHours.map(({ day, hours }) => (
              <div key={day} className="flex justify-between">
                <span className="text-gray-600">{day}</span>
                <span className="font-medium text-mybakup-blue">{hours}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center mb-4">
            <GraduationCap className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Formation</h3>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-2">
            {doctor.education.map((edu, index) => (
              <div key={index} className="text-gray-600">
                {edu}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center mb-4">
            <Stethoscope className="w-5 h-5 text-mybakup-coral mr-2" />
            <h3 className="font-semibold text-mybakup-blue">Expérience</h3>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-2">
            {doctor.experience.map((exp, index) => (
              <div key={index} className="text-gray-600">
                {exp}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Premium Modal */}
      <PremiumModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}