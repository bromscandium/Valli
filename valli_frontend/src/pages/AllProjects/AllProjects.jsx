import React from "react"
import Header from "../../components/Header/Header.jsx"
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import "./AllProjects.sass"
import { fetchProjects } from "../../mock/ProjectsData.js"

function AllProjects() {
    // Fetch project data from mock data
    const projectsData = fetchProjects()
  return (
    <div className="all-projects">
      <Header />

      <div className="scroll-content">
        <h4 className="section-title">Your Projects</h4>
        {projectsData.map((project) => {
          const {
            id,
            overviewData: {
              name,
              status,
              location,
              newInsights,
              lastUpdated,
            },
            healthMetricsData: {
              waterNeeds,
              frostRisk,
              soilHealth,
            },
          } = project

          return (
            <ProjectCard
              key={id}
              id={id}
              name={name}
              status={status}
              location={location}
              newInsights={newInsights}
              lastUpdated={lastUpdated}
              waterNeeds={waterNeeds}
              frostRisk={frostRisk}
              soilHealth={soilHealth}
            />
          )
        })}
      </div>

      {/* Floating circular button */}
      <button
        className="create-project-btn"
        onClick={() => window.location.href = "/projects/create"}
      >
        +
      </button>

      <Footer />
    </div>
  )
}

export default AllProjects
