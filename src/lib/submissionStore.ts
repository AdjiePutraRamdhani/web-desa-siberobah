export interface ServiceSubmissionItem {
  id: string;
  serviceTitle: string;
  name: string;
  nik: string;
  phone: string;
  purpose: string;
  status: 'Pending' | 'Diproses' | 'Selesai' | 'Ditolak';
  createdAt: string;
  updatedAt: string;
}

const globalForSubmissions = globalThis as unknown as { submissionsMemory: ServiceSubmissionItem[] };

if (!globalForSubmissions.submissionsMemory) {
  globalForSubmissions.submissionsMemory = [
    {
      id: 'sub-101',
      serviceTitle: 'Surat Keterangan Usaha (SKU)',
      name: 'Budi Santoso',
      nik: '3301021508890001',
      phone: '081234567890',
      purpose: 'Persyaratan pengajuan KUR Bank Rakyat Indonesia untuk usaha warung kelontong',
      status: 'Pending',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'sub-102',
      serviceTitle: 'Surat Keterangan Tidak Mampu (SKTM)',
      name: 'Siti Aminah',
      nik: '3301024412920003',
      phone: '085712345678',
      purpose: 'Pengajuan KIP Kuliah universitas anak',
      status: 'Diproses',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'sub-103',
      serviceTitle: 'Surat Keterangan Domisili',
      name: 'Ahmad Fauzi',
      nik: '3301021010850005',
      phone: '082198765432',
      purpose: 'Pindahan alamat domisili pekerjaan baru',
      status: 'Selesai',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ];
}

export function getSubmissionsStore(): ServiceSubmissionItem[] {
  return [...globalForSubmissions.submissionsMemory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addSubmissionStore(data: Omit<ServiceSubmissionItem, 'id' | 'createdAt' | 'updatedAt' | 'status'>): ServiceSubmissionItem {
  const newItem: ServiceSubmissionItem = {
    id: `sub-${Date.now()}`,
    ...data,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  globalForSubmissions.submissionsMemory.unshift(newItem);
  return newItem;
}

export function updateSubmissionStatusStore(id: string, status: ServiceSubmissionItem['status']): ServiceSubmissionItem | null {
  const item = globalForSubmissions.submissionsMemory.find((s) => s.id === id);
  if (!item) return null;
  item.status = status;
  item.updatedAt = new Date().toISOString();
  return item;
}

export function deleteSubmissionStore(id: string): boolean {
  const initialLen = globalForSubmissions.submissionsMemory.length;
  globalForSubmissions.submissionsMemory = globalForSubmissions.submissionsMemory.filter((s) => s.id !== id);
  return globalForSubmissions.submissionsMemory.length < initialLen;
}
