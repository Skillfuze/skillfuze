export function slugToTitle(slug: string): string {
  const words = slug.split('-');

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    if (words[i] === 'And') {
      words[i] = '&';
    }
  }
  return words.join(' ');
}
