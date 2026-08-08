import { useState } from "react";
import "./Navbar.css";

const menuIcon =
  "https://www.figma.com/api/mcp/asset/db6343c7-7ae6-426b-8490-eab93cdf0815.svg";

const searchIcon =
  "https://www.figma.com/api/mcp/asset/9ba575b1-1a61-46af-8eb2-216814b47b4b.svg";

const divider =
  "https://www.figma.com/api/mcp/asset/cebb8949-74a7-440f-9154-18ded29cd48c.svg";

const campusChevron =
  "https://www.figma.com/api/mcp/asset/38a63067-6246-41e1-9a31-f4842112af26.svg";

const helpIcon =
  "https://www.figma.com/api/mcp/asset/21b6bf8d-af5c-4fee-926b-bbc75c4577cb.svg";

const terminalIcon =
  "https://www.figma.com/api/mcp/asset/14e28c1e-07ee-4420-98d7-aac13b00d1c4.svg";

const feedbackIcon =
  "https://www.figma.com/api/mcp/asset/f3b98e93-239a-4488-95e1-a3ccb1893139.svg";

const calculatorIcon =
  "https://www.figma.com/api/mcp/asset/c0289fdf-8ee4-456d-adf3-49a0d6575e99.png";

const notificationIcon =
  "https://www.figma.com/api/mcp/asset/c6928a17-c76f-4f73-8544-a3c52eebd502.svg";

