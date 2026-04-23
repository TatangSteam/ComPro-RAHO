export type CategoryFilterType = 'semua' | 'penyakit' | 'tindakan-medis' | 'kisah-pasien';

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onCategoryChange: (category: CategoryFilterType) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: { value: CategoryFilterType; label: string }[] = [
    { value: 'semua', label: 'Semua' },
    { value: 'penyakit', label: 'Penyakit' },
    { value: 'tindakan-medis', label: 'Tindakan Medis' },
    { value: 'kisah-pasien', label: 'Kisah Pasien' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
            selectedCategory === category.value
              ? 'bg-yellow-600 text-white'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-600'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
