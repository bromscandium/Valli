import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import shareIcon from "/share.png"
import "./Panel.sass"

const Panel = ({id, public: initialPublic}) => {
    const navigate = useNavigate()
    const [isPublic, setIsPublic] = useState(initialPublic)

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/project/${id}`
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Project URL copied!")
        })
    }

    return (
        <section className="panel">
            <button className="back-btn" onClick={() => navigate(-1)}>
                Back
            </button>

            <div className="actions">
                <button
                    className={`privacy-toggle ${isPublic ? "public" : "private"}`}
                    onClick={() => setIsPublic(prev => !prev)}
                >
                    <div className="toggle-circle"/>
                    <span className="privacy-text">{isPublic ? "Public" : "Private"}</span>
                </button>

                <button className="share-btn" onClick={handleShare}>
                    <img src={shareIcon} alt="Share Project"/>
                </button>
            </div>
        </section>
    )
}

export default Panel