const userIcon =
  "https://www.figma.com/api/mcp/asset/53a31255-ed4e-467c-b298-c540a3bc7595.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [campusOpen, setCampusOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] =
    useState("Select Campus");

  const [profileOpen, setProfileOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [helpOpen, setHelpOpen] = useState(false);

  const campuses = [
    "GTBIT",
    "Delhi Campus",
    "Main Campus",
  ];

  const closeDropdowns = () => {
    setCampusOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
    setHelpOpen(false);
  };

  const handleCampusClick = () => {
    setCampusOpen((current) => !current);
    setProfileOpen(false);
    setNotificationsOpen(false);
    setHelpOpen(false);
  };

  const handleCampusSelect = (campus) => {
    setSelectedCampus(campus);
    setCampusOpen(false);
  };

  const handleProfileClick = () => {
    setProfileOpen((current) => !current);
    setCampusOpen(false);
    setNotificationsOpen(false);
    setHelpOpen(false);
  };

  const handleNotificationClick = () => {
    setNotificationsOpen((current) => !current);
    setCampusOpen(false);
    setProfileOpen(false);
    setHelpOpen(false);
  };

  const handleHelpClick = () => {
    setHelpOpen((current) => !current);
    setCampusOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
  };

  return (
    <>
      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="navbar">

        {/* MENU */}

        <div className="menu-wrapper">
          <button
            type="button"
            className="menu-button"
            aria-label="Menu"
            onClick={() => {
              setMenuOpen((current) => !current);
              closeDropdowns();
            }}
          >
            <img src={menuIcon} alt="" />
          </button>
        </div>

        {/* SITE NAME */}

        <div className="site-name">
          Self Talk Psychologist
        </div>

        {/* SEARCH */}

        <div
          className={
            searchOpen
              ? "search-box search-active"
              : "search-box"
          }
        >
          {searchOpen ? (
            <input
              autoFocus
              type="text"
              className="navbar-search-input"
              placeholder="Search resources and products"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          ) : (
            <button
              type="button"
              className="search-placeholder"
              onClick={() => {
                closeDropdowns();
                setSearchOpen(true);
              }}
            >
              Search resources and products
            </button>
          )}

          <button
            type="button"
            className="search-icon-button"
            aria-label="Search"
            onClick={() => {
              closeDropdowns();
              setSearchOpen(true);
            }}
          >
            <img src={searchIcon} alt="" />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="navigation">

          {/* DIVIDER */}

          <div className="navigation-divider">
            <img src={divider} alt="" />
          </div>

          {/* CATALOG */}

          <button
            type="button"
            className="nav-item"
            onClick={() => {
              closeDropdowns();
            }}
          >
            Catalog
          </button>

          {/* CAMPUS */}

          <div className="navbar-dropdown-wrapper">
            <button
              type="button"
              className="nav-item campus-item"
              onClick={handleCampusClick}
            >
              <span>{selectedCampus}</span>

              <img
                src={campusChevron}
                alt=""
              />
            </button>

            {campusOpen && (
              <div className="navbar-dropdown campus-dropdown">
                {campuses.map((campus) => (
                  <button
                    key={campus}
                    type="button"
                    onClick={() =>
                      handleCampusSelect(campus)
                    }
                  >
                    {campus}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PROFILE */}

          <div className="navbar-dropdown-wrapper">
            <button
              type="button"
              className="nav-item"
              onClick={handleProfileClick}
            >
              Dr. B Ramesh
            </button>

            {profileOpen && (
              <div className="navbar-dropdown profile-dropdown">

                <div className="profile-name">
                  Dr. B Ramesh
                </div>

                <div className="profile-role">
                  Psychologist
                </div>

                <button type="button">
                  View Profile
                </button>

                <button type="button">
                  Settings
                </button>

                <button type="button">
                  Sign out
                </button>

              </div>
            )}
          </div>
        </nav>

        {/* FLEXIBLE SPACE */}

        <div className="navbar-spacer" />

        {/* RIGHT ACTIONS */}

        <div className="navbar-actions">

          {/* HELP */}

          <div className="navbar-action-wrapper">
            <button
              type="button"
              aria-label="Help"
              onClick={handleHelpClick}
            >
              <img src={helpIcon} alt="" />
            </button>

            {helpOpen && (
              <div className="navbar-popup help-popup">
                <strong>Help</strong>

                <p>
                  Need help using the
                  application?
                </p>

                <button type="button">
                  Open Help Center
                </button>
              </div>
            )}
          </div>

          {/* TERMINAL */}

          <button
            type="button"
            aria-label="Terminal"
          >
            <img
              src={terminalIcon}
              alt=""
            />
          </button>

          {/* FEEDBACK */}

          <button
            type="button"
            aria-label="Feedback"
          >
            <img
              src={feedbackIcon}
              alt=""
            />
          </button>

          {/* CALCULATOR */}

          <button
            type="button"
            aria-label="Calculator"
          >
            <img
              src={calculatorIcon}
              alt=""
            />
          </button>

          {/* NOTIFICATIONS */}

          <div className="navbar-action-wrapper">
            <button
              type="button"
              aria-label="Notifications"
              onClick={handleNotificationClick}
            >
              <img
                src={notificationIcon}
                alt=""
              />
            </button>

            {notificationsOpen && (
              <div className="navbar-popup notification-popup">

                <strong>
                  Notifications
                </strong>

                <p>
                  No new notifications.
                </p>

              </div>
            )}
          </div>

          {/* USER */}

          <div className="navbar-action-wrapper">
            <button
              type="button"
              aria-label="User"
              onClick={handleProfileClick}
            >
              <img
                src={userIcon}
                alt=""
              />
            </button>
          </div>

        </div>
      </header>

      {/* =====================================
          SIDE MENU
      ====================================== */}

      {menuOpen && (
        <>
          <div
            className="navbar-menu-backdrop"
            onClick={() =>
              setMenuOpen(false)
            }
          />

          <aside className="navbar-side-menu">

            <div className="side-menu-header">
              <strong>
                Self Talk Psychologist
              </strong>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                ×
              </button>
            </div>

            <button type="button">
              Modules
            </button>

            <button type="button">
              Dashboard
            </button>

            <button type="button">
              Resources
            </button>

            <button type="button">
              Settings
            </button>

          </aside>
        </>
      )}
    </>
  );
}