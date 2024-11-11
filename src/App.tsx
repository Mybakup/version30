import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DoctorSearch from './pages/DoctorSearch';
import VoiceCommand from './pages/VoiceCommand';
import AppointmentScheduling from './pages/AppointmentScheduling';
import Appointments from './pages/Appointments';
import AppointmentDetails from './components/AppointmentDetails';
import Profile from './pages/Profile';

export default function App() {
  return (
    <div className="h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<DoctorSearch />} />
        <Route path="/voice-command" element={<VoiceCommand />} />
        <Route path="/appointment" element={<AppointmentScheduling />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route 
          path="/appointments/:id" 
          element={<AppointmentDetails appointment={
            {
              id: '1',
              date: '2 juin 2023',
              time: '09:30',
              doctor: {
                name: 'Dr Virginie USOLINI',
                specialty: 'Laboratoire',
                imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
              },
              patient: {
                name: 'Julien Bakala',
                gender: 'Homme',
                age: 38,
                phone: '+33650439664'
              },
              location: {
                type: 'Cabinet',
                address: 'Sydney, New South Wales',
                city: 'Sydney',
                country: 'AUS',
                phone: '+33675990550'
              },
              price: 40.00
            }
          } />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}