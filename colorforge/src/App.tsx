import AppHeader from "./components/layout/AppHeader";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: "var(--cf-background)",
          color: "var(--cf-foreground)",
        }}
      >
        <AppHeader />
        <HomePage />
      </div>
    </ThemeProvider>
  );
}
