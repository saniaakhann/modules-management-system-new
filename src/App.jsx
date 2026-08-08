import { useState } from "react";

import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import PageHeader from "./components/PageHeader";
import Tabs from "./components/Tabs";
import ModuleStatus from "./components/ModuleStatus";
import ModuleToolbar from "./components/ModuleToolbar";
import ModuleTable, {
  initialModules,
} from "./components/ModuleTable";
import ModuleDetails from "./components/ModuleDetails";
import CreateModule from "./components/CreateModule";
import ReviewQueue from "./components/ReviewQueue";

function App() {

  /* =========================================
     CURRENT PAGE
  ========================================= */

  const [currentPage, setCurrentPage] =
    useState("modules");


  /* =========================================
     MODULE DATA
  ========================================= */

  const [moduleList, setModuleList] =
    useState(initialModules);


  /* =========================================
     TAB
  ========================================= */

  const [activeTab, setActiveTab] =
    useState("all");


  /* =========================================
     SEARCH
  ========================================= */

  const [searchTerm, setSearchTerm] =
    useState("");


  /* =========================================
     PROGRAM FILTER
  ========================================= */

  const [selectedProgram, setSelectedProgram] =
    useState("All Programs");


  /* =========================================
     FILTER SIDEBAR
  ========================================= */

  const [showFilters, setShowFilters] =
    useState(false);


  /* =========================================
     FILTERS
  ========================================= */

  const [
    selectedCollaborators,
    setSelectedCollaborators,
  ] = useState([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState([]);

  const [
    selectedTags,
    setSelectedTags,
  ] = useState([]);

  const [createdOn, setCreatedOn] =
    useState("Any time");


  /* =========================================
     DETAILS DRAWER
  ========================================= */

  const [selectedModule, setSelectedModule] =
    useState(null);


  /* =========================================
     CREATE MODULE DRAWER
  ========================================= */

  const [showCreateModule, setShowCreateModule] =
    useState(false);


  /* =========================================
     EDIT MODULE
  ========================================= */

  const [editingModule, setEditingModule] =
    useState(null);


  /* =========================================
     RESET FILTERS
  ========================================= */

  const resetFilters = () => {

    setSelectedCollaborators([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setCreatedOn("Any time");

  };


  /* =========================================
     OPEN CREATE DRAWER
  ========================================= */

  const handleOpenCreateModule = () => {

    setEditingModule(null);

    setSelectedModule(null);

    setShowCreateModule(true);

  };


  /* =========================================
     OPEN EDIT DRAWER
  ========================================= */

  const handleEditModule = (module) => {

    /*
      Close the details drawer first.
    */

    setSelectedModule(null);

    /*
      Store the module being edited.
    */

    setEditingModule(module);

    /*
      Open the same drawer used
      for creating modules.
    */

    setShowCreateModule(true);

  };


  /* =========================================
     CREATE / UPDATE MODULE
  ========================================= */

  const handleCreateModule = (module) => {

    setModuleList((current) => {

      /*
        If the module already exists,
        update it.

        Otherwise create a new row.
      */

      const exists = current.some(
        (item) =>
          item.id === module.id
      );


      if (exists) {

        return current.map((item) =>
          item.id === module.id
            ? module
            : item
        );

      }


      return [
        ...current,
        module,
      ];

    });


    /* CLOSE DRAWER */

    setShowCreateModule(false);


    /* CLEAR EDIT MODE */

    setEditingModule(null);


    /* SHOW ALL MODULES */

    setActiveTab("all");

  };


  /* =========================================
     CLOSE CREATE / EDIT DRAWER
  ========================================= */

  const handleCloseCreateModule = () => {

    setShowCreateModule(false);

    setEditingModule(null);

  };


  /* =========================================
     REFRESH
  ========================================= */

  const handleRefresh = () => {

    setModuleList(initialModules);

    setSearchTerm("");

    setSelectedProgram(
      "All Programs"
    );

    resetFilters();

    setSelectedModule(null);

    setEditingModule(null);

  };


  /* =========================================
     REVIEW QUEUE
  ========================================= */

  if (currentPage === "review") {

    return (
      <>
        <ReviewQueue
          onBack={() =>
            setCurrentPage("modules")
          }
        />
      </>
    );

  }


  /* =========================================
     MODULES PAGE
  ========================================= */

  return (
    <>

      {/* =====================================
          NAVBAR
      ===================================== */}

      <Navbar />


      {/* =====================================
          BREADCRUMB
      ===================================== */}

      <Breadcrumb />


      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <PageHeader

        onCreateModule={
          handleOpenCreateModule
        }

        onReviewQueue={() =>
          setCurrentPage("review")
        }

      />


      {/* =====================================
          TABS
      ===================================== */}

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      {/* =====================================
          STATUS
      ===================================== */}

      <ModuleStatus />


      {/* =====================================
          TOOLBAR
      ===================================== */}

      <ModuleToolbar

        searchTerm={
          searchTerm
        }

        setSearchTerm={
          setSearchTerm
        }

        selectedProgram={
          selectedProgram
        }

        setSelectedProgram={
          setSelectedProgram
        }

        showFilters={
          showFilters
        }

        setShowFilters={
          setShowFilters
        }

        onRefresh={
          handleRefresh
        }

      />


      {/* =====================================
          MODULE TABLE
      ===================================== */}

      <ModuleTable

        moduleList={
          moduleList
        }

        setModuleList={
          setModuleList
        }

        activeTab={
          activeTab
        }

        searchTerm={
          searchTerm
        }

        selectedProgram={
          selectedProgram
        }

        showFilters={
          showFilters
        }

        setShowFilters={
          setShowFilters
        }

        selectedCollaborators={
          selectedCollaborators
        }

        setSelectedCollaborators={
          setSelectedCollaborators
        }

        selectedCategories={
          selectedCategories
        }

        setSelectedCategories={
          setSelectedCategories
        }

        selectedTags={
          selectedTags
        }

        setSelectedTags={
          setSelectedTags
        }

        createdOn={
          createdOn
        }

        setCreatedOn={
          setCreatedOn
        }

        resetFilters={
          resetFilters
        }

        /* NORMAL CLICK = DETAILS */

        onModuleSelect={
          setSelectedModule
        }

        /* EDIT CLICK = EDIT DRAWER */

        onEditModule={
          handleEditModule
        }

      />


      {/* =====================================
          DETAILS DRAWER
      ===================================== */}

      <ModuleDetails

        module={
          selectedModule
        }

        onClose={() =>
          setSelectedModule(null)
        }

      />


      {/* =====================================
          CREATE / EDIT DRAWER
      ===================================== */}

      {showCreateModule && (

        <CreateModule

          onClose={
            handleCloseCreateModule
          }

          editingModule={
            editingModule
          }

          onCreate={
            handleCreateModule
          }

        />

      )}

    </>
  );
}


export default App;