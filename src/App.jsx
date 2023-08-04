import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';

import EventList from './pages/EventList/EventList';
import EventCreate from './pages/EventCreate/EventCreate';
import EventDetails from './pages/EventDetails/EventDetails';
import EventEdit from './pages/EventEdit/EventEdit';
import NotFound from './pages/NotFound/NotFound';

import scss from './App.module.scss';

function App() {

  return (
    <>
      <Header />
      <main className={scss.main}>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<EventCreate />} />
          <Route path="/details/:eventId" element={<EventDetails />} />
          <Route path="/edit/:eventId" element={<EventEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
