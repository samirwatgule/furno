import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { PageSkeleton } from './components/ui/Skeleton';

const Home = lazy(() => import('./pages/Home'));
const DesignIdeas = lazy(() => import('./pages/DesignIdeas'));
const DesignCategoryPage = lazy(() => import('./pages/DesignCategoryPage'));
const DesignDetailPage = lazy(() => import('./pages/DesignDetailPage'));
const Projects = lazy(() => import('./pages/Projects'));
const StoreLocator = lazy(() => import('./pages/StoreLocator'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MagazinePage = lazy(() => import('./pages/MagazinePage'));
const EstimatorPage = lazy(() => import('./pages/EstimatorPage'));

export default function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/design-ideas" element={<DesignIdeas />} />
          <Route path="/design-ideas/:categorySlug" element={<DesignCategoryPage />} />
          <Route path="/design-ideas/:categorySlug/:designId" element={<DesignDetailPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/stores" element={<StoreLocator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/estimate" element={<EstimatorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
