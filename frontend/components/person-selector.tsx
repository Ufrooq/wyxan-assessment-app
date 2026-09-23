import type { Person } from "@/lib/types";

type PersonSelectorProps = {
  people: Person[];
  selectedPersonId: string;
  onPersonChange: (personId: string) => void;
};

export function PersonSelector({
  people,
  selectedPersonId,
  onPersonChange,
}: PersonSelectorProps) {
  return (
    <label className="flex items-center gap-3 text-sm text-[#43515d]">
      Person
      <span className="relative">
        <select
          className="h-11 min-w-32 appearance-none rounded-md border border-[#cbd5d1] bg-white py-0 pl-4 pr-10 text-sm font-medium text-[#17212b] shadow-sm outline-none transition focus:border-[#2e7bd6] focus:ring-2 focus:ring-[#2e7bd6]/15"
          value={selectedPersonId}
          onChange={(event) => onPersonChange(event.target.value)}
          disabled={people.length === 0}
        >
          {people.length > 0 ? (
            people.map((person) => (
              <option key={person._id} value={person._id}>
                {person.name}
              </option>
            ))
          ) : (
            <option>No people</option>
          )}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667580]">
          ▾
        </span>
      </span>
    </label>
  );
}
