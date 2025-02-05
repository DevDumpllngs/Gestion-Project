export const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'entertainment':
      return '🎬';
    case 'shopping':
      return '🛍️';
    case 'food':
      return '🍽️';
    case 'gaming':
      return '🎮';
    case 'house':
      return '🏠';
    case 'transport':
      return '🚗';
    case 'health':
      return '❤️';
    default:
      return '💰';
  }
};

export const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};
