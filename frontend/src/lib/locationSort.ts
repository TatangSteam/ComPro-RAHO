interface SortableLocation {
  category?: string;
  sortOrder?: number;
}

/**
 * Sort locations for display purposes only (does not modify the database).
 * The backend already orders by category then sortOrder, but this is kept
 * as a client-side safety net for lists that get filtered/re-grouped in the
 * frontend (e.g. splitting into "cabang" vs "partnership" groups), so the
 * admin-configured sortOrder is still respected after filtering.
 */
export function sortLocationsForDisplay<T extends SortableLocation>(locations: T[]): T[] {
  return [...locations].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category === 'cabang' ? -1 : 1;
    }
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });
}
