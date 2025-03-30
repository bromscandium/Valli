import React from "react"
import Header from "../../components/Header/Header.jsx"
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import "./AllProjects.sass"
import { projectsData } from "../../mock/ProjectsData.js"

function AllProjects() {
    return (
        <div className="all-projects">
            <Header/>
            <div className="scroll-content">
                <h4 className="section-title">Your Projects</h4>
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default AllProjects