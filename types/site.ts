export type ProgramCode = 'TE' | 'TM' | 'TS' | 'TK';

export type ProgramName =
  | 'Teknik Elektro'
  | 'Teknik Mesin'
  | 'Teknik Sipil'
  | 'Teknik Komputer';

export interface Participant {
  id: number | string;
  slug: string;
  name: string;
  program: ProgramName;
  programCode: ProgramCode;
  photo: string;
  photoAlt: string;
  displayConsent: boolean;
  nim?: string;
  gender?: string;
  gpa?: string;
  predicate?: string;
  thesisTitle?: string;
  advisor?: string;
  quote?: string;
  awardTags?: string[];
  banner?: string;
  bio?: string;
  email?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  organizations?: Array<{ name: string; role: string; period: string }>;
  internships?: Array<{ company: string; role: string; period: string }>;
  projects?: Array<{ title: string; desc: string }>;
  scholarships?: string[];
  awards?: string[];
  publications?: Array<{ title: string; url: string }>;
  job?: { company: string; role: string; date: string } | null;
}

export interface Program {
  code: ProgramCode;
  name: ProgramName;
  shortName: string;
  description: string;
  icon: 'circuit' | 'gear' | 'bridge' | 'chip';
}

export interface Message {
  id: number | string;
  author: string;
  role: string;
  body: string;
  photo?: string;
  isOfficial: boolean;
}

export interface GalleryItem {
  id: number | string;
  src: string;
  alt: string;
  caption?: string;
  category: 'prosesi' | 'pimpinan' | 'lulusan' | 'keluarga' | 'behind-the-scene';
}
