import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import ImportExpeneses from './pages/ImportExpenses';
import Analytics from './pages/Analytics'
import NoteEditor from "./pages/NoteEditor";
import Notes from "./pages/Notes";
import Shopping from "./pages/Shopping";
import ShoppingCatalog from "./pages/ShoppingCatalog";



function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/analytics" element={<Analytics />} />
        <Route exact path="/expenses" element={<Expenses />} />
        <Route exact path="/expenses/import-expenses" element={<ImportExpeneses />} />
        <Route exact path="/notes" element={<Notes />} />
        <Route exact path="/notes/note-editor" element={<NoteEditor />} />
        <Route exact path="/shopping" element={<Shopping />} />
        <Route exact path="/shopping/catalog" element={<ShoppingCatalog />} />
        <Route exact path="/shopping/carts" element={<NoteEditor />} />
      </Routes>
    </>
  );
}

export default App;
