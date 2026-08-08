import React, { useState } from "react";

import {
  ChevronRight,
  ChevronDown,
  OverflowMenuVertical,
} from "@carbon/icons-react";

import "./ModuleTable.css";

/* =====================================================
   INITIAL MODULE DATA
===================================================== */

export const initialModules = [
  {
    id: 1,
    name: "Child Wellbeing",
    author: "Saranya Loganathan",
    serviceComponent: "Workshop",
    program: "Mind Matters",
    status: "Active",
    date: "22 Nov 2025",
    category: "CBSE",
    targetGroup: "12th Grade",
    summary:
      "Supports emotional, social, and psychological wellbeing in children. Focuses on healthy growth and positive development.",
    tags: [
      "Maharishi Chetpet",
      "Maharishi Chetpet",
      "+3",
    ],
  },

  {
    id: 2,
    name: "Anti Bullying Methods",
    author: "Saranya Loganathan",
    serviceComponent: "Workshop",
    program: "Mind Matters Jr.",
    status: "Draft",
    date: "19 Nov 2025",
    category: "CBSE",
    targetGroup: "12th Grade",
    summary:
      "Supports emotional, social, and psychological wellbeing in children. Focuses on healthy growth and positive development.",
    tags: [
      "Maharishi Chetpet",
      "Maharishi Chetpet",
      "+3",
    ],
  },

  {
    id: 3,
    name: "Handling Depression in Minors",
    author: "Janice Anthony",
    serviceComponent: "Workshop",
    program: "Mind Matters Jr.",
    status: "Draft",
    date: "23 Nov 2025",
    category: "CBSE",
    targetGroup: "12th Grade",
    summary:
      "Supports emotional, social, and psychological wellbeing in children. Focuses on healthy growth and positive development.",
    tags: [
      "Maharishi Chetpet",
      "Maharishi Chetpet",
      "+3",
    ],
  },
];


/* =====================================================
   COMPONENT
===================================================== */

