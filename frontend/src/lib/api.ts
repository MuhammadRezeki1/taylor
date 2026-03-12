import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export interface Layanan {
  id: number; nama: string; deskripsi: string;
  harga_mulai: number; icon: string; urutan: number; aktif: number;
}
export interface Testimoni {
  id: number; nama: string; kota: string; isi: string;
  bintang: number; foto?: string; aktif: number; created_at: string;
}
export interface Pesanan {
  id: number; nama_pelanggan: string; no_hp: string; email?: string;
  alamat?: string; jenis_layanan?: string; deskripsi_pesanan?: string;
  status: string; catatan_admin?: string; created_at: string;
}
export interface KontakMasuk {
  id: number; nama: string; email?: string; no_hp?: string;
  pesan: string; sudah_dibaca: number; created_at: string;
}
export interface Galeri {
  id: number; judul?: string; deskripsi?: string;
  url_gambar: string; kategori: string; urutan: number; aktif: number;
}
export interface Blog {
  id: number; judul: string; slug: string; ringkasan?: string;
  konten?: string; gambar_cover?: string; penulis: string;
  published: number; created_at: string;
}
export interface Settings { [key: string]: string; }

export const layananAPI = {
  getAll: (aktif?: boolean) => api.get<Layanan[]>('/layanan', { params: aktif !== undefined ? { aktif } : {} }),
  create: (d: Partial<Layanan>) => api.post<Layanan>('/layanan', d),
  update: (id: number, d: Partial<Layanan>) => api.put<Layanan>(`/layanan/${id}`, d),
  delete: (id: number) => api.delete(`/layanan/${id}`),
};
export const testimoniAPI = {
  getAll: (aktif?: boolean) => api.get<Testimoni[]>('/testimoni', { params: aktif !== undefined ? { aktif } : {} }),
  create: (d: Partial<Testimoni>) => api.post<Testimoni>('/testimoni', d),
  update: (id: number, d: Partial<Testimoni>) => api.put<Testimoni>(`/testimoni/${id}`, d),
  delete: (id: number) => api.delete(`/testimoni/${id}`),
};
export const pesananAPI = {
  getAll: (status?: string) => api.get<Pesanan[]>('/pesanan', { params: status ? { status } : {} }),
  create: (d: Partial<Pesanan>) => api.post<Pesanan>('/pesanan', d),
  update: (id: number, d: Partial<Pesanan>) => api.put<Pesanan>(`/pesanan/${id}`, d),
};
export const kontakAPI = {
  getAll: () => api.get<KontakMasuk[]>('/kontak'),
  create: (d: Partial<KontakMasuk>) => api.post<KontakMasuk>('/kontak', d),
  markRead: (id: number) => api.patch(`/kontak/${id}/baca`),
};
export const galeriAPI = {
  getAll: (kategori?: string) => api.get<Galeri[]>('/galeri', { params: kategori ? { kategori } : {} }),
  create: (d: Partial<Galeri>) => api.post<Galeri>('/galeri', d),
  update: (id: number, d: Partial<Galeri>) => api.put<Galeri>(`/galeri/${id}`, d),
  delete: (id: number) => api.delete(`/galeri/${id}`),
};
export const blogAPI = {
  getAll: (published?: boolean) => api.get<Blog[]>('/blog', { params: published !== undefined ? { published } : {} }),
  getBySlug: (slug: string) => api.get<Blog>(`/blog/slug/${slug}`),
  create: (d: Partial<Blog>) => api.post<Blog>('/blog', d),
  update: (id: number, d: Partial<Blog>) => api.put<Blog>(`/blog/${id}`, d),
  delete: (id: number) => api.delete(`/blog/${id}`),
};
export const settingsAPI = {
  getAll: () => api.get<Settings>('/settings'),
  setMany: (d: Record<string, string>) => api.post<Settings>('/settings', d),
};

export default api;