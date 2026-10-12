import AppHeader from "./components/layout/AppHeader";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <AppHeader />
      <HomePage />
    </div>
  );
}
