import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AppHeader from "./components/layout/AppHeader";
import { ThemeProvider } from "./context/ThemeContext";
import { LandingPage } from "./pages/LandingPage";
import HomePage from "./pages/HomePage";

function EditorPage() {
  return (
    <div id="editor-page" className="flex h-dvh flex-col overflow-hidden">
      <div className="shrink-0">
        <AppHeader />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <HomePage />
      </div>
    </div>
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
