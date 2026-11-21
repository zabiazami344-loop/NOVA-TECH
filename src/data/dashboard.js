/**
 * Static seed data + UI metadata for the admin dashboard.
 *
 * Everything here was a `const` at the top of the original dashboard.js. Keeping
 * it in one module means the panels stay purely presentational.
 *
 * Dashboard icon fields are semantic identifiers rendered by DashboardIcon,
 * rather than emoji or HTML-entity strings.
 */

/** Where the managed project list is persisted. */
export const PROJECTS_KEY = 'novatech_dashboard_projects'
/** Where the Settings panel saves the display name. */
export const DISPLAY_NAME_KEY = 'novatech_display_name'
/** Written by the contact form, read by the Overview + Messages panels. */
export const CONTACT_MESSAGES_KEY = 'novatech_contact_messages'

/** The project-management list starts with these six rows. */
export const initialProjects = [
  { id: 1, name: 'BrightCart Commerce Platform', category: 'web', client: 'BrightCart Inc.', year: 2025, status: 'done' },
  { id: 2, name: 'Sentra AI Support Assistant', category: 'ai', client: 'Sentra Corp', year: 2025, status: 'active' },
  { id: 3, name: 'OrbitRide Ride-Hailing App', category: 'mobile', client: 'OrbitRide', year: 2025, status: 'active' },
  { id: 4, name: 'SecureBank Fraud Shield', category: 'security', client: 'SecureBank', year: 2025, status: 'done' },
  { id: 5, name: 'MediTrust Patient Portal', category: 'web', client: 'MediTrust Health', year: 2024, status: 'done' },
  { id: 6, name: 'FitPulse Fitness Tracker', category: 'mobile', client: 'FitPulse', year: 2024, status: 'pending' },
]

/**
 * Dashboard cards use actual records and are explicit about seed datasets.
 */
export const overviewCards = [
  { id: 'projects', label: 'Projects', source: 'projectCount', note: 'Includes demo seed entries', icon: 'projects' },
  { id: 'services', label: 'Services', source: 'serviceCount', note: 'Service catalogue', icon: 'services' },
  { id: 'messages', label: 'Messages', source: 'messageCount', note: 'Contact submissions', icon: 'messages' },
  { id: 'team', label: 'Team', source: 'teamCount', note: 'Sample directory', icon: 'team' },
  { id: 'users', label: 'Users', source: 'userCount', note: 'Sample accounts', icon: 'users' },
  { id: 'intents', label: 'Intents', source: 'intentCount', note: 'Sample configuration', icon: 'intents' },
]

/** The Users panel table (demo data - not the real login accounts). */
export const sampleUsers = [
  { name: 'Admin', email: 'admin@novatech.com', role: 'Administrator', status: 'active' },
  { name: 'Jane Cooper', email: 'jane@novatech.com', role: 'Project Manager', status: 'active' },
  { name: 'Ethan Brooks', email: 'ethan@novatech.com', role: 'Frontend Developer', status: 'active' },
  { name: 'Noah Kim', email: 'noah@novatech.com', role: 'Security Engineer', status: 'active' },
  { name: 'Priya Sharma', email: 'priya@novatech.com', role: 'UI/UX Designer', status: 'invited' },
]

/** The Team panel. `initials` are the avatar, as in the original. */
export const teamMembers = [
  { name: 'Michael Carter', role: 'CEO & Co-Founder', initials: 'MC' },
  { name: 'Amira Hassan', role: 'Chief Technology Officer', initials: 'AH' },
  { name: 'Ethan Brooks', role: 'Senior Frontend Developer', initials: 'EB' },
  { name: 'Olivia Nguyen', role: 'Senior Backend Developer', initials: 'ON' },
  { name: 'Priya Sharma', role: 'UI/UX Designer', initials: 'PS' },
  { name: 'Noah Kim', role: 'Cyber Security Engineer', initials: 'NK' },
  { name: 'David Osei', role: 'AI / ML Engineer', initials: 'DO' },
]

/** Chatbot intents. These are sample UI records, not connected to a live bot. */
export const intents = [
  { icon: 'greeting',
    name: 'Greeting',
    desc: 'Welcomes visitors and offers help.',
    status: 'active' },
  { icon: 'pricing',
    name: 'Pricing',
    desc: 'Answers pricing and package questions.',
    status: 'active' },
  { icon: 'refund',
    name: 'Request Refund',
    desc: 'Handles refund policy enquiries.',
    status: 'training' },
  { icon: 'booking',
    name: 'Book a Demo',
    desc: 'Schedules product demo calls.',
    status: 'active' },
  { icon: 'support',
    name: 'Tech Support',
    desc: 'Escalates issues to human agents.',
    status: 'active' },
  { icon: 'service',
    name: 'Our Services',
    desc: 'Describes NOVA TECH service lines.',
    status: 'training' },
]

/** The three <select> options of the add-project form, plus the status filter. */
export const projectCategories = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'ai', label: 'AI' },
  { value: 'security', label: 'Security' },
]

/** The status <select> options, in the original's order. */
export const projectStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
  { value: 'pending', label: 'Pending' },
]

/**
 * The sidebar, as title/link groups. `id` doubles as the panel key, the topbar
 * title lookup and the component name, so the three can never get out of sync.
 *
 * The Account group holds the logout button, flagged with `logout: true` - it is
 * an action rather than a panel, but keeping it in the same list means the
 * markup is a single nested v-for.
 */
export const sidebarGroups = [
  {
    title: 'Menu',
    links: [
      { id: 'overview', label: 'Dashboard' },
      { id: 'projects', label: 'Projects' },
      { id: 'services', label: 'Services' },
      { id: 'team', label: 'Team' },
      { id: 'intents', label: 'Intents' },
      { id: 'messages', label: 'Messages' },
      { id: 'users', label: 'Users' },
      { id: 'settings', label: 'Settings' },
    ],
  },
  {
    title: 'Account',
    links: [
      { id: 'logout', label: 'Logout', logout: true },
    ],
  },
]

/** Maps a panel id to the heading shown in the topbar (panelTitles in the original). */
export const panelTitles = {
  overview: 'Dashboard',
  projects: 'Projects',
  services: 'Services',
  team: 'Team',
  intents: 'Intents',
  messages: 'Messages',
  users: 'Users',
  settings: 'Settings',
}
