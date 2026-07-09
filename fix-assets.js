const fs = require('fs');
const path = require('path');

const files = [
  {
    path: 'app/page.tsx',
    replaces: [
      { from: 'src="/bg1.jpeg"', to: 'src={getAsset("/bg1.jpeg")}' },
      { from: 'import { HeroParticles } from "@/components/ui/HeroParticles";', to: 'import { HeroParticles } from "@/components/ui/HeroParticles";\nimport { getAsset } from "@/lib/asset";' }
    ]
  },
  {
    path: 'components/graduates/StoryCard.tsx',
    replaces: [
      { from: 'src="/logo.png"', to: 'src={getAsset("/logo.png")}' },
      { from: 'import Image from \'next/image\';', to: 'import Image from \'next/image\';\nimport { getAsset } from "@/lib/asset";' }
    ]
  },
  {
    path: 'components/layout/Navbar.tsx',
    replaces: [
      { from: 'src="/logo.png"', to: 'src={getAsset("/logo.png")}' },
      { from: 'import { Menu, X } from \'lucide-react\';', to: 'import { Menu, X } from \'lucide-react\';\nimport { getAsset } from "@/lib/asset";' }
    ]
  },
  {
    path: 'components/ui/WelcomePopup.tsx',
    replaces: [
      { from: 'src="/logo.png"', to: 'src={getAsset("/logo.png")}' },
      { from: 'import { X, Volume2, VolumeX, Sparkles } from \'lucide-react\';', to: 'import { X, Volume2, VolumeX, Sparkles } from \'lucide-react\';\nimport { getAsset } from "@/lib/asset";' }
    ]
  },
  {
    path: 'components/ui/AudioPlayer.tsx',
    replaces: [
      { from: 'src="/audio/bg-music.m4a"', to: 'src={getAsset("/audio/bg-music.m4a")}' },
      { from: 'import { Volume2, VolumeX } from \'lucide-react\';', to: 'import { Volume2, VolumeX } from \'lucide-react\';\nimport { getAsset } from "@/lib/asset";' }
    ]
  },
  {
    path: 'components/graduates/GraduateCard.tsx',
    replaces: [
      { from: 'src={participant.photo}', to: 'src={getAsset(participant.photo)}' },
      { from: 'import { motion } from \'framer-motion\';', to: 'import { motion } from \'framer-motion\';\nimport { getAsset } from "@/lib/asset";' }
    ]
  },
  {
    path: 'components/graduates/StoryCardModal.tsx',
    replaces: [
      { from: 'const imageUrl = `${baseUrl}${participant.photo}`;', to: 'const imageUrl = `${baseUrl}${getAsset(participant.photo)}`;' },
      { from: 'import { Download, Share2, Instagram, Linkedin, X, Quote } from \'lucide-react\';', to: 'import { Download, Share2, Instagram, Linkedin, X, Quote } from \'lucide-react\';\nimport { getAsset } from "@/lib/asset";' }
    ]
  }
];

files.forEach(f => {
  let content = fs.readFileSync(f.path, 'utf8');
  let changed = false;
  f.replaces.forEach(r => {
    if (content.includes(r.from)) {
      content = content.replace(r.from, r.to);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(f.path, content);
    console.log(`Updated ${f.path}`);
  }
});
