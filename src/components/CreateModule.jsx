import { useEffect, useState } from "react";

import "./CreateModule.css";

export default function CreateModule({
  onClose,
  onCreate,
  editingModule = null,
}) {

  const [moduleName, setModuleName] =
    useState("");

  const [program, setProgram] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [targetGroup, setTargetGroup] =
    useState("");

  const [serviceComponent, setServiceComponent] =
    useState("");

  const [summary, setSummary] =
    useState("");

  const [tags, setTags] =
    useState("");


  /* =====================================================
     LOAD EDITING MODULE
  ===================================================== */

  useEffect(() => {

    if (editingModule) {

      setModuleName(
        editingModule.name || ""
      );

      setProgram(
        editingModule.program || ""
      );

      setCategory(
        editingModule.category || ""
      );

      setTargetGroup(
        editingModule.targetGroup || ""
      );

      setServiceComponent(
        editingModule.serviceComponent || ""
      );

      setSummary(
        editingModule.summary || ""
      );

      setTags(
        Array.isArray(editingModule.tags)
          ? editingModule.tags.join(", ")
          : editingModule.tags || ""
      );

    } else {

      setModuleName("");
      setProgram("");
      setCategory("");
      setTargetGroup("");
      setServiceComponent("");
      setSummary("");
      setTags("");

    }

  }, [editingModule]);


  /* =====================================================
     CONVERT TAGS
  ===================================================== */

  const getTags = () => {

    if (!tags.trim()) {
      return [];
    }

    return tags
      .split(",")
      .map((tag) =>
        tag.trim()
      )
      .filter(Boolean);
  };


  /* =====================================================
     CREATE / UPDATE
  ===================================================== */

  const handleCreate = () => {

    if (
      !moduleName.trim() ||
      !program ||
      !category ||
      !targetGroup ||
      !serviceComponent
    ) {
      return;
    }


    const updatedModule = {

      ...(editingModule || {}),

      id:
        editingModule?.id ||
        Date.now(),

      name:
        moduleName.trim(),

      author:
        editingModule?.author ||
        "Saranya Loganathan",

      serviceComponent,

      program,

      status:
        editingModule?.status ||
        "Active",

      date:
        editingModule?.date ||
        "Today",

      category,

      targetGroup,

      summary:
        summary.trim() ||
        "Supports emotional, social, and psychological wellbeing in children. Focuses on healthy growth and positive development.",

      tags:
        getTags(),

    };


    if (onCreate) {
      onCreate(updatedModule);
    }

  };


  /* =====================================================
     SAVE DRAFT
  ===================================================== */

  const handleSaveDraft = () => {

    if (!moduleName.trim()) {
      return;
    }


    const draftModule = {

      ...(editingModule || {}),

      id:
        editingModule?.id ||
        Date.now(),

      name:
        moduleName.trim(),

      author:
        editingModule?.author ||
        "Saranya Loganathan",

      serviceComponent:
        serviceComponent ||
        "Workshop",

      program:
        program ||
        "Mind Matters",

      status:
        "Draft",

      date:
        editingModule?.date ||
        "Today",

      category:
        category ||
        "CBSE",

      targetGroup:
        targetGroup ||
        "12th Grade",

      summary:
        summary.trim() ||
        "Draft module.",

      tags:
        getTags(),

    };


    if (onCreate) {
      onCreate(draftModule);
    }

  };


  /* =====================================================
     VALIDATION
  ===================================================== */

  const canCreate =
    moduleName.trim() &&
    program &&
    category &&
    targetGroup &&
    serviceComponent;


  return (
    <>

      {/* BACKDROP */}

      <div
        className="create-module-backdrop"
        onClick={onClose}
      />


      {/* DRAWER */}

      <aside className="create-module-drawer">

        {/* HEADER */}

        <div className="create-module-header">

          <h2>
            {editingModule
              ? "Edit Module"
              : "Add Modules"}
          </h2>

          <button
            type="button"
            className="create-module-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* CONTENT */}

        <div className="create-module-content">

          <p className="create-module-description">
            Create a new module with its
            details, content, and
            configuration settings.
          </p>


          <h3 className="create-section-title">
            Details
          </h3>


          {/* MODULE NAME */}

          <label>
            Module Name
          </label>

          <input
            className="create-input"
            type="text"
            placeholder="Enter module name"
            value={moduleName}
            onChange={(event) =>
              setModuleName(
                event.target.value
              )
            }
          />


          {/* PROGRAM */}

          <label>
            Program
          </label>

          <select
            className="create-select"
            value={program}
            onChange={(event) =>
              setProgram(
                event.target.value
              )
            }
          >

            <option value="">
              Select Program
            </option>

            <option value="Mind Matters">
              Mind Matters
            </option>

            <option value="Mind Matters Jr.">
              Mind Matters Jr.
            </option>

          </select>


          {/* CATEGORY */}

          <label>
            Category
          </label>

          <select
            className="create-select"
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
          >

            <option value="">
              Select Category
            </option>

            <option value="CBSE">
              CBSE
            </option>

            <option value="ICSE">
              ICSE
            </option>

          </select>


          {/* TARGET GROUP */}

          <label>
            Target group
          </label>

          <select
            className="create-select"
            value={targetGroup}
            onChange={(event) =>
              setTargetGroup(
                event.target.value
              )
            }
          >

            <option value="">
              Select a group
            </option>

            <option value="12th Grade">
              12th Grade
            </option>

            <option value="11th Grade">
              11th Grade
            </option>

            <option value="College Students">
              College Students
            </option>

          </select>


          {/* SERVICE COMPONENT */}

          <label>
            Service Component
          </label>

          <select
            className="create-select"
            value={serviceComponent}
            onChange={(event) =>
              setServiceComponent(
                event.target.value
              )
            }
          >

            <option value="">
              Select Service Component
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Counselling">
              Counselling
            </option>

            <option value="Activity">
              Activity
            </option>

          </select>


          {/* SUMMARY */}

          <div className="summary-label-row">

            <label>
              Quick Summary
            </label>

            <span>
              {summary.length}/100
            </span>

          </div>


          <textarea
            className="create-textarea"
            maxLength={100}
            placeholder="Add a short overview of the module purpose"
            value={summary}
            onChange={(event) =>
              setSummary(
                event.target.value
              )
            }
          />


          <p className="summary-help">
            Add a rough idea. Zendy AI can
            refine it.
          </p>


          {/* TAGS */}

          <label>
            Tags (Optional)
          </label>

          <input
            className="create-input"
            type="text"
            placeholder="Add tags separated by commas"
            value={tags}
            onChange={(event) =>
              setTags(
                event.target.value
              )
            }
          />

        </div>


        {/* FOOTER */}

        <div className="create-module-footer">

          <button
            type="button"
            className="save-draft-button"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>


          <button
            type="button"
            className="create-open-button"
            disabled={!canCreate}
            onClick={handleCreate}
          >
            {editingModule
              ? "Save Changes"
              : "Create and Open"}
          </button>

        </div>

      </aside>

    </>
  );
}