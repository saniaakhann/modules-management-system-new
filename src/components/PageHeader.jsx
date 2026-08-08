import "./PageHeader.css";

export default function PageHeader({ onReviewQueue, onCreateModule }) {
  return (
    <section className="page-header">

      <h1 className="page-title">
        Modules
      </h1>

      <div className="page-header-actions">

        <button
          type="button"
          className="review-button"
          onClick={onReviewQueue}
        >
          Review Queue
        </button>

        <button
          type="button"
          className="create-button"
          onClick={onCreateModule}
        >
          <span>Create Modules</span>

          <span className="create-plus">
            +
          </span>
        </button>

      </div>

    </section>
  );
}