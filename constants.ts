
import { Leader, NewsItem, Activity, VideoItem } from './types';

// Helper to get random image
const getAvatar = (id: string) => `https://picsum.photos/seed/${id}/400/400`;
const getEventImage = (id: string) => `https://picsum.photos/seed/karnataka${id}/600/400`;
const getNewsImage = (id: string) => `https://picsum.photos/seed/news${id}/800/400`;

export const LEADERS: Leader[] = [
  // State Team
  {
    id: 'sm_state_1',
    name: 'Chetan Gowda',
    designation: 'State SM Chair',
    state: 'Karnataka',
    image: getAvatar('sm_state_1'),
    age: 28,
    education: 'MBA Marketing, Bangalore University',
    startYear: 2019,
    bio: 'Chetan has spearheaded the digital transformation of IYC Karnataka. He specializes in political strategy and narrative building on social platforms.',
    email: 'chetan.gowda@iyckarnataka.in',
    phone: '+91 98765 43210',
    social: { twitter: '@chetan_iyc', facebook: 'chetangowda' },
    protests: [
      { title: 'PayCM Campaign', location: 'Bangalore', date: '2023-05-10', description: 'Led the digital aspect of the anti-corruption campaign across Karnataka.' }
    ],
    achievements: ['Increased Twitter reach by 300%', 'Organized 50+ Social Media Workshops']
  },
  {
    id: 'sm_state_2',
    name: 'Aishwarya Patil',
    designation: 'State SM Chair',
    state: 'Karnataka',
    image: getAvatar('sm_state_2'),
    age: 26,
    education: 'Mass Communication, Christ University',
    startYear: 2020,
    bio: 'Aishwarya manages content creation and video strategy for the state unit, ensuring the message reaches rural youth.',
    email: 'aishwarya.p@iyckarnataka.in',
    phone: '+91 91234 56789',
    social: { twitter: '@aishwarya_iyc', instagram: 'aish_official' },
    protests: [],
    achievements: ['Viral Reels Campaign 2024', 'Best Digital Coordinator Award']
  },

  // District Coordinators
  {
    id: 'sm_dist_1',
    name: 'Praveen Shetty',
    designation: 'District SM Coordinator',
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    image: getAvatar('sm_dist_1'),
    age: 24,
    education: 'B.E. Computer Science',
    startYear: 2021,
    bio: 'Handling social media operations in the coastal belt, focusing on youth engagement.',
    email: 'praveen.s@iyckarnataka.in',
    phone: '+91 88888 77777',
    social: { twitter: '@praveen_dk' },
    protests: [],
    achievements: ['Launched "Coastal Youth Voice" page']
  },
  {
    id: 'sm_dist_2',
    name: 'Rahul Kulkarni',
    designation: 'District SM Coordinator',
    state: 'Karnataka',
    district: 'Belagavi',
    image: getAvatar('sm_dist_2'),
    age: 25,
    education: 'B.Com',
    startYear: 2022,
    bio: 'Organizing digital warriors in Belagavi region to counter fake news.',
    email: 'rahul.k@iyckarnataka.in',
    phone: '+91 77777 66666',
    social: {},
    protests: [],
    achievements: ['Set up war rooms in 5 taluks']
  },
  {
    id: 'sm_dist_3',
    name: 'Syed Imran',
    designation: 'District SM Coordinator',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    image: getAvatar('sm_dist_3'),
    age: 23,
    education: 'BCA',
    startYear: 2023,
    bio: 'Coordinating city-wide digital protests and trend storms.',
    email: 'imran.s@iyckarnataka.in',
    phone: '+91 66666 55555',
    social: {},
    protests: [],
    achievements: ['Bangalore Traffic Awareness Campaign']
  },
  {
    id: 'sm_dist_4',
    name: 'Karthik Hegde',
    designation: 'District SM Coordinator',
    state: 'Karnataka',
    district: 'Uttara Kannada',
    image: getAvatar('sm_dist_4'),
    age: 22,
    education: 'BA Journalism',
    startYear: 2023,
    bio: 'Focusing on environmental issues and student rights in the district.',
    email: 'karthik.h@iyckarnataka.in',
    phone: '+91 55555 44444',
    social: {},
    protests: [],
    achievements: []
  },

  // Assembly Coordinators
  {
    id: 'sm_block_1',
    name: 'Vinay Kumar',
    designation: 'Assembly SM Coordinator',
    state: 'Karnataka',
    district: 'Mysore',
    block: 'Varuna',
    image: getAvatar('sm_block_1'),
    age: 21,
    education: 'B.Sc',
    startYear: 2024,
    bio: 'Active social media volunteer upgraded to Assembly coordinator.',
    email: 'vinay.k@iyckarnataka.in',
    phone: '+91 33333 22222',
    social: {},
    protests: [],
    achievements: ['WhatsApp group network of 5000 students']
  },
  {
    id: 'sm_block_2',
    name: 'Priya Reddy',
    designation: 'Assembly SM Coordinator',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    block: 'Jayanagar',
    image: getAvatar('sm_block_2'),
    age: 20,
    education: 'BBA',
    startYear: 2023,
    bio: 'Creating graphic content for local civic issues.',
    email: 'priya.r@iyckarnataka.in',
    phone: '+91 22222 11111',
    social: {},
    protests: [],
    achievements: []
  },
  {
    id: 'sm_block_3',
    name: 'Anand Joshi',
    designation: 'Assembly SM Coordinator',
    state: 'Karnataka',
    district: 'Dharwad',
    block: 'Hubli-Dharwad Central',
    image: getAvatar('sm_block_3'),
    age: 22,
    education: 'Diploma CS',
    startYear: 2024,
    bio: 'Video editor and local coordinator.',
    email: 'anand.j@iyckarnataka.in',
    phone: '+91 11111 00000',
    social: {},
    protests: [],
    achievements: []
  },
];

