
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Volledige woningrenovatie',
    location: 'Amsterdam',
    category: 'Renovatie',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'Buitenschilderwerk villa',
    location: 'Utrecht',
    category: 'Schilderwerk',
    imageUrl: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    title: 'Dakrenovatie jaren '30 woning',
    location: 'Rotterdam',
    category: 'Dakrenovatie',
    imageUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80',
  },
];

const ProjectsPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="section-title mb-4">Recente Projecten</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Bekijk enkele van onze recente renovatie- en verbouwprojecten. 
              Laat u inspireren door onze werkzaamheden en de transformaties die we hebben gerealiseerd.
            </p>
          </div>
          <Link 
            to="/projecten" 
            className="mt-6 md:mt-0 text-brand-orange font-medium inline-flex items-center hover:underline"
          >
            Alle Projecten Bekijken
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              to={`/projecten/${project.id}`}
              key={project.id}
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={hoveredIndex === index ? project.beforeImageUrl : project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                  <p className="text-sm font-semibold inline-block bg-brand-orange px-2 py-1 rounded mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm">{project.location}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/80 text-brand-blue text-xs font-bold px-2 py-1 rounded">
                  {hoveredIndex === index ? 'Voor' : 'Na'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
