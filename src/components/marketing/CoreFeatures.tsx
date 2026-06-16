export function CoreFeatures() {
  return (
    <div className="c1-container">
      <span className="c1-badge">Core Features</span>
      <h2 className="c1-title">Built for Speed & Quality</h2>
      <p className="c1-subtitle">
        Everything you need to go<br />from idea to image
      </p>

      <div className="c1-grid">
        {/* Card 1 — Smart Prompt Suggestions */}
        <div className="c1-card c1-card-1">
          <div className="c1-prompt-box">
            A bright, high-resolution 3D illustration of a{' '}
            <strong className="c1-blur-text">cheerful cartoon</strong> of a{' '}
            <strong className="c1-blur-text">girl character</strong>{' '}
            <strong className="c1-blur-text">centred against a</strong>{' '}
            smooth blue background
          </div>
          <div className="c1-pill">
            <span className="c1-pill-star">✦</span>
            Add more details
          </div>
          <svg className="c1-cursor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M4 2L20 11L11 13L9 22L4 2Z" fill="#0f172a" stroke="white" strokeWidth="1" />
          </svg>
          <h3>Smart Prompt Suggestions</h3>
        </div>

        {/* Card 2 — API Access */}
        <div className="c1-card c1-card-2">
          <div className="c1-api-visual">
            <img
              className="c1-network-img"
              src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg"
              alt="API Network"
            />
          </div>
          <h3>API Access</h3>
        </div>

        {/* Card 3 — Project Library */}
        <div className="c1-card c1-card-3">
          <div className="c1-mesh" />
          <img
            className="c1-folder"
            src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg"
            alt="Library"
          />
          <div className="c1-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Search in library
          </div>
          <h3>Project Library</h3>
        </div>
      </div>
    </div>
  )
}
