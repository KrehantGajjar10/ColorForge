import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "./components/layout/AppHeader";
import { ThemeProvider } from "./context/ThemeContext";
import { LandingPage } from "./pages/LandingPage";
import HomePage from "./pages/HomePage";

function EditorPage() {
  return (
    <>
      <AppHeader />
      <HomePage />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
