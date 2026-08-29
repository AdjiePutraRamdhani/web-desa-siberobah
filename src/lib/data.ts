export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  snippet: string;
  category: string;
  imageUrl: string;
  author: string;
  views: number;
  date: string;
}

export interface TourismItem {
  id: string;
  name: string;
  type: 'Wisata' | 'UMKM';
  category: string;
  description: string;
  location: string;
  contact?: string;
  priceRange?: string;
  imageUrl: string;
  rating: number;
}

export interface PublicServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  processingTime: string;
  cost: string;
  icon: string;
  formUrl?: string;
}

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Peluncuran Program Siberobah Digital Village 2024',
    slug: 'peluncuran-program-siberobah-digital-village-2024',
    snippet: 'Pemerintah Desa Siberobah meresmikan infrastruktur wifi publik dan portal layanan mandiri warga berbasis web.',
    content: `Pemerintah Desa Siberobah meresmikan infrastruktur wifi publik dan portal layanan mandiri warga berbasis web pada hari Senin kemarin. Program ini bertujuan untuk mempermudah akses informasi, pengurusan administrasi kependudukan, serta promosi produk UMKM desa.

Bapak Kepala Desa menegaskan bahwa digitalisasi desa bukan hanya tentang teknologi modern, melainkan komitmen untuk meningkatkan kualitas hidup warga serta mendorong transparansi tata kelola pemerintahan desa.

Layanan digital ini mencakup surat keterangan online, direktori UMKM desa, informasi objek wisata, serta kanal aduan warga secara langsung.`,
    category: 'Berita',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac',
    author: 'Tim Komunikasi Desa',
    views: 342,
    date: '2024-08-01',
  },
  {
    id: '2',
    title: 'Pelatihan Pemasaran Digital bagi Pelaku UMKM Siberobah',
    slug: 'pelatihan-pemasaran-digital-umkm-siberobah',
    snippet: 'Puluhan pelaku usaha mikro desa Siberobah ikuti workshop branding, fotografi produk, dan strategi berjualan marketplace.',
    content: `Sebanyak 45 pelaku UMKM di Desa Siberobah antusias mengikuti pelatihan pemasaran digital yang digelar oleh BUMDes Siberobah bekerjasama dengan akademisi KKN.

Materi yang diajarkan meliputi teknik pengambilan foto produk menggunakan smartphone, pembuatan kemasan yang menarik, pembuatan toko di e-commerce, serta optimalisasi media sosial untuk memperluas jangkauan pasar hingga ke luar daerah.`,
    category: 'Kegiatan',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTg1o0CjEtAHcpvZEa6ecvl76PHXnvTmgjZ-W2Fgh7sYKdv7BKZIULI16z8hmaK-kDZm3kt_G5alTwsuZUplf2lNyxBgxagnWeC9xVkAaLrGgeSNQxXykUacSzRmm6u0IbqDY9zJP1jkJIxw_r60aSZpj4OWOAIPuZouXDiKZ8OExiB24zZnnkbYD3E8kX4XBqsVU_kE_o6j7KahbP5Sk23pajNCet7_42qusNif9HoFH1Mvu1D90d',
    author: 'Admin BUMDes',
    views: 215,
    date: '2024-07-28',
  },
  {
    id: '3',
    title: 'Pengumuman: Jadwal Posyandu dan Pemeriksaan Kesehatan Gratis',
    slug: 'pengumuman-jadwal-posyandu-kesehatan-gratis',
    snippet: 'Layanan Posyandu Balita dan Lansia akan dilaksanakan serentak di 4 Dusun pada tanggal 10 Agustus 2024.',
    content: `Pemerintah Desa Siberobah menghimbau seluruh ibu balita dan warga lansia untuk hadir dalam kegiatan Posyandu Rutin dan Pemeriksaan Kesehatan Gratis yang akan dilaksanakan pada:

Hari/Tanggal: Sabtu, 10 Agustus 2024
Waktu: 08:00 - 12:00 WIB
Lokasi: Poskesdes & Balai Dusun 1-4

Fasilitas meliputi penimbangan balita, pemberian makanan tambahan (PMT), cek gula darah, kolesterol, dan tekanan darah gratis.`,
    category: 'Pengumuman',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFd9AW1Azfy3d6_iyG_RGpUASRmNLygnwgsvaBzAVT99PQFPjnxA7ehyrJZjpOhWmmf1wwuVerdUlsqggqifwq63BqlTsapCYg_sOdtS0l29-w1drtm13sbc-doeqNOygbeqjabGtOycDwYJ4DHa7JAobXTb_KVQskK-5GK8VhUEk2LDoDVbdb6SQYjnsowzAzkY4TT3nuHlxtDOpb3fZh-3KVopxh0aUhSoLU0jZfI0PMCmWDcKZ5',
    author: 'Kader Kesehatan Desa',
    views: 189,
    date: '2024-08-04',
  },
];

