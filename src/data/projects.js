/**
 * The project catalogue - 12 projects, copied verbatim from the original
 * js/projects.js `projectsData` array.
 *
 * Fields:
 *   id              number   stable key for v-for
 *   name            string   card + modal title
 *   category        string   web | mobile | ai | security
 *   imageText       string   the big gradient label (BRIGHT, ORBIT, ...)
 *   image           string   project thumbnail used by project cards
 *   description     string   short line on the card
 *   longDescription string   the paragraph shown in the modal
 *   technologies    string[] 3-5 chips on the card
 *   client          string   shown in the modal
 *   year            number   used by the sort dropdown
 */
export const projects = [
  {
    id: 1,
    name: 'BrightCart Commerce Platform',
    category: 'web',
    imageText: 'BRIGHT',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85',
    description: 'A blazing-fast e-commerce platform rebuilt from a slow legacy monolith.',
    longDescription:
      "A showcase concept for modernizing an online store with a modular architecture, responsive product pages and streamlined catalog workflows.",
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Node.js', 'PostgreSQL'],
    client: 'BrightCart Inc.',
    year: 2025,
  },
  {
    id: 2,
    name: 'Finlytics Analytics Dashboard',
    category: 'web',
    imageText: 'FINLYTICS',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85',
    description: 'Real-time financial analytics that turned raw data into clear decisions.',
    longDescription:
      'A custom dashboard with live charts, role-based access and automated reports. Finlytics analysts now answer in minutes what used to take a full afternoon.',
    technologies: ['JavaScript', 'TypeScript', 'MongoDB', 'Docker'],
    client: 'Finlytics Ltd.',
    year: 2024,
  },
  {
    id: 3,
    name: 'MediTrust Patient Portal',
    category: 'web',
    imageText: 'MEDI',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85',
    description: 'A secure patient portal concept connecting clinics with their patients.',
    longDescription:
      'A patient-portal concept featuring appointment booking, records access and secure messaging, designed around clear and accessible workflows.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PostgreSQL', 'AWS'],
    client: 'MediTrust Health',
    year: 2024,
  },
  {
    id: 4,
    name: 'OrbitRide Ride-Hailing App',
    category: 'mobile',
    imageText: 'ORBIT',
    image: '/images/orbitride-cover.svg',
    description: 'A ride-hailing mobile app with live tracking and instant booking.',
    longDescription:
      'A ride-hailing app concept connecting drivers and riders through location sharing, in-app payments and dispatch workflows.',
    technologies: ['Kotlin', 'Firebase', 'Google Maps API'],
    client: 'OrbitRide',
    year: 2025,
  },
  {
    id: 5,
    name: 'FitPulse Fitness Tracker',
    category: 'mobile',
    imageText: 'FITPULSE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85',
    description: 'A health app that turns daily activity into motivating workout plans.',
    longDescription:
      'FitPulse syncs with wearables, generates adaptive training plans and keeps users accountable with streaks, goals and friendly in-app challenges.',
    technologies: ['Swift', 'HealthKit', 'Core ML'],
    client: 'FitPulse',
    year: 2024,
  },
  {
    id: 6,
    name: 'TravelBee Trip Planner',
    category: 'mobile',
    imageText: 'TRAVELBEE',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=85',
    description: 'A cross-platform trip planner with offline maps and smart itineraries.',
    longDescription:
      'One codebase, two stores. TravelBee helps travellers organise flights, hotels and day plans, then works offline anywhere in the world.',
    technologies: ['Flutter', 'REST APIs', 'Firebase'],
    client: 'TravelBee',
    year: 2023,
  },
  {
    id: 7,
    name: 'Sentra AI Support Assistant',
    category: 'ai',
    imageText: 'SENTRA',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85',
    description: 'An intelligent support assistant concept for routine customer requests.',
    longDescription:
      'A support-assistant concept for answering routine questions and routing requests that need a human response.',
    technologies: ['Python', 'TensorFlow', 'Node.js', 'Redis'],
    client: 'Sentra Corp',
    year: 2025,
  },
  {
    id: 8,
    name: 'VisionGuard Defect Detection',
    category: 'ai',
    imageText: 'VISION',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85',
    description: 'Computer vision that spots production defects in real time.',
    longDescription:
      'A camera-based machine-learning concept that reviews production images and flags possible defects for human review.',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Docker'],
    client: 'Duralight Manufacturing',
    year: 2024,
  },
  {
    id: 9,
    name: 'InsightIQ Sales Forecasting',
    category: 'ai',
    imageText: 'INSIGHT',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85',
    description: 'A forecasting engine concept for organizing sales projections.',
    longDescription:
      'A sales-forecasting concept that combines market signals and internal history to organize projections by region and channel.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'AWS'],
    client: 'InsightIQ',
    year: 2023,
  },
  {
    id: 10,
    name: 'SecureBank Fraud Shield',
    category: 'security',
    imageText: 'SECURE',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=85',
    description: 'A fraud-detection concept for reviewing banking transactions.',
    longDescription:
      'A fraud-detection concept using behavioural signals and anomaly review to help teams identify transactions for further investigation.',
    technologies: ['Python', 'AWS', 'Kubernetes'],
    client: 'SecureBank',
    year: 2025,
  },
  {
    id: 11,
    name: 'AuthShield Identity Platform',
    category: 'security',
    imageText: 'AUTH',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=85',
    description: 'A single sign-on and identity platform trusted by enterprise teams.',
    longDescription:
      'AuthShield delivers SSO, MFA and role-based access across every internal app, with zero-trust policies enforced everywhere by default.',
    technologies: ['JavaScript', 'Node.js', 'OAuth 2.0', 'PostgreSQL'],
    client: 'AuthShield',
    year: 2024,
  },
  {
    id: 12,
    name: 'CyberSentinel Threat Monitor',
    category: 'security',
    imageText: 'CYBER',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85',
    description: 'A security-monitoring concept for reviewing potential threats.',
    longDescription:
      'A security-monitoring concept that combines log sources, identifies patterns for review and alerts teams to investigate potential threats.',
    technologies: ['Python', 'Elastic Stack', 'Docker', 'Kubernetes'],
    client: 'Sentinel Systems',
    year: 2023,
  },
]

/** How many projects the homepage "Featured" section shows. */
export const FEATURED_LIMIT = 6

/**
 * The 5 category chips. Used by BOTH the homepage featured section and the
 * projects page - the original project duplicated this exact bar in index.html
 * and projects.html.
 */
export const projectFilters = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'ai', label: 'AI' },
  { value: 'security', label: 'Security' },
]

/** The 3 options in the projects page sort dropdown. */
export const projectSortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az', label: 'Name (A-Z)' },
]
