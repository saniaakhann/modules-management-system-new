import "./Breadcrumb.css";

export default function Breadcrumb() {
  return (
    <div className="breadcrumb-section">
      <div className="breadcrumb">

        <span className="breadcrumb-link">
          Bread Crumb
        </span>

        <span className="breadcrumb-separator">
          /
        </span>

        <span className="breadcrumb-link">
          Bread Crumb
        </span>

        <span className="breadcrumb-separator">
          /
        </span>

        <span className="breadcrumb-link">
          Bread Crumb
        </span>

        <span className="breadcrumb-separator">
          /
        </span>

        <span className="breadcrumb-current">
          Modules
        </span>

        <span className="breadcrumb-separator">
          /
        </span>

      </div>
    </div>
  );
}