export const NEWS: NewsItem[] = [
  { 
    id: '1', 
    title: 'State Level SM Workshop in Bangalore', 
    date: 'March 20, 2025', 
    description: 'Over 500 digital warriors attended the "Truth Warriors" workshop at Palace Grounds.',
    image: getNewsImage('1'),
    source: 'Press Release',
    author: 'Media Cell',
    content: 'The Karnataka Youth Congress Social Media department successfully concluded its state-level workshop titled "Truth Warriors" at Palace Grounds, Bangalore. The event saw participation from over 500 delegates representing every district in the state. \n\nKey sessions included "Combating Fake News in Real-time", "Using AI for Content Creation", and "Voter Outreach via WhatsApp". The event was inaugurated by the State President, who emphasized the role of social media in modern democracy. "Our smartphones are our weapons in this fight for truth," he stated. \n\nThe workshop also launched a new mobile app for internal coordination among volunteers.'
  },
  { 
    id: '2', 
    title: '#SpeakUpForKarnataka Trends Nationally', 
    date: 'February 15, 2025', 
    description: 'Our digital campaign highlighting federal funding issues trended at #1 in India for 4 hours.',
    image: getNewsImage('2'),
    source: 'Twitter Analytics',
    author: 'Digital Desk',
    content: 'In a massive display of digital strength, the hashtag #SpeakUpForKarnataka trended at Number 1 across India on X (formerly Twitter) for over 4 hours yesterday. The campaign was organized to highlight the disparity in tax devolution and federal funding for Karnataka.\n\nThe IYC Karnataka Social Media wing released a series of infographics and explanatory videos at 10:00 AM. By 11:30 AM, the campaign had garnered over 250,000 posts. Prominent leaders and civil society members joined the movement, amplifying the voice of the state. This success demonstrates the growing organizational capability of our digital volunteers.'
  },
  { 
    id: '3', 
    title: 'Fact-Check Unit Launched', 
    date: 'January 10, 2025', 
    description: 'IYC Karnataka launches a dedicated team to debunk fake news and propaganda spreading on WhatsApp.',
    image: getNewsImage('3'),
    source: 'The Daily News',
    author: 'Staff Reporter',
    content: 'To tackle the menace of misinformation during the election cycle, the Indian Youth Congress (Karnataka) has officially launched a specialized "Fact-Check Unit". This 24/7 war room will monitor social media platforms for viral fake news and release verified counter-information immediately.\n\n"We have seen how edited videos and misleading images can disturb communal harmony," said the State SM Chair. "This unit consists of 20 researchers and video editors who will produce "Fact vs Fiction" cards." The unit has also released a WhatsApp helpline number where citizens can forward suspicious messages for verification.'
  },
];

