import React from "react"
import Header from "../../components/Header/Header.jsx"
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import "./AllProjects.sass"
import { allProjectData } from "../../mock/AllProjectData.js"

function AllProjects() {
    return (
        <div className="projects-page">
            <Header />
            <div className="scroll-area">
                <h2 className="page-title">All Projects</h2>
                {allProjectData.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default AllProjects
