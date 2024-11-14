const Toolbar = () => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="d-flex flex-wrap">
        <button type="button" className="btn btn-outline-primary me-2 mb-2">
          <i className="bi bi-lock-fill me-1"></i>Block
        </button>
        <button type="button" className="btn btn-outline-primary me-2 mb-2">
          <i className="bi bi-unlock-fill"></i>
        </button>
        <button type="button" className="btn btn-outline-danger mb-2">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
      <div className="d-flex flex-wrap">
        <input type="text" className="form-control mb-2" placeholder="Filter" />
      </div>
    </div>
  )
}

export default Toolbar;
