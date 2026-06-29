import Papa from 'papaparse';

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1lSZmNE-9Sfa8j7SbEwD2jti2Zgpl0zUdopPqIYkIIrw/export?format=csv";

export interface StudentSheetData {
  npm: string;
  bio?: string;
  linkedin?: string;
  instagram?: string;
  organizations: Array<{ name: string; role: string; period: string }>;
  internships: Array<{ company: string; role: string; period: string }>;
  projects: Array<{ title: string; desc: string }>;
  scholarships: string[];
  awards: string[];
  publications: string[];
  job: { company: string; role: string; date: string } | null;
}

export async function fetchStudentDetails(nim: string): Promise<StudentSheetData | null> {
  if (!nim) return null;

  const isValidValue = (val?: string) => {
    if (!val) return false;
    const trimmed = val.trim();
    if (trimmed === "" || trimmed === "-" || trimmed.toLowerCase() === "n/a") return false;
    return true;
  };

  try {
    const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch sheet");
    
    const csvText = await res.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data as Record<string, string>[];
          const studentRow = rows.find(r => r["NPM"]?.trim() === nim.trim());
          
          if (!studentRow) {
            resolve(null);
            return;
          }

          // Parse Organizations
          const organizations = [];
          if (isValidValue(studentRow["Nama Organisasi"])) {
            organizations.push({
              name: studentRow["Nama Organisasi"].trim(),
              role: studentRow["Jabatan / Posisi "]?.trim() || "",
              period: studentRow["Masa Jabatan (Periode)"]?.trim() || ""
            });
          }
          if (isValidValue(studentRow["Nama Organisasi 2"])) {
            organizations.push({
              name: studentRow["Nama Organisasi 2"].trim(),
              role: studentRow["Jabatan / Posisi _1"]?.trim() || studentRow["Jabatan / Posisi "]?.trim() || "", // papaparse might add _1 for dup headers
              period: studentRow["Masa Jabatan (Periode)_1"]?.trim() || studentRow["Masa Jabatan (Periode)"]?.trim() || ""
            });
          }

          // Parse Internships
          const internships = [];
          if (isValidValue(studentRow["Tempat Magang"])) {
            internships.push({
              company: studentRow["Tempat Magang"].trim(),
              role: studentRow["Posisi "]?.trim() || "",
              period: studentRow["Masa Jabatan (Periode)_2"]?.trim() || studentRow["Masa Jabatan (Periode)"]?.trim() || ""
            });
          }
          if (isValidValue(studentRow["Tempat Magang 2"])) {
            internships.push({
              company: studentRow["Tempat Magang 2"].trim(),
              role: studentRow["Posisi di Tempat Magang 2"]?.trim() || "",
              period: studentRow["Masa Jabatan (Periode) Magang 2"]?.trim() || ""
            });
          }

          // Parse Scholarships
          const scholarships = [];
          if (isValidValue(studentRow["Nama Beasiswa"])) {
            scholarships.push(`${studentRow["Nama Beasiswa"].trim()} (${studentRow["Periode Beasiswa"]?.trim() || ''})`);
          }
          if (isValidValue(studentRow["Nama Beasiswa 2 "])) {
            scholarships.push(`${studentRow["Nama Beasiswa 2 "].trim()} (${studentRow["Periode Beasiswa 2"]?.trim() || ''})`);
          }

          // Parse Awards (Lomba)
          const awards = [];
          if (isValidValue(studentRow["Judul Lomba"])) {
            const juara = studentRow["Juara"]?.trim() || "";
            const tingkat = studentRow["Tingkat Kejuaraan"]?.trim() || "";
            awards.push(`${juara} - ${studentRow["Judul Lomba"].trim()} (${tingkat})`);
          }
          if (isValidValue(studentRow["Judul Lomba 2"])) {
            const juara2 = studentRow["Juara Lomba 2"]?.trim() || "";
            const tingkat2 = studentRow["Tingkat Kejuaraan Lomba 2"]?.trim() || "";
            awards.push(`${juara2} - ${studentRow["Judul Lomba 2"].trim()} (${tingkat2})`);
          }

          // Parse Projects (Skripsi)
          const projects = [];
          if (isValidValue(studentRow["Judul Tugas Skripsi"])) {
            projects.push({
              title: studentRow["Judul Tugas Skripsi"].trim(),
              desc: studentRow["Deskripsi Singkat Skripsi"]?.trim() || ""
            });
          }

          // Parse Publications
          const publications = [];
          if (isValidValue(studentRow["Link Publikasi Skripsi"])) publications.push(studentRow["Link Publikasi Skripsi"].trim());
          if (isValidValue(studentRow["Link Publikasi"])) publications.push(studentRow["Link Publikasi"].trim());
          if (isValidValue(studentRow["Link Publikasi 2"])) publications.push(studentRow["Link Publikasi 2"].trim());
          if (isValidValue(studentRow["Link Publikasi 3"])) publications.push(studentRow["Link Publikasi 3"].trim());

          // Parse Job
          let job = null;
          if (isValidValue(studentRow["Tempat Bekerja"])) {
            job = {
              company: studentRow["Tempat Bekerja"].trim(),
              role: studentRow["Posisi / Jabatan"]?.trim() || "",
              date: studentRow["Tanggal Diterima Kerja"]?.trim() || ""
            };
          }

          const data: StudentSheetData = {
            npm: studentRow["NPM"].trim(),
            bio: isValidValue(studentRow["Riwayat Hidup"]) ? studentRow["Riwayat Hidup"].trim() : undefined,
            linkedin: isValidValue(studentRow["Link Profil LinkedIn"]) ? studentRow["Link Profil LinkedIn"].trim() : undefined,
            instagram: isValidValue(studentRow["Link Profil Instagram"]) ? studentRow["Link Profil Instagram"].trim() : undefined,
            organizations,
            internships,
            scholarships,
            awards,
            projects,
            publications,
            job,
          };
          
          resolve(data);
        },
        error: (err: any) => {
          console.error("PapaParse error:", err);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error("Fetch sheet error:", error);
    return null;
  }
}
