import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';

import EventList from './pages/EventList/EventList';
import EventCreate from './pages/EventCreate/EventCreate';
import EventDetails from './pages/EventDetails/EventDetails';
import EventEdit from './pages/EventEdit/EventEdit';
import NotFound from './pages/NotFound/NotFound';

// import scss from'./App.scss';

function App() {
  // const location = useLocation();

  return (
    <>
      <Header />
      {/* <Routes location={location} key={location.pathname}> */}
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<EventCreate />} />
        <Route path="/details" element={<EventDetails />} />
        <Route path="/edit" element={<EventEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
