import { Experience, Education, Skill } from '../types';

export const experiences: Experience[] = [
  {
    id: 'himasira-head',
    title: 'Head of Internal Department',
    company: 'HIMASIRA UI',
    location: 'Jakarta, Indonesia',
    startDate: '2025-02',
    endDate: 'Present',
    current: true,
    description: 'Leading the Internal Department, ensuring smooth operations and alignment within the team.',
    responsibilities: [
      'Led the Internal Department, ensuring smooth operations and alignment within the team',
      'Acted as the main point of contact for resolving issues, allowing the team to focus on their work',
      'Designed and executed programs to enhance internal members\' skills, including workshops, team-building, and leadership development',
    ],
    achievements: [
      'Successfully implemented comprehensive skill development programs',
      'Enhanced team productivity through effective conflict resolution',
      'Developed strategic initiatives for department growth',
    ],
  },
  {
    id: 'himasira-staff',
    title: 'Internal Department Staff',
    company: 'HIMASIRA UI',
    location: 'Jakarta, Indonesia',
    startDate: '2024-02',
    endDate: '2025-02',
    current: false,
    description: 'Managed key programs within the Internal Department focusing on member development.',
    responsibilities: [
      'Managed 3 main programs: AktuariA+ (evaluation reports), COMVIS 2024 (Company Visit), and MAMEN 2024 (Masa Mentoring)',
      'Designed and managed programs to help the human resources team improve their soft and hard skills',
      'Spread the word about department events and resources on social media',
    ],
  },
  {
    id: 'osis-president',
    title: 'President of OSIS (Student Council)',
    company: 'SMK Islam PB Soedirman 2 Jakarta',
    location: 'Jakarta, Indonesia',
    startDate: '2021-10',
    endDate: '2022-10',
    current: false,
    description: 'Led and supervised the OSIS team, providing direction and ensuring smooth execution of school programs.',
    responsibilities: [
      'Led and supervised the OSIS team, providing direction and ensuring smooth execution of school programs',
      'Planned and organized various events including school festivals, social activities, and educational programs',
      'Worked with school administration, teachers, and students to plan activities aligned with school vision',
    ],
    achievements: [
      'Successfully increased student participation in school activities',
      'Implemented positive school environment initiatives',
      'Developed student-led programs that enhanced school culture',
    ],
  },
  {
    id: 'mabes-tni',
    title: 'Administration Staff',
    company: 'Mabes TNI',
    location: 'East Jakarta, Indonesia',
    startDate: '2022-03',
    endDate: '2022-06',
    current: false,
    description: 'Assisted in daily administrative tasks within the Finance Center.',
    responsibilities: [
      'Assisted in daily administrative tasks within the Finance Center, ensuring smooth operations',
      'Supported preparation and organization of financial reports, data entry, and updating records',
      'Coordinated internal communication, ensuring relevant financial information was distributed accurately',
    ],
  },
];

export const education: Education[] = [
  {
    id: 'ui-actuarial',
    institution: 'University of Indonesia',
    degree: 'Bachelor\'s Degree',
    field: 'Actuarial Science',
    startDate: '2023-08',
    endDate: '2026-08',
    current: true,
    activities: [
      'Head of Internal Department at HIMASIRA UI',
      'Active member of actuarial study groups',
      'Participant in insurance industry seminars',
    ],
  },
  {
    id: 'smk-accounting',
    institution: 'Pb. Soedirman 2 Vocational High School',
    degree: 'Vocational Diploma',
    field: 'Accounting',
    startDate: '2020-06',
    endDate: '2023-06',
    current: false,
    activities: [
      'President of OSIS (Student Council)',
      'Member of accounting club',
      'Participant in national accounting competitions',
    ],
  },
];

export const skills: Skill[] = [
  // Technical Skills
  {
    id: 'accounting',
    name: 'Journal Entries (Accounting)',
    category: 'technical',
    level: 'advanced',
    percentage: 85,
  },
  {
    id: 'ms-word',
    name: 'Microsoft Word',
    category: 'technical',
    level: 'expert',
    percentage: 90,
  },
  {
    id: 'ms-powerpoint',
    name: 'Microsoft PowerPoint',
    category: 'technical',
    level: 'expert',
    percentage: 90,
  },
  {
    id: 'ms-excel',
    name: 'Microsoft Excel',
    category: 'technical',
    level: 'advanced',
    percentage: 80,
  },
  {
    id: 'accurate',
    name: 'Accounting Computer (Accurate)',
    category: 'technical',
    level: 'advanced',
    percentage: 85,
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'technical',
    level: 'intermediate',
    percentage: 70,
  },
  // Soft Skills
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'soft',
    level: 'advanced',
    percentage: 85,
  },
  {
    id: 'communication',
    name: 'Communication',
    category: 'soft',
    level: 'advanced',
    percentage: 85,
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    category: 'soft',
    level: 'expert',
    percentage: 90,
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'soft',
    level: 'advanced',
    percentage: 80,
  },
  // Languages
  {
    id: 'indonesian',
    name: 'Indonesian',
    category: 'language',
    level: 'expert',
    percentage: 100,
  },
  {
    id: 'english',
    name: 'English',
    category: 'language',
    level: 'intermediate',
    percentage: 70,
  },
];

export const certifications = [
  'Accounting Computer (Accurate)',
  'Digital Marketing',
  'KKNI Level II For Accounting and Financial Institution',
  'Microsoft Office Certified',
];

export const contactInfo = {
  email: 'indah300604@gmail.com',
  phone: '+62 812-8200-3199',
  linkedin: 'https://www.linkedin.com/in/indah-dwiafifah',
  location: 'Jakarta Metropolitan Area, Indonesia',
};