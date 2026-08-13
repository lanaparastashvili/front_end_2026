const assetImages = import.meta.glob<{ default: string }>('../assets/*.png', { eager: true });

export function getImageUrl(imageName?: string): string {
  if (!imageName) {
    return 'https://via.placeholder.com/210x295?text=No+Image';
  }

  const filename = imageName.split('/').pop() || imageName;
  
  const fullPath = `../assets/${filename}`;
  if (assetImages[fullPath]) {
    return assetImages[fullPath].default;
  }

  const pathWithPng = `../assets/${filename}.png`;
  if (assetImages[pathWithPng]) {
    return assetImages[pathWithPng].default;
  }

  return imageName;
}
