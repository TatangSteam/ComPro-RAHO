export function extractKeyFromUrl(fileUrl?: string): string | undefined {
  if (!fileUrl) return undefined;
  try {
    const url = new URL(fileUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts.pop();
  } catch (e) {
    const parts = fileUrl.split('/').filter(Boolean);
    return parts.pop();
  }
}

export async function createAuthenticatedObjectUrl(fileUrl?: string): Promise<string | undefined> {
  if (!fileUrl) return undefined;
  // Build API path reliably and avoid duplicating `/api` segments.
  const baseRaw = process.env.NEXT_PUBLIC_API_URL || '';
  const base = baseRaw.replace(/\/+$/, '');
  let apiPath: string;

  try {
    // If fileUrl is absolute (MinIO or legacy URL), extract the object key
    const parsed = new URL(fileUrl);
    const key = extractKeyFromUrl(fileUrl);
    if (!key) return undefined;
    apiPath = `${base}/files/${key}`;
  } catch (e) {
    // Not an absolute URL — handle paths like '/api/files/...' or '/files/...' or 'files/..'
    if (fileUrl.startsWith('/')) {
      if (fileUrl.startsWith('/api/')) {
        // Remove leading '/api' to avoid base already containing '/api'
        apiPath = `${base}${fileUrl.replace(/^\/api/, '')}`;
      } else {
        apiPath = `${base}${fileUrl}`;
      }
    } else {
      apiPath = `${base}/files/${fileUrl}`;
    }
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  try {
    const res = await fetch(apiPath, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) return undefined;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('createAuthenticatedObjectUrl error:', error);
    return undefined;
  }
}
