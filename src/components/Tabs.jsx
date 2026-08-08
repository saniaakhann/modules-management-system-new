import "./Tabs.css";

export default function Tabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="tabs-container">

      {/* All Modules */}

      <button
        type="button"
        className={`tab ${
          activeTab === "all"
            ? "active-tab"
            : ""
        }`}
        onClick={() =>
          setActiveTab("all")
        }
      >
        All Modules
      </button>


      {/* My Modules */}

      <button
        type="button"
        className={`tab ${
          activeTab === "mine"
            ? "active-tab"
            : ""
        }`}
        onClick={() =>
          setActiveTab("mine")
        }
      >
        My Modules
      </button>

    </div>
  );
}