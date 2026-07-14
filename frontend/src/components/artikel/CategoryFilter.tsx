import { Activity, BookOpen, FileText, Users } from 'lucide-react';
import { ARTICLE_CATEGORIES, CategoryFilterType, getCategoryDescription } from '@/lib/articleMeta';

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onCategoryChange: (category: CategoryFilterType) => void;
  categoryCounts?: Partial<Record<CategoryFilterType, number>>;
}

const categoryIcons = {
  semua: BookOpen,
  penyakit: Activity,
  'tindakan-medis': FileText,
  'kisah-pasien': Users,
} satisfies Record<CategoryFilterType, typeof BookOpen>;

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  categoryCounts = {},
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {ARTICLE_CATEGORIES.map((category) => {
        const Icon = categoryIcons[category.value];
        const isSelected = selectedCategory === category.value;

        return (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            aria-pressed={isSelected}
            title={getCategoryDescription(category.value)}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-5 ${
              isSelected
                ? 'border-[#B69133] bg-[#171717] text-white shadow-lg shadow-black/15'
                : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:-translate-y-0.5 hover:border-[#D6B85A] hover:text-[#8B6F2E] hover:shadow-md'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                isSelected ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {categoryCounts[category.value] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
