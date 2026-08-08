import { useState } from "react";

import {
  ChevronRight,
  ChevronDown,
  OverflowMenuVertical,
  Search,
  Renew,
  ArrowLeft,
} from "@carbon/icons-react";

import "./ReviewQueue.css";

/* =========================================
   INITIAL REVIEW MODULES
========================================= */

const initialReviewModules = [
  {
    id: 1,
    name: "Anti Bullying Methods",
    author: "Saranya Loganathan",
    category: "Mind Matters Jr.",
    status: "Pending Review",
    date: "19 Nov 2025",
  },

  {
    id: 2,
    name: "Handling Depression in Minors",
    author: "Saranya Loganathan",
    category: "Mind Matters Jr.",
    status: "Pending Review",
    date: "23 Nov 2025",
  },

  {
    id: 3,
    name: "Handling Depression in Minors",
    author: "Saranya Loganathan",
    category: "Mind Matters Jr.",
    status: "Needs Changes",
    date: "23 Nov 2025",
  },

  {
    id: 4,
    name: "Sexuality in Young Adults",
    author: "Saranya Loganathan",
    category: "Mind Matters Jr.",
    status: "Approved",
    date: "23 Nov 2025",
  },
];

export default function ReviewQueue({ onBack }) {
  /* =========================================
     DATA
  ========================================= */

  const [reviewModules, setReviewModules] =
    useState(initialReviewModules);

  /* =========================================
     TABS
  ========================================= */

  const [activeTab, setActiveTab] =
    useState("submitted");

  /* =========================================
     SEARCH
  ========================================= */

  const [searchTerm, setSearchTerm] =
    useState("");

  /* =========================================
     PROGRAM
  ========================================= */

  const [selectedProgram, setSelectedProgram] =
    useState("All Programs");

  const programs = [
    "All Programs",
    "Mind Matters",
    "Mind Matters Jr.",
  ];

  /* =========================================
     EXPANDED ROW
  ========================================= */

  const [expandedRow, setExpandedRow] =
    useState(null);

  /* =========================================
     OPEN MENU
  ========================================= */

  const [openMenu, setOpenMenu] =
    useState(null);

  /* =========================================
     REVIEW DRAWER
  ========================================= */

  const [reviewingModule, setReviewingModule] =
    useState(null);

  /* =========================================
     TAB STATUS
  ========================================= */

  const getTabStatus = () => {
    if (activeTab === "submitted") {
      return "Pending Review";
    }

    if (activeTab === "changes") {
      return "Needs Changes";
    }

    if (activeTab === "approved") {
      return "Approved";
    }

    return null;
  };

  /* =========================================
     FILTER MODULES
  ========================================= */

  const filteredModules = reviewModules.filter(
    (module) => {
      const search =
        searchTerm
          .toLowerCase()
          .trim();

      const matchesSearch =
        !search ||
        module.name
          .toLowerCase()
          .includes(search) ||
        module.author
          .toLowerCase()
          .includes(search) ||
        module.category
          .toLowerCase()
          .includes(search);

      const matchesProgram =
        selectedProgram ===
          "All Programs" ||
        module.category ===
          selectedProgram;

      const tabStatus =
        getTabStatus();

      const matchesTab =
        !tabStatus ||
        module.status === tabStatus;

      return (
        matchesSearch &&
        matchesProgram &&
        matchesTab
      );
    }
  );

  /* =========================================
     COUNTS
  ========================================= */

  const submittedCount =
    reviewModules.filter(
      (module) =>
        module.status ===
        "Pending Review"
    ).length;

  const changesCount =
    reviewModules.filter(
      (module) =>
        module.status ===
        "Needs Changes"
    ).length;

  const approvedCount =
    reviewModules.filter(
      (module) =>
        module.status ===
        "Approved"
    ).length;

  /* =========================================
     EXPAND ROW
  ========================================= */

  const toggleRow = (id) => {
    setExpandedRow((current) =>
      current === id
        ? null
        : id
    );
  };

  /* =========================================
     PROGRAM FILTER
  ========================================= */

  const changeProgram = () => {
    const currentIndex =
      programs.indexOf(
        selectedProgram
      );

    const nextIndex =
      (currentIndex + 1) %
      programs.length;

    setSelectedProgram(
      programs[nextIndex]
    );
  };

  /* =========================================
     STATUS CLASS
  ========================================= */

  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "review-approved";
    }

    if (status === "Needs Changes") {
      return "review-warning";
    }

    return "review-pending";
  };

  /* =========================================
     STATUS ICON
  ========================================= */

  const getStatusIcon = (status) => {
    if (status === "Approved") {
      return "●";
    }

    if (status === "Needs Changes") {
      return "▲";
    }

    return "●";
  };

  /* =========================================
     OPEN REVIEW
  ========================================= */

  const openReviewDrawer = (module) => {
    setOpenMenu(null);
    setReviewingModule(module);
  };

  /* =========================================
     UPDATE STATUS
  ========================================= */

  const updateReviewStatus = (
    moduleId,
    newStatus
  ) => {
    setReviewModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              status: newStatus,
            }
          : module
      )
    );

    setReviewingModule(null);
    setOpenMenu(null);
  };

  /* =========================================
     REFRESH
  ========================================= */

  const handleRefresh = () => {
    setReviewModules(
      initialReviewModules
    );

    setSearchTerm("");

    setSelectedProgram(
      "All Programs"
    );

    setExpandedRow(null);
    setOpenMenu(null);
    setReviewingModule(null);
  };

  return (
    <main className="review-page">

      {/* =====================================
          BREADCRUMB
      ====================================== */}

      <div className="review-breadcrumb">

        <button
          type="button"
          className="review-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />

          <span>
            Back to Modules
          </span>
        </button>

        <span>/</span>

        <span>
          Review Queue
        </span>

      </div>


      {/* =====================================
          HEADER
      ====================================== */}

      <header className="review-header">

        <h1>
          Review Queue
        </h1>

        <div className="review-summary">

          <div className="review-summary-info">

            <div className="review-summary-title">
              Review Summary
            </div>

           <div className="review-summary-subtitle">
  {submittedCount + changesCount} modules awaiting review
</div>

          </div>

          <div className="review-summary-number warning">
            <span>▲</span>
            <strong>
              {changesCount}
            </strong>
          </div>

          <div className="review-summary-number approved">
            <span>●</span>
            <strong>
              {approvedCount}
            </strong>
          </div>

        </div>

      </header>


      {/* =====================================
          TABS
      ====================================== */}

      <div className="review-tabs">

        <button
          type="button"
          className={
            activeTab === "submitted"
              ? "review-tab active"
              : "review-tab"
          }
          onClick={() =>
            setActiveTab("submitted")
          }
        >
          Submitted
        </button>

        <button
          type="button"
          className={
            activeTab === "changes"
              ? "review-tab active"
              : "review-tab"
          }
          onClick={() =>
            setActiveTab("changes")
          }
        >
          Needs Changes
        </button>

        <button
          type="button"
          className={
            activeTab === "approved"
              ? "review-tab active"
              : "review-tab"
          }
          onClick={() =>
            setActiveTab("approved")
          }
        >
          Approved
        </button>

      </div>


      {/* =====================================
          COUNTS
      ====================================== */}

      <div className="review-count-bar">

        <span>
          Submitted:{" "}
          <strong>
            {submittedCount}
          </strong>
        </span>

        <span>
          Needs Changes:{" "}
          <strong>
            {changesCount}
          </strong>
        </span>

        <span>
          Approved:{" "}
          <strong>
            {approvedCount}
          </strong>
        </span>

      </div>


      {/* =====================================
          TOOLBAR
      ====================================== */}

      <div className="review-toolbar">

        <button
          type="button"
          className="review-filter-button"
        >
          Filter
        </button>

        <button
          type="button"
          className="review-program-button"
          onClick={changeProgram}
        >
          <span>
            {selectedProgram}
          </span>

          <ChevronDown size={14} />
        </button>

        <div className="review-search">

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

        <button
          type="button"
          className="review-refresh"
          onClick={handleRefresh}
          aria-label="Refresh"
        >
          <Renew size={16} />
        </button>

      </div>


      {/* =====================================
          TABLE
      ====================================== */}

      <div className="review-table-wrapper">

        <table className="review-table">

          <thead>

            <tr>

              <th className="review-arrow">
              </th>

              <th>
                Module Name
              </th>

              <th>
                Approver
              </th>

              <th>
                Category
              </th>

              <th>
                Status
              </th>

              <th>
                Publish Date
              </th>

              <th className="review-menu-heading">
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredModules.map(
              (module) => {

                const expanded =
                  expandedRow ===
                  module.id;

                const menuOpen =
                  openMenu ===
                  module.id;

                return (
                  <>
                    {/* MAIN ROW */}

                    <tr
                      key={module.id}
                      className={
                        expanded
                          ? "review-row expanded"
                          : "review-row"
                      }
                    >

                      <td className="review-arrow">

                        <button
                          type="button"
                          onClick={() =>
                            toggleRow(
                              module.id
                            )
                          }
                        >
                          {expanded ? (
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

                      <td>

                        <button
                          type="button"
                          className="review-module-name"
                          onClick={() =>
                            toggleRow(
                              module.id
                            )
                          }
                        >
                          {module.name}
                        </button>

                      </td>

                      <td>
                        {module.author}
                      </td>

                      <td>
                        {module.category}
                      </td>

                      <td>

                        <div
                          className={`review-status ${getStatusClass(
                            module.status
                          )}`}
                        >

                          <span>
                            {getStatusIcon(
                              module.status
                            )}
                          </span>

                          <span>
                            {module.status}
                          </span>

                        </div>

                      </td>

                      <td>
                        {module.date}
                      </td>

                      <td className="review-menu-cell">

                        <button
                          type="button"
                          className="review-menu-button"
                          onClick={() =>
                            setOpenMenu(
                              menuOpen
                                ? null
                                : module.id
                            )
                          }
                        >
                          <OverflowMenuVertical
                            size={16}
                          />
                        </button>

                        {menuOpen && (

                          <div className="review-action-menu">

                            <button
                              type="button"
                              onClick={() =>
                                openReviewDrawer(
                                  module
                                )
                              }
                            >
                              Review
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenu(
                                  null
                                );

                                toggleRow(
                                  module.id
                                );
                              }}
                            >
                              View module
                            </button>

                          </div>

                        )}

                      </td>

                    </tr>


                    {/* EXPANDED ROW */}

                    {expanded && (

                      <tr
                        key={`${module.id}-expanded`}
                        className="review-expanded-row"
                      >

                        <td></td>

                        <td colSpan="6">

                          <div className="review-expanded-content">

                            <strong>
                              Review Details
                            </strong>

                            <p>
                              This module is
                              currently in the{" "}
                              <strong>
                                {module.status}
                              </strong>{" "}
                              state and is
                              awaiting the
                              appropriate review
                              action.
                            </p>

                          </div>

                        </td>

                      </tr>

                    )}

                  </>
                );
              }
            )}

          </tbody>

        </table>


        {filteredModules.length === 0 && (

          <div className="review-empty">
            No modules found
          </div>

        )}

      </div>


      {/* =====================================
          REVIEW DRAWER
      ====================================== */}

      {reviewingModule && (

        <>

          <div
            className="review-drawer-backdrop"
            onClick={() =>
              setReviewingModule(null)
            }
          />

          <aside className="review-drawer">

            <div className="review-drawer-header">

              <div>

                <h2>
                  Review Module
                </h2>

                <p>
                  Review the submitted
                  module before making
                  a decision.
                </p>

              </div>

              <button
                type="button"
                className="review-drawer-close"
                onClick={() =>
                  setReviewingModule(null)
                }
              >
                ×
              </button>

            </div>


            <div className="review-drawer-content">

              <div className="review-detail-section">

                <span className="review-detail-label">
                  Module Name
                </span>

                <strong>
                  {reviewingModule.name}
                </strong>

              </div>

              <div className="review-detail-section">

                <span className="review-detail-label">
                  Author
                </span>

                <strong>
                  {reviewingModule.author}
                </strong>

              </div>

              <div className="review-detail-section">

                <span className="review-detail-label">
                  Category
                </span>

                <strong>
                  {reviewingModule.category}
                </strong>

              </div>

              <div className="review-detail-section">

                <span className="review-detail-label">
                  Current Status
                </span>

                <div
                  className={`review-status ${getStatusClass(
                    reviewingModule.status
                  )}`}
                >
                  <span>
                    {getStatusIcon(
                      reviewingModule.status
                    )}
                  </span>

                  <span>
                    {reviewingModule.status}
                  </span>
                </div>

              </div>

              <div className="review-detail-section review-description">

                <span className="review-detail-label">
                  Review Notes
                </span>

                <p>
                  Please review the
                  module content,
                  summary, category,
                  and target group
                  before approving
                  this submission.
                </p>

              </div>

            </div>


            <div className="review-drawer-footer">

              <button
                type="button"
                className="request-changes-button"
                onClick={() =>
                  updateReviewStatus(
                    reviewingModule.id,
                    "Needs Changes"
                  )
                }
              >
                Request Changes
              </button>

              <button
                type="button"
                className="approve-button"
                onClick={() =>
                  updateReviewStatus(
                    reviewingModule.id,
                    "Approved"
                  )
                }
              >
                Approve
              </button>

            </div>

          </aside>

        </>

      )}

    </main>
  );
}