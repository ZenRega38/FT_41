const fs = require('fs');

const csv = fs.readFileSync('data/DAFTAR_NAMA_YUDISIUM_KE_41.csv', 'utf8');
const lines = csv.split('\n').map(l => l.trim()).filter(l => l);

const participants = [];
// Skip first 3 lines of header
// No. ;Nama;NPM ;Program Studi;Jenis Kelamin
for (let i = 3; i < lines.length; i++) {
  const line = lines[i];
  if (!line || line.startsWith(';')) continue;
  
  const [no, rawName, npm, rawProgram, gender] = line.split(';');
  
  if (!no || !rawName) continue;
  
  const name = rawName.trim();
  const program = rawProgram.trim();
  
  let programCode = 'TE';
  let programName = 'Teknik Elektro';
  
  if (program.includes('SIPIL')) {
    programCode = 'TS';
    programName = 'Teknik Sipil';
  } else if (program.includes('MESIN')) {
    programCode = 'TM';
    programName = 'Teknik Mesin';
  } else if (program.includes('KOMPUTER')) {
    programCode = 'TK';
    programName = 'Teknik Komputer';
  }
  
  let slug = name.toLowerCase()
    .replace(/,\s*s\.t\.?/, '') // remove title
    .replace(/[^a-z0-9]/g, '-') // replace non-alphanumeric with hyphen
    .replace(/-+/g, '-') // remove consecutive hyphens
    .replace(/^-|-$/g, ''); // trim hyphens
    
  participants.push({
    id: parseInt(no.trim()),
    slug,
    name: name,
    program: programName,
    programCode,
    photo: `/graduates/${slug}.webp`,
    photoAlt: `Foto formal ${name}`,
    displayConsent: true,
    nim: npm ? npm.trim() : undefined,
    gender: gender ? gender.trim() : undefined
  });
}

fs.writeFileSync('data/participants.json', JSON.stringify(participants, null, 2));
console.log(`Parsed ${participants.length} participants.`);
