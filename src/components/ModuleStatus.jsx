import "./ModuleStatus.css";

export default function ModuleStatus() {
  return (
    <div className="module-status">

      <span>
        Live Modules:{" "}
        <strong>1</strong>
      </span>

      <span className="separator">
        |
      </span>

      <span>
        Draft modules:{" "}
        <strong>2</strong>
      </span>

    </div>
  );
}