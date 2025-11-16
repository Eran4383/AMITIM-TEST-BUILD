export const parseAgeGroup = (ageGroup) => {
  const matches = ageGroup.match(/(\d+)-(\d+)/);
  if (matches) {
    return { min: parseInt(matches[1], 10), max: parseInt(matches[2], 10) };
  }
  if (ageGroup.includes('66 ומעלה')) {
    return { min: 66, max: 120 };
  }
   if (ageGroup.includes('רב גילאי')) {
    return { min: 0, max: 120 };
  }
  return { min: 0, max: 120 }; // Default for unmatched strings
};

export const parsePrice = (price) => {
    const numericPrice = parseInt(price, 10);
    return isNaN(numericPrice) ? 0 : numericPrice;
};