export const ACTIVITIES: Activity[] = [
  { 
    id: '1', 
    title: 'Digital Membership Drive', 
    type: 'Campaign', 
    date: '2024-11-01', 
    description: 'Onboarded 1 Lakh new members through our missed-call and QR code campaign.', 
    image: getEventImage('1'),
    location: 'Statewide (All 31 Districts)',
    fullDescription: 'The Digital Membership Drive was a landmark initiative to democratize the membership process of IYC Karnataka. By leveraging QR code technology and a dedicated missed-call service, we successfully reached college students in remote areas who previously found it difficult to join. The campaign included booth-level activation where SM coordinators set up help desks outside major colleges.',
    stats: [
      { label: 'New Members', value: '1,00,000+' },
      { label: 'Colleges Covered', value: '450+' },
      { label: 'Duration', value: '30 Days' }
    ]
  },
  { 
    id: '2', 
    title: 'Reels Making Workshop', 
    type: 'Workshop', 
    date: '2024-09-15', 
    description: 'Training volunteers on creating impactful short-form video content for political awareness.', 
    image: getEventImage('2'),
    location: 'Town Hall, Bangalore',
    fullDescription: 'Recognizing the power of short-form content, this workshop invited expert influencers and political consultants to train our district coordinators. The session covered mobile video editing, scriptwriting for 60-second formats, and understanding the Instagram algorithm to maximize reach for political messaging.',
    stats: [
      { label: 'Attendees', value: '350' },
      { label: 'Reels Created', value: '1,200+' },
      { label: 'Total Views', value: '5 Million+' }
    ]
  },
  { 
    id: '3', 
    title: 'Yuva Dwani - Podcast', 
    type: 'Campaign', 
    date: '2024-08-12', 
    description: 'Launched a weekly podcast series interviewing young achievers and leaders from Karnataka.', 
    image: getEventImage('3'),
    location: 'Digital Platforms (YouTube/Spotify)',
    fullDescription: 'Yuva Dwani ("Voice of Youth") is Karnataka IYC\'s first official podcast. The aim is to move beyond 30-second clips and have deep, meaningful conversations about unemployment, education policy, and cultural identity. Hosted by state spokespersons, it features guests ranging from young entrepreneurs to student activists.',
    stats: [
      { label: 'Episodes', value: '12' },
      { label: 'Avg Listen time', value: '25 mins' },
      { label: 'Subscribers', value: '15k' }
    ]
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Mega Youth Rally - Freedom March',
    videoId: 'LXb3EKWsInQ', // Placeholder ID (4K Nature usually, using as placeholder frame)
    date: 'April 10, 2025'
  },
  {
    id: '2',
    title: 'Press Conference: Budget Analysis',
    videoId: 'ScMzIvxBSi4', // Placeholder ID
    date: 'March 05, 2025'
  },
  {
    id: '3',
    title: 'Social Media War Room Tour',
    videoId: 'aqz-KE-bpKQ', // Placeholder ID
    date: 'Feb 20, 2025'
  }
];
