export function generateURL(path: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? `https://www.skillfuze.com${path}` : `http://localhost:3001${path}`;
}

export function navigate(path: string): void {
  window.location.href = generateURL(path);
}
