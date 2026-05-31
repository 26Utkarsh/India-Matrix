import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/layout/AppLayout';
import HomePage from './pages/Home';
import PrimeMinistersPage from './pages/PrimeMinisters';
import GeopoliticalPage from './pages/GeopoliticalEvents';
import EconomyPage from './pages/Economy';
import StatesPage from './pages/States';
import InfrastructurePage from './pages/Infrastructure';
import SpacePage from './pages/Space';
import DigitalPage from './pages/Digital';
import {
  RuralPage, UrbanPage, AgriculturePage, IndustryPage, SteelPage,
  TransportPage, EnergyPage, EducationPage, HealthcarePage, DefensePage,
  EnvironmentPage, DemographicsPage,
} from './pages/Placeholders';
import DecadesPage from './pages/Decades';
import { AIInsightsPage } from './pages/AIInsights';
import QuizPage from './pages/Quiz';
import SimulatorPage from './pages/Simulator';
import FoundingFathersPage from './pages/FoundingFathers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="prime-ministers" element={<PrimeMinistersPage />} />
            <Route path="geopolitical" element={<GeopoliticalPage />} />
            <Route path="rural" element={<RuralPage />} />
            <Route path="urban" element={<UrbanPage />} />
            <Route path="agriculture" element={<AgriculturePage />} />
            <Route path="industry" element={<IndustryPage />} />
            <Route path="steel" element={<SteelPage />} />
            <Route path="infrastructure" element={<InfrastructurePage />} />
            <Route path="transport" element={<TransportPage />} />
            <Route path="energy" element={<EnergyPage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="healthcare" element={<HealthcarePage />} />
            <Route path="digital" element={<DigitalPage />} />
            <Route path="space" element={<SpacePage />} />
            <Route path="defense" element={<DefensePage />} />
            <Route path="economy" element={<EconomyPage />} />
            <Route path="environment" element={<EnvironmentPage />} />
            <Route path="demographics" element={<DemographicsPage />} />
            <Route path="states" element={<StatesPage />} />
            <Route path="decades" element={<DecadesPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="simulator" element={<SimulatorPage />} />
            <Route path="ai-insights" element={<AIInsightsPage />} />
            <Route path="founding-fathers" element={<FoundingFathersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
