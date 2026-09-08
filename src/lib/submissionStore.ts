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
  globalForSubmissions.submissionsMemory = [];
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
