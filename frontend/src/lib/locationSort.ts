interface SortableLocation {
  name: string;
  city: string;
  category?: string;
}

/**
 * Sort locations for display purposes only (does not modify the database):
 * 1. "Raho Club Premier" in "Menara Batavia" always comes first.
 * 2. Then locations with category "cabang".
 * 3. Then everything else (partnership), in original order.
 */
export function sortLocationsForDisplay<T extends SortableLocation>(locations: T[]): T[] {
  const isPriorityLocation = (loc: SortableLocation) =>
    loc.name.trim().toLowerCase() === 'raho club premier' &&
    loc.city.trim().toLowerCase() === 'menara batavia';

  return [...locations].sort((a, b) => {
    const aPriority = isPriorityLocation(a);
    const bPriority = isPriorityLocation(b);
    if (aPriority && !bPriority) return -1;
    if (!aPriority && bPriority) return 1;
    if (aPriority && bPriority) return 0;

    if (a.category === b.category) return 0;
    return a.category === 'cabang' ? -1 : 1;
  });
}