export const INITIAL_WISATA_UMKM: TourismItem[] = [
  {
    id: 'w1',
    name: 'Wisata Hutan Pinus Siberobah',
    type: 'Wisata',
    category: 'Wisata Alam',
    description: 'Kawasan wisata alam asri dengan pemandangan perbukitan hijau, spot foto pemandangan, dan area berkemah keluarga.',
    location: 'Dusun Topeng, Desa Siberobah',
    contact: '0812-3456-7890',
    priceRange: 'Rp 10.000 / orang',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac',
    rating: 4.9,
  },
  {
    id: 'w2',
    name: 'Kampung Kopi Siberobah',
    type: 'Wisata',
    category: 'Wisata Edukasi',
    description: 'Wisata edukasi petik kopi robusta khas Siberobah, pengolahan biji kopi tradisional hingga penyajian racikan kopi nikmat.',
    location: 'Dusun Krajan, Desa Siberobah',
    contact: '0857-9876-5432',
    priceRange: 'Rp 15.000 - Rp 35.000',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTg1o0CjEtAHcpvZEa6ecvl76PHXnvTmgjZ-W2Fgh7sYKdv7BKZIULI16z8hmaK-kDZm3kt_G5alTwsuZUplf2lNyxBgxagnWeC9xVkAaLrGgeSNQxXykUacSzRmm6u0IbqDY9zJP1jkJIxw_r60aSZpj4OWOAIPuZouXDiKZ8OExiB24zZnnkbYD3E8kX4XBqsVU_kE_o6j7KahbP5Sk23pajNCet7_42qusNif9HoFH1Mvu1D90d',
    rating: 4.8,
  },
  {
    id: 'u1',
    name: 'Kerajinan Anyaman Bambu Siberobah',
    type: 'UMKM',
    category: 'Kerajinan',
    description: 'Produk kerajinan anyaman bambu buatan tangan seperti tas, tempat tisu, wadah serbaguna, dan dekorasi ramah lingkungan.',
    location: 'RT 02 / RW 01, Siberobah',
    contact: '0821-1122-3344',
    priceRange: 'Rp 25.000 - Rp 150.000',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFd9AW1Azfy3d6_iyG_RGpUASRmNLygnwgsvaBzAVT99PQFPjnxA7ehyrJZjpOhWmmf1wwuVerdUlsqggqifwq63BqlTsapCYg_sOdtS0l29-w1drtm13sbc-doeqNOygbeqjabGtOycDwYJ4DHa7JAobXTb_KVQskK-5GK8VhUEk2LDoDVbdb6SQYjnsowzAzkY4TT3nuHlxtDOpb3fZh-3KVopxh0aUhSoLU0jZfI0PMCmWDcKZ5',
    rating: 4.7,
  },
  {
    id: 'u2',
    name: 'Keripik Singkong & Pisang Lumer',
    type: 'UMKM',
    category: 'Olahan Pangan',
    description: 'Camilan olahan singkong dan pisang kaya rasa khas Desa Siberobah dengan varian rasa pedas gurih, keju, dan cokelat lumer.',
    location: 'RT 05 / RW 02, Siberobah',
    contact: '0813-9988-7766',
    priceRange: 'Rp 12.000 - Rp 25.000',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac',
    rating: 4.9,
  },
];

export const INITIAL_SERVICES: PublicServiceItem[] = [
  {
    id: 's1',
    title: 'Surat Keterangan Usaha (SKU)',
    category: 'Surat Keterangan',
    description: 'Surat resmi pendukung kelayakan usaha warga untuk pengajuan perizinan dan permodalan perbankan.',
    requirements: ['Fotokopi KTP Pemohon', 'Fotokopi Kartu Keluarga', 'Foto Tempat Usaha', 'Surat Pengantar RT/RW'],
    processingTime: '1 Hari Kerja',
    cost: 'Gratis',
    icon: 'store',
  },
  {
    id: 's2',
    title: 'Surat Keterangan Domisili',
    category: 'Kependudukan',
    description: 'Surat keterangan bukti domisili tinggal tempat usaha atau perorangan di wilayah Siberobah.',
    requirements: ['Fotokopi KTP', 'Fotokopi KK', 'Surat Pengantar RT/RW'],
    processingTime: '1 Hari Kerja',
    cost: 'Gratis',
    icon: 'location_home',
  },
  {
    id: 's3',
    title: 'Surat Keterangan Tidak Mampu (SKTM)',
    category: 'Bantuan Sosial',
    description: 'Surat keterangan pendukung pengajuan beasiswa pendidikan, BPJS PBI, atau bantuan sosial.',
    requirements: ['Fotokopi KTP Orang Tua / Pemohon', 'Fotokopi KK', 'Surat Pengantar RT/RW', 'Pernyataan Kurang Mampu'],
    processingTime: '1 Hari Kerja',
    cost: 'Gratis',
    icon: 'badge',
  },
  {
    id: 's4',
    title: 'Pengantar Kartu Keluarga / KTP Baru',
    category: 'Kependudukan',
    description: 'Surat pengantar dinas kependudukan untuk pembuatan atau perubahan data KK dan KTP elektronik.',
    requirements: ['KK Lama (Asli & Fotokopi)', 'Fotokopi Akta Kelahiran / Nikah', 'Surat Pengantar RT/RW'],
    processingTime: '1 Hari Kerja',
    cost: 'Gratis',
    icon: 'id_card',
  },
];