export default function ModuleTable({
  moduleList,
  setModuleList,

  activeTab = "all",

  searchTerm = "",

  selectedProgram = "All Programs",

  showFilters = false,
  setShowFilters = () => {},

  selectedCollaborators = [],
  setSelectedCollaborators = () => {},

  selectedCategories = [],
  setSelectedCategories = () => {},

  selectedTags = [],
  setSelectedTags = () => {},

  createdOn = "Any time",
  setCreatedOn = () => {},

  resetFilters = () => {},

  /* IMPORTANT */
  onModuleSelect,

  /* NEW - used for Edit */
  onEditModule,
}) {

  /* =====================================================
     STATE
  ===================================================== */

  const [expandedModule, setExpandedModule] =
    useState(null);

  const [openFilter, setOpenFilter] =
    useState(null);

  const [openMenu, setOpenMenu] =
    useState(null);


  /* =====================================================
     EXPAND / COLLAPSE
  ===================================================== */

  const toggleModule = (moduleId) => {
    setExpandedModule((current) =>
      current === moduleId
        ? null
        : moduleId
    );
  };


  /* =====================================================
     FILTER ACCORDION
  ===================================================== */

  const toggleFilter = (filterName) => {
    setOpenFilter((current) =>
      current === filterName
        ? null
        : filterName
    );
  };


  /* =====================================================
     COLLABORATOR
  ===================================================== */

  const toggleCollaborator = (name) => {
    if (
      selectedCollaborators.includes(name)
    ) {
      setSelectedCollaborators(
        selectedCollaborators.filter(
          (item) => item !== name
        )
      );
    } else {
      setSelectedCollaborators([
        ...selectedCollaborators,
        name,
      ]);
    }
  };


  /* =====================================================
     CATEGORY
  ===================================================== */

  const toggleCategory = (category) => {
    if (
      selectedCategories.includes(category)
    ) {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item !== category
        )
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        category,
      ]);
    }
  };


  /* =====================================================
     TAG
  ===================================================== */

  const toggleTag = (tag) => {
    if (
      selectedTags.includes(tag)
    ) {
      setSelectedTags(
        selectedTags.filter(
          (item) => item !== tag
        )
      );
    } else {
      setSelectedTags([
        ...selectedTags,
        tag,
      ]);
    }
  };


  /* =====================================================
     ARCHIVE
  ===================================================== */

  const archiveModule = (module) => {

    setModuleList((current) =>
      current.filter(
        (item) =>
          item.id !== module.id
      )
    );

    setExpandedModule(null);
    setOpenMenu(null);

    if (onModuleSelect) {
      onModuleSelect(null);
    }
  };


  /* =====================================================
     DUPLICATE
  ===================================================== */

  const duplicateModule = (module) => {

    const duplicate = {
      ...module,

      id: Date.now(),

      name:
        `${module.name} Copy`,

      status: "Draft",

      date: "Today",
    };

    setModuleList((current) => [
      ...current,
      duplicate,
    ]);

    setOpenMenu(null);
  };


  /* =====================================================
     EDIT
  ===================================================== */

  const editModule = (module) => {

    setOpenMenu(null);

    /*
      IMPORTANT:

      Do NOT call onModuleSelect here.

      onModuleSelect opens the summary/details
      drawer.

      Edit should open the Add Modules form.
    */

    if (onEditModule) {
      onEditModule(module);
    }
  };


  /* =====================================================
     SEARCH
  ===================================================== */

  const search =
    String(searchTerm)
      .toLowerCase()
      .trim();


  /* =====================================================
     TAB
  ===================================================== */

  const normalizedTab =
    String(activeTab)
      .toLowerCase()
      .replace(/[\s_-]/g, "");

  const isMyModulesTab =
    activeTab === 1 ||
    normalizedTab === "my" ||
    normalizedTab === "mymodules" ||
    normalizedTab === "mine";

  const isAllModulesTab =
    activeTab === 0 ||
    normalizedTab === "all" ||
    normalizedTab === "allmodules";


  /* =====================================================
     FILTER MODULES
  ===================================================== */

  const displayedModules =
    (moduleList || []).filter((module) => {

      let matchesTab = true;

      /*
        My Modules = modules created by
        Saranya Loganathan
      */

      if (isMyModulesTab) {
        matchesTab =
          module.author ===
          "Saranya Loganathan";
      }

      if (isAllModulesTab) {
        matchesTab = true;
      }


      /* SEARCH */

      const matchesSearch =
        !search ||

        module.name
          .toLowerCase()
          .includes(search) ||

        module.author
          .toLowerCase()
          .includes(search) ||

        module.program
          .toLowerCase()
          .includes(search) ||

        module.category
          .toLowerCase()
          .includes(search);


      /* PROGRAM */

      const matchesProgram =
        selectedProgram ===
          "All Programs" ||

        module.program ===
          selectedProgram;


      /* COLLABORATOR */

      const matchesCollaborator =
        selectedCollaborators.length === 0 ||

        selectedCollaborators.includes(
          module.author
        );


      /* CATEGORY */

      const matchesCategory =
        selectedCategories.length === 0 ||

        selectedCategories.includes(
          module.category
        );


      /* TAG / STATUS */

      const matchesTag =
        selectedTags.length === 0 ||

        selectedTags.includes(
          module.status
        );


      return (
        matchesTab &&
        matchesSearch &&
        matchesProgram &&
        matchesCollaborator &&
        matchesCategory &&
        matchesTag
      );
    });


  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className={`module-table-area ${
        showFilters
          ? "with-filter"
          : ""
      }`}
    >

      {/* =================================================
          FILTER SIDEBAR
      ================================================= */}

      {showFilters && (
        <aside className="module-filter-sidebar">

          <div className="filter-title-row">

            <h3>
              Filter
            </h3>

            <button
              type="button"
              className="filter-close-button"
              onClick={() => {
                setShowFilters(false);
                setOpenFilter(null);
              }}
            >
              ×
            </button>

          </div>


          {/* COLLABORATORS */}

          <div className="filter-group">

            <button
              type="button"
              className="filter-group-title"
              onClick={() =>
                toggleFilter(
                  "collaborators"
                )
              }
            >
              <span>
                Collaborators
              </span>

              {openFilter ===
              "collaborators" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>


            {openFilter ===
              "collaborators" && (

              <div className="filter-options">

                <label>

                  <input
                    type="checkbox"
                    checked={selectedCollaborators.includes(
                      "Saranya Loganathan"
                    )}
                    onChange={() =>
                      toggleCollaborator(
                        "Saranya Loganathan"
                      )
                    }
                  />

                  <span>
                    Saranya Loganathan
                  </span>

                </label>


                <label>

                  <input
                    type="checkbox"
                    checked={selectedCollaborators.includes(
                      "Janice Anthony"
                    )}
                    onChange={() =>
                      toggleCollaborator(
                        "Janice Anthony"
                      )
                    }
                  />

                  <span>
                    Janice Anthony
                  </span>

                </label>

              </div>
            )}

          </div>


          {/* CREATED ON */}

          <div className="filter-group">

            <button
              type="button"
              className="filter-group-title"
              onClick={() =>
                toggleFilter("created")
              }
            >
              <span>
                Created on
              </span>

              {openFilter === "created" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}

            </button>


            {openFilter === "created" && (

              <div className="filter-options">

                <label>

                  <input
                    type="radio"
                    name="created"
                    checked={
                      createdOn ===
                      "Any time"
                    }
                    onChange={() =>
                      setCreatedOn(
                        "Any time"
                      )
                    }
                  />

                  <span>
                    Any time
                  </span>

                </label>


                <label>

                  <input
                    type="radio"
                    name="created"
                    checked={
                      createdOn ===
                      "Last 7 days"
                    }
                    onChange={() =>
                      setCreatedOn(
                        "Last 7 days"
                      )
                    }
                  />

                  <span>
                    Last 7 days
                  </span>

                </label>


                <label>

                  <input
                    type="radio"
                    name="created"
                    checked={
                      createdOn ===
                      "Last 30 days"
                    }
                    onChange={() =>
                      setCreatedOn(
                        "Last 30 days"
                      )
                    }
                  />

                  <span>
                    Last 30 days
                  </span>

                </label>

              </div>
            )}

          </div>


          {/* CATEGORY */}

          <div className="filter-group">

            <button
              type="button"
              className="filter-group-title"
              onClick={() =>
                toggleFilter("category")
              }
            >

              <span>
                Category
              </span>

              {openFilter ===
              "category" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}

            </button>


            {openFilter ===
              "category" && (

              <div className="filter-options">

                <label>

                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(
                      "CBSE"
                    )}
                    onChange={() =>
                      toggleCategory(
                        "CBSE"
                      )
                    }
                  />

                  <span>
                    CBSE
                  </span>

                </label>

              </div>
            )}

          </div>


          {/* TAGS */}

          <div className="filter-group">

            <button
              type="button"
              className="filter-group-title"
              onClick={() =>
                toggleFilter("tags")
              }
            >

              <span>
                Tags
              </span>

              {openFilter === "tags" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}

            </button>


            {openFilter === "tags" && (

              <div className="filter-options">

                <label>

                  <input
                    type="checkbox"
                    checked={selectedTags.includes(
                      "Active"
                    )}
                    onChange={() =>
                      toggleTag("Active")
                    }
                  />

                  <span>
                    Active
                  </span>

                </label>


                <label>

                  <input
                    type="checkbox"
                    checked={selectedTags.includes(
                      "Draft"
                    )}
                    onChange={() =>
                      toggleTag("Draft")
                    }
                  />

                  <span>
                    Draft
                  </span>

                </label>

              </div>
            )}

          </div>


          {/* RESET */}

          <div className="filter-reset-area">

            <button
              type="button"
              className="reset-filters-button"
              onClick={() => {
                resetFilters();
                setOpenFilter(null);
              }}
            >
              Reset filters
            </button>

          </div>

        </aside>
      )}


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="module-table-container">

        <table className="module-table">

          <thead>

            <tr>

              <th className="arrow-column">
              </th>

              <th>
                Module Name
              </th>

              <th>
                Author
              </th>

              <th>
                Service Component
              </th>

              <th>
                Program
              </th>

              <th>
                Status
              </th>

              <th>
                Publish Date
              </th>

              <th className="menu-column">
              </th>

            </tr>

          </thead>


          <tbody>

            {displayedModules.map(
              (module) => {

                const isExpanded =
                  expandedModule ===
                  module.id;

                const isMenuOpen =
                  openMenu ===
                  module.id;


                return (

                  <React.Fragment
                    key={module.id}
                  >

                    {/* NORMAL ROW */}

                    <tr
                      className={
                        isExpanded
                          ? "module-row expanded"
                          : "module-row"
                      }
                    >

                      {/* ARROW */}

                      <td className="arrow-column">

                        <button
                          type="button"
                          className="expand-module-button"
                          onClick={() =>
                            toggleModule(
                              module.id
                            )
                          }
                          aria-label={
                            isExpanded
                              ? "Collapse module"
                              : "Expand module"
                          }
                        >

                          {isExpanded ? (
                            <ChevronDown
                              size={16}
                            />
                          ) : (
                            <ChevronRight
                              size={16}
                            />
                          )}

                        </button>

                      </td>


                      {/* MODULE NAME */}

                      <td>

                        <button
                          type="button"
                          className="module-name-link"
                          onClick={() => {

                            toggleModule(
                              module.id
                            );

                            if (
                              onModuleSelect
                            ) {
                              onModuleSelect(
                                module
                              );
                            }

                          }}
                        >
                          {module.name}
                        </button>

                      </td>


                      {/* AUTHOR */}

                      <td>
                        {module.author}
                      </td>


                      {/* SERVICE */}

                      <td>
                        {module.serviceComponent}
                      </td>


                      {/* PROGRAM */}

                      <td>
                        {module.program}
                      </td>


                      {/* STATUS */}

                      <td>

                        <div
                          className={`module-status ${module.status.toLowerCase()}`}
                        >

                          <span className="status-dot">
                          </span>

                          <span>
                            {module.status}
                          </span>

                        </div>

                      </td>


                      {/* DATE */}

                      <td>
                        {module.date}
                      </td>


                      {/* THREE DOT MENU */}

                      <td className="menu-column">

                        <button
                          type="button"
                          className="module-menu-button"
                          aria-label="Module options"
                          onClick={(event) => {

                            event.stopPropagation();

                            setOpenMenu(
                              (current) =>
                                current ===
                                module.id
                                  ? null
                                  : module.id
                            );

                          }}
                        >

                          <OverflowMenuVertical
                            size={16}
                          />

                        </button>


                        {isMenuOpen && (

                          <div
                            className="module-action-menu"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                          >

                            {/* EDIT */}

                            <button
                              type="button"
                              onClick={() =>
                                editModule(
                                  module
                                )
                              }
                            >
                              Edit module
                            </button>


                            {/* DUPLICATE */}

                            <button
                              type="button"
                              onClick={() =>
                                duplicateModule(
                                  module
                                )
                              }
                            >
                              Duplicate module
                            </button>


                            {/* ARCHIVE */}

                            <button
                              type="button"
                              onClick={() =>
                                archiveModule(
                                  module
                                )
                              }
                            >
                              Archive module
                            </button>

                          </div>

                        )}

                      </td>

                    </tr>


                    {/* =================================================
                        EXPANDED ROW

                        IMPORTANT:
                        NO THREE-DOT MENU HERE.
                    ================================================= */}

                    {isExpanded && (

                      <tr
                        className="expanded-module-row"
                      >

                        <td>
                        </td>

                        <td colSpan="7">

                          <div className="expanded-module-content">

                            {/* SUMMARY */}

                            <div className="summary-section">

                              <div className="summary-title">

                                <span>
                                  Generated Summary
                                </span>

                                <span className="ai-badge">
                                  AI
                                </span>

                              </div>

                              <p>
                                {module.summary}
                              </p>

                            </div>


                            {/* INFO */}

                            <div className="expanded-info">

                              <div className="info-item">

                                <span className="info-label">
                                  Category
                                </span>

                                <span className="info-value">
                                  {module.category}
                                </span>

                              </div>


                              <div className="info-item">

                                <span className="info-label">
                                  Target Group
                                </span>

                                <span className="info-value">
                                  {module.targetGroup}
                                </span>

                              </div>

                            </div>


                            {/* TAGS */}

                            <div className="module-tags">

                              {(module.tags || []).map(
                                (
                                  tag,
                                  index
                                ) => (

                                  <span
                                    key={`${tag}-${index}`}
                                    className="module-tag"
                                  >
                                    {tag}
                                  </span>

                                )
                              )}

                            </div>

                          </div>

                        </td>

                      </tr>

                    )}

                  </React.Fragment>

                );

              }
            )}

          </tbody>

        </table>


        {/* EMPTY */}

        {displayedModules.length ===
          0 && (

          <div className="no-module-results">
            No modules found
          </div>

        )}

      </div>

    </div>
  );
}