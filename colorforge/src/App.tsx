import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
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
        <Toaster
          position="top-right"
          duration={2800}
          closeButton
          toastOptions={{
            style: {
              borderRadius: "12px",
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
