import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Pill, 
  Video, 
  Mic, 
  FileText,
  MapPin,
  Briefcase,
  Bot,
  Calendar,
  UserCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import QuickSignupModal from '../components/QuickSignupModal';
import SocialLinks from '../components/SocialLinks';
import { useAuth } from '../contexts/AuthContext';

const slides = [
  {
    id: 1,
    title: "Voyagez l'esprit tranquille",
    description: "Des solutions adaptées pour votre santé à l'étranger",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Sérénité"
  },
  {
    id: 2,
    title: "Votre bien-être avant tout",
    description: "Accédez aux meilleurs soins où que vous soyez",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Bien-être"
  },
  {
    id: 3,
    title: "Une santé sans frontières",
    description: "Restez en bonne santé pendant vos voyages",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Santé"
  }
];

const mainActions = [
  {
    icon: MapPin,
    title: 'Voir les praticiens',
    description: 'Trouvez un médecin près de chez vous',
    path: '/search',
    color: 'bg-red-50',
    textColor: 'text-mybakup-coral'
  },
  {
    icon: Calendar,
    title: 'Mes rendez-vous',
    description: 'Consultez et gérez vos rendez-vous',
    path: '/appointments',
    color: 'bg-blue-50',
    textColor: 'text-blue-500'
  }
];

const services = [
  {
    icon: Video,
    title: 'Téléconsultation',
    description: 'Consultez un médecin en ligne',
    path: '/teleconsult',
    color: 'bg-green-50',
    textColor: 'text-green-500'
  },
  {
    icon: Mic,
    title: 'Commande vocale',
    description: 'Utilisez votre voix pour naviguer',
    path: '/voice-command',
    color: 'bg-purple-50',
    textColor: 'text-purple-500'
  },
  {
    icon: Pill,
    title: 'Traducteur de médicaments',
    description: 'Trouvez les équivalents de vos médicaments',
    path: '/translator',
    color: 'bg-blue-50',
    textColor: 'text-blue-500'
  },
  {
    icon: FileText,
    title: 'Fiche pratique',
    description: 'Informations par destination',
    path: '/guides',
    color: 'bg-yellow-50',
    textColor: 'text-yellow-600'
  },
  {
    icon: Briefcase,
    title: 'Préparer mon voyage',
    description: 'Trousse à pharmacie personnalisée',
    path: '/travel-prep',
    color: 'bg-orange-50',
    textColor: 'text-orange-500'
  },
  {
    icon: Bot,
    title: 'Assistant médical',
    description: 'Votre aide personnelle',
    path: '/assistant',
    color: 'bg-indigo-50',
    textColor: 'text-indigo-500'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleActionClick = (path: string) => {
    if (!isAuthenticated) {
      setShowSignupModal(true);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-[#EDF5FF]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img 
            src="https://i.imgur.com/jxMQcJi.png" 
            alt="MyBakup" 
            className="h-8"
          />
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <UserCircle className="w-6 h-6 text-mybakup-blue" />
          </button>
        </div>
      </header>

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mb-8">
            <SocialLinks />
          </section>

          {/* Featured Articles Slider */}
          <section className="mb-8 relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`flex-shrink-0 w-[500px] rounded-2xl overflow-hidden transition-transform duration-500 relative group cursor-pointer`}
                >
                  <div className="relative h-[200px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <span className="inline-block px-3 py-1 bg-mybakup-coral text-white text-sm rounded-full mb-2">
                        {slide.tag}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg z-20 transition-transform group-hover:translate-x-0 translate-x-[-100%]"
            >
              <ChevronLeft className="w-5 h-5 text-mybakup-blue" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg z-20 transition-transform group-hover:translate-x-0 translate-x-[100%]"
            >
              <ChevronRight className="w-5 h-5 text-mybakup-blue" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-mybakup-coral w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </section>

          {/* Main Actions */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {mainActions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleActionClick(action.path)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group"
              >
                <div className={`p-3 rounded-xl ${action.color} mb-3`}>
                  <action.icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <h3 className="font-semibold text-mybakup-blue mb-1">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            ))}
          </section>

          {/* Services Slider */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-mybakup-blue mb-4">Mes services</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleActionClick(service.path)}
                  className="flex-shrink-0 w-[280px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group"
                >
                  <div className={`p-3 rounded-xl ${service.color} mb-3`}>
                    <service.icon className={`w-6 h-6 ${service.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-mybakup-blue mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <QuickSignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
}