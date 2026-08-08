import {
  Filter,
  Search,
  Renew,
  ChevronDown,
} from "@carbon/icons-react";

import "./ModuleToolbar.css";

export default function ModuleToolbar({
  searchTerm,
  setSearchTerm,

  selectedProgram,
  setSelectedProgram,

  showFilters,
  setShowFilters,

  onRefresh,
}) {
  const programs = [
    "All Programs",
    "Mind Matters",
    "Mind Matters Jr.",
  ];

  const handleProgramChange = () => {
    const currentIndex =
      programs.indexOf(selectedProgram);

    const nextIndex =
      (currentIndex + 1) %
      programs.length;

    setSelectedProgram(
      programs[nextIndex]
    );
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="module-toolbar">
      {/* FILTER */}

      <button
        type="button"
        className={`toolbar-icon-button ${
          showFilters
            ? "filter-active"
            : ""
        }`}
        onClick={() =>
          setShowFilters(!showFilters)
        }
        aria-label="Toggle filters"
      >
        <Filter size={16} />
      </button>

      {/* PROGRAM */}

      <button
        type="button"
        className="program-filter"
        onClick={handleProgramChange}
      >
        <span>
          {selectedProgram}
        </span>

        <ChevronDown size={16} />
      </button>

      {/* SEARCH */}

      <div className="module-search">
        <Search size={16} />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
          placeholder="Find module by name, author or category"
        />
      </div>

      {/* REFRESH */}

      <button
        type="button"
        className="refresh-button"
        onClick={handleRefresh}
        aria-label="Refresh"
      >
        <Renew size={16} />
      </button>
    </div>
  );
}