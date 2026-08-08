import { useState } from "react";
import {
  Close,
  ChevronDown,
  ChevronRight,
} from "@carbon/icons-react";

import "./ModuleDetails.css";

export default function ModuleDetails({
  module,
  onClose,
}) {
  const [openSection, setOpenSection] =
    useState("facilitator");

  if (!module) {
    return null;
  }

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  return (
    <aside className="module-details">

      {/* HEADER */}

      <div className="module-details-header">

        <h2>{module.name}</h2>

        <button
          type="button"
          className="module-details-close"
          onClick={onClose}
          aria-label="Close"
        >
          <Close size={20} />
        </button>

      </div>


      {/* CONTENT */}

      <div className="module-details-content">

        {/* SUMMARY */}

        <section className="details-summary-section">

          <div className="details-section-title">

            <span>
              Summary
            </span>

            <span className="details-ai-badge">
              AI
            </span>

          </div>

          <p className="details-summary">
            This session, designed for college
            students facing transitions, focuses
            on understanding and embracing change
            psychologically and emotionally.
            Learners engage in interactive
            activities like “Switch Sides” and
            “The Unfold Game” to explore fears,
            strengths, and opportunities in change.
            The Adaptation Curve framework
            normalizes emotional stages, helping
            students reframe fear and uncertainty.
            Teamwork in the “Bridge Builders”
            activity fosters collaboration and
            peer support during transitions.
            Mindfulness techniques enhance
            emotional regulation and focus.
            Reflection and closure activities
            consolidate insights, resilience,
            and actionable steps for personal
            growth.
          </p>

        </section>


        {/* MODULE ACCORDION */}

        <section className="details-accordion">

          <button
            type="button"
            className="details-accordion-button"
            onClick={() =>
              toggleSection("module")
            }
          >

            {openSection === "module" ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}

            <span>
              Module
            </span>

          </button>


          {openSection === "module" && (

            <div className="details-accordion-content">

              <div className="detail-row">

                <span>
                  Category
                </span>

                <strong>
                  {module.category}
                </strong>

              </div>


              <div className="detail-row">

                <span>
                  Target Group
                </span>

                <strong>
                  {module.targetGroup}
                </strong>

              </div>


              <div className="detail-row">

                <span>
                  Service Component
                </span>

                <strong>
                  {module.serviceComponent}
                </strong>

              </div>


              <div className="detail-row">

                <span>
                  Program
                </span>

                <strong>
                  {module.program}
                </strong>

              </div>

            </div>

          )}

        </section>


        {/* FACILITATOR GUIDE */}

        <section className="details-accordion">

          <button
            type="button"
            className="details-accordion-button"
            onClick={() =>
              toggleSection("facilitator")
            }
          >

            {openSection === "facilitator" ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}

            <span>
              Facilitator guide
            </span>

          </button>


          {openSection === "facilitator" && (

            <div className="details-accordion-content facilitator-content">

              <ul>

                <li>
                  Helps participants understand
                  and embrace change by identifying
                  fears, strengths, support systems,
                  and opportunities.
                </li>

                <li>
                  Uses interactive activities,
                  self-reflection, team
                  collaboration, and grounding
                  techniques to build
                  self-awareness and resilience.
                </li>

                <li>
                  Encourages participants to take
                  meaningful actions and confidently
                  navigate transitions with
                  mindfulness and support.
                </li>

              </ul>

            </div>

          )}

        </section>

      </div>

    </aside>
  );
}