import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import AllProjects from "./pages/AllProjects/AllProjects.jsx";
import Project from "./pages/Project/Project.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Community from "./pages/Community/Community.jsx";
import Chat from "./pages/Chat/Chat";
import PageWrapper from "./components/PageWrapper";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <Home />
                            </PageWrapper>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <Login />
                            </PageWrapper>
                        </>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <AllProjects />
                            </PageWrapper>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/projects/:id"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <Project />
                            </PageWrapper>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <Profile />
                            </PageWrapper>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/community"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <Community />
                            </PageWrapper>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <>
                            <Header />
                            <PageWrapper>
                                <Chat />
                            </PageWrapper>
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
