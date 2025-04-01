import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import AllProjects from './pages/AllProjects/AllProjects.jsx';
import Project from './pages/Project/Project.jsx';
import CreateProject from './pages/CreateProject/CreateProject.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Community from './pages/Community/Community.jsx';
import Chat from './pages/Chat/Chat';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/projects" element={<AllProjects/>}/>
                <Route path="/projects/create" element={<CreateProject/>}/>
                <Route path="/projects/:id" element={<Project/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/community" element={<Community/>}/>
                <Route path="/chat" element={<Chat/>}/>
            </Routes>
        </Router>
    );
}

export default App;
