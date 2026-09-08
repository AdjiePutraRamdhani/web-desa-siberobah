export interface SejarahContent {
  title: string;
  subtitle: string;
  imageUrl: string;
  historyTitle: string;
  historyText1: string;
  historyText2: string;
  vision: string;
  missions: { num: string; title: string; desc: string }[];
  milestones: { year: string; title: string; desc: string }[];
}

export interface KependudukanContent {
  title: string;
  subtitle: string;
  totalPenduduk: number;
  totalKK: number;
  lakiLaki: number;
  perempuan: number;
  dusunList: { dusun: string; kk: string; jiwa: string }[];
  pekerjaanList: { label: string; count: string; percent: string }[];
  usiaList: { label: string; count: string; percent: string }[];
}

export interface KelembagaanItemContent {
  name: string;
  title: string;
  category: string;
  imageUrl?: string;
  description: string;
  membersList: { role: string; name: string }[];
}

export interface PadDesaContent {
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;
}

export interface PotensiDesaContent {
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export interface AllPageContents {
  sejarah: SejarahContent;
  kependudukan: KependudukanContent;
  kelembagaan: Record<string, KelembagaanItemContent>;
  padDesa: PadDesaContent;
  potensiDesa: PotensiDesaContent;
  home: HomeContent;
}

export const INITIAL_PAGE_CONTENTS: AllPageContents = {
  sejarah: {
    title: 'Sejarah Desa Siberobah',
    subtitle: 'Harmonisasi antara pelestarian warisan budaya lokal dan integrasi teknologi untuk kemajuan masyarakat yang berkelanjutan.',
    imageUrl: '/sejarah.jpg',
    historyTitle: 'Jejak Langkah & Asal Usul Siberobah',
    historyText1: 'Desa Siberobah bermula dari sebuah pemukiman agraris kecil yang kaya akan kearifan lokal. Nama "Siberobah" diambil dari filosofi kuno yang melambangkan kemampuan untuk beradaptasi dan berkembang seiring waktu tanpa melupakan akar tradisi.',
    historyText2: 'Kini, desa kami telah bertransformasi menjadi desa percontohan yang mengedepankan pelayanan digital berbasis komunitas, membuktikan bahwa kemajuan teknologi dapat berjalan beriringan dengan nilai-nilai kekeluargaan.',
    vision: 'Terwujudnya Desa Siberobah yang Mandiri, Sejahtera, Berbudaya, dan Terdepan dalam Inovasi Teknologi Berbasis Masyarakat pada tahun 2030.',
    missions: [
      { num: '01', title: 'Tata Kelola Digital', desc: 'Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan efisien melalui pemanfaatan teknologi informasi.' },
      { num: '02', title: 'Ekonomi Berkelanjutan', desc: 'Meningkatkan perekonomian masyarakat melalui pemberdayaan UMKM lokal dan optimalisasi BUMDes berbasis digital.' },
      { num: '03', title: 'Pelestarian Budaya', desc: 'Menjaga dan melestarikan adat istiadat serta seni budaya lokal sebagai identitas dan daya tarik desa.' },
      { num: '04', title: 'Infrastruktur Modern', desc: 'Membangun dan memelihara infrastruktur desa yang ramah lingkungan dan terintegrasi dengan sistem cerdas.' },
    ],
    milestones: [
      { year: 'Era Awal', title: 'Pemukiman Agraris', desc: 'Pembentukan kawasan perkampungan pertama oleh para tokoh adat dan pembukaan lahan pertanian.' },
      { year: 'Tahun 1980', title: 'Peresmian Administratif', desc: 'Resmi diakui secara administratif sebagai desa swatantra dengan susunan perangkat desa resmi.' },
      { year: 'Tahun 2010', title: 'Pembangunan Infrastruktur', desc: 'Peningkatan sarana jalan utama, Balai Desa, fasilitas Posyandu, dan pembentukan BUMDes.' },
      { year: 'Tahun 2024 - Sekarang', title: 'Inisiatif Siberobah Digital', desc: 'Peluncuran portal web layanan publik desa cerdas (Smart Village Initiative) dan transparansi informasi.' },
    ],
  },
  kependudukan: {
    title: 'Kependudukan Desa Siberobah',
    subtitle: 'Informasi transparan data jumlah penduduk, kepala keluarga, sebaran penduduk per dusun.',
    totalPenduduk: 500,
    totalKK: 150,
    lakiLaki: 262,
    perempuan: 238,
    dusunList: [
      { dusun: 'Dusun I', kk: '52 KK', jiwa: '175 Jiwa' },
      { dusun: 'Dusun II', kk: '55 KK', jiwa: '180 Jiwa' },
      { dusun: 'Dusun III', kk: '43 KK', jiwa: '145 Jiwa' },
    ],
    pekerjaanList: [
      { label: 'Petani & Perkebunan', percent: '55%', count: '275 Jiwa' },
      { label: 'Pelaku UMKM & Pedagang', percent: '20%', count: '100 Jiwa' },
      { label: 'Pegawai / Wiraswasta', percent: '15%', count: '75 Jiwa' },
      { label: 'Jasa & Lain-lain', percent: '10%', count: '50 Jiwa' },
    ],
    usiaList: [
      { label: 'Usia Anak (0 - 14 Tahun)', percent: '22%', count: '110 Jiwa' },
      { label: 'Usia Produktif (15 - 59 Tahun)', percent: '64%', count: '320 Jiwa' },
      { label: 'Usia Lansia (60+ Tahun)', percent: '14%', count: '70 Jiwa' },
    ],
  },
  kelembagaan: {
    pemerintah: {
      name: 'Pemerintah Desa Siberobah',
      title: 'Struktur Organisasi & Tata Kerja Pemerintah Desa',
      category: 'Lembaga Eksekutif Desa',
      description: 'Pemerintah Desa Siberobah bertugas mengkoordinasikan penyelenggaraan urusan pemerintahan desa, pelaksanaan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat desa.',
      membersList: [
        { role: 'Kepala Desa', name: 'H. Ahmad Syarifuddin, S.Sos' },
        { role: 'Sekretaris Desa', name: 'Rahmat Hidayat, S.IP' },
        { role: 'Kasi Pemerintahan', name: 'M. Iqbal, S.H.' },
        { role: 'Kasi Kesejahteraan', name: 'Dewi Rahmawati, S.Pd' },
        { role: 'Kaur Keuangan', name: 'Fitri Handayani, A.Md' },
        { role: 'Kaur Perencanaan', name: 'Andi Saputra, S.T.' },
        { role: 'Kepala Dusun I', name: 'Bambang Kusuma' },
        { role: 'Kepala Dusun II', name: 'Hasan Basri' },
        { role: 'Kepala Dusun III', name: 'Zulkifli' },
      ],
    },
    bpd: {
      name: 'BPD (Badan Permusyawaratan Desa)',
      title: 'Lembaga Musyawarah & Penyeimbang Penyelenggaraan Desa',
      category: 'Lembaga Musyawarah Desa',
      description: 'BPD Desa Siberobah merupakan lembaga yang membahas dan menyepakati Peraturan Desa bersama Kepala Desa, menampung serta menyalurkan aspirasi masyarakat desa.',
      membersList: [
        { role: 'Ketua BPD', name: 'Drs. H. M. Yasin' },
        { role: 'Wakil Ketua BPD', name: 'Suhardi, S.Pd' },
        { role: 'Sekretaris BPD', name: 'Nurul Huda, S.E.' },
        { role: 'Anggota BPD (Dusun I)', name: 'Eko Rahardjo' },
        { role: 'Anggota BPD (Dusun II)', name: 'Mariana, S.Ag' },
      ],
    },
    pkk: {
      name: 'PKK (Pemberdayaan Kesejahteraan Keluarga)',
      title: 'Tim Penggerak PKK Desa Siberobah',
      category: 'Lembaga Kemasyarakatan Desa',
      description: 'TP-PKK Desa Siberobah menggerakkan partisipasi wanita dan keluarga dalam meningkatkan kesejahteraan, kesehatan keluarga, pendidikan, serta ekonomi berbasis rumah tangga.',
      membersList: [
        { role: 'Ketua TP-PKK', name: 'Hj. Siti Aisyah Syarifuddin' },
        { role: 'Wakil Ketua PKK', name: 'Dra. Endang Sulastri' },
        { role: 'Sekretaris PKK', name: 'Rina Pertiwi, S.Tr.Keb' },
        { role: 'Bendahara PKK', name: 'Wulan Dari, A.Md' },
      ],
    },
    posyandu: {
      name: 'Posyandu (Balita & Lansia)',
      title: 'Pos Pelayanan Terpadu Kesehatan Masyarakat',
      category: 'Lembaga Pelayanan Kesehatan',
      description: 'Posyandu Desa Siberobah menyelenggarakan pelayanan kesehatan terpadu bulanan bagi balita, ibu hamil, serta kelompok lansia guna mewujudkan generasi sehat dan bebas stunting.',
      membersList: [
        { role: 'Koordinator Posyandu', name: 'Dr. Kartika Sari (Bidan Desa)' },
        { role: 'Kader Posyandu Balita I', name: 'Sri Wahyuni' },
        { role: 'Kader Posyandu Balita II', name: 'Ningsih' },
        { role: 'Kader Posyandu Lansia', name: 'Yuliana' },
      ],
    },
    bkm: {
      name: 'BKM (Badan Keswadayaan Masyarakat)',
      title: 'Pengelola Program Keswadayaan & Penataan Lingkungan',
      category: 'Lembaga Swadaya Masyarakat',
      description: 'BKM Siberobah bertindak sebagai wadah kepemimpinan kolektif warga untuk mengelola program swadaya, perbaikan permukiman, sarana air bersih, dan peningkatan kualitas lingkungan.',
      membersList: [
        { role: 'Koordinator BKM', name: 'Ir. H. Gunawan' },
        { role: 'Sekretaris BKM', name: 'Fajar Nugroho, S.T.' },
        { role: 'Bendahara BKM', name: 'Ratna Juwita' },
      ],
    },
    'karang-taruna': {
      name: 'Karang Taruna Siberobah',
      title: 'Wadah Pengembangan Generasi Muda Desa',
      category: 'Lembaga Kepemudaan Desa',
      description: 'Karang Taruna Siberobah wadah pembinaan pemuda-pemudi desa dalam bidang olahraga, seni budaya, kewirausahaan digital, sosial kebencanaan, dan kerja bakti rutin.',
      membersList: [
        { role: 'Ketua Karang Taruna', name: 'Aditya Ramadhan, S.Kom' },
        { role: 'Wakil Ketua', name: 'Bagas Prasetyo' },
        { role: 'Sekretaris', name: 'Maya Anggraini' },
        { role: 'Bendahara', name: 'Dimas Setiawan' },
      ],
    },
    lad: {
      name: 'LAD (Lembaga Adat Desa Siberobah)',
      title: 'Penjaga Tradisi, Adat Istiadat & Norma Sosial',
      category: 'Lembaga Adat & Budaya',
      description: 'LAD Siberobah menjaga nilai-nilai sejarah, mengayomi adat istiadat tempatan, serta menyelesaikan berbagai permasalahan norma kemasyarakatan sesuai kearifan lokal.',
      membersList: [
        { role: 'Ketua Lembaga Adat', name: 'Datuk H. Iskandar Muda' },
        { role: 'Sekretaris Adat', name: 'Datuak Zulkarnain' },
        { role: 'Anggota Pemangku Adat', name: 'Tokoh-tokoh Ulayat Siberobah' },
      ],
    },
  },
  padDesa: {
    title: 'PAD Desa Siberobah',
    subtitle: 'Laporan transparansi Pendapatan Asli Desa (PADes), hasil usaha BUMDes, pemanfaatan aset desa, dan akuntabilitas keuangan.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    content: 'Pendapatan Asli Desa (PADes) Siberobah bersumber dari hasil usaha BUMDes Siberobah Sejahtera, pengelolaan aset tanah kas desa, pasar perdesaan, serta partisipasi swadaya masyarakat. Pengelolaan anggaran dilaksanakan secara transparan dan akuntabel guna menunjang pembangunan infrastruktur perdesaan, pelayanan publik, dan kesejahteraan masyarakat.',
  },
  potensiDesa: {
    title: 'Potensi Desa Siberobah',
    subtitle: 'Menjelajahi keindahan wisata alam perdesaan, produk UMKM unggulan, sektor pertanian organik, dan kerajinan lokal.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
    content: 'Desa Siberobah memiliki berbagai potensi unggulan di bidang pertanian organik, perkebunan durian dan kopi, serta industri kreatif UMKM seperti kerajinan tangan bambu dan olahan pangan khas. Selain itu, panorama alam perbukitan dan sungai jernih menjadi daya tarik destinasi wisata alam serta kegiatan budaya yang terus dikembangkan oleh masyarakat desa.',
  },
  home: {
    heroTitle: 'Pemerintahan Desa Siberobah',
    heroSubtitle: 'Harmonisasi antara warisan budaya pedesaan dan inovasi teknologi digital untuk pelayanan masyarakat yang lebih baik, cepat, dan transparan.',
    heroImage: '/hero.jpg',
  },
};

const globalForPageContent = globalThis as unknown as { pageContentMemory: AllPageContents };

if (!globalForPageContent.pageContentMemory) {
  globalForPageContent.pageContentMemory = INITIAL_PAGE_CONTENTS;
}

export function getPageContentStore(): AllPageContents {
  return globalForPageContent.pageContentMemory;
}

export function updatePageContentStore<K extends keyof AllPageContents>(key: K, content: AllPageContents[K]): AllPageContents[K] {
  globalForPageContent.pageContentMemory[key] = content;
  return globalForPageContent.pageContentMemory[key];
}
