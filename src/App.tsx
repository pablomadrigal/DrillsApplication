import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from './translation/en.json';
import translationSpanish from './translation/es.json';

import Home from "./pages/Home";
import User from "./pages/User";
import News from "./pages/News";
import UsersList from "./pages/UsersList";
import NewsList from "./pages/News";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "user",
    element: <UsersList />,
  },
  {
   path: "user/:id",
   element: <User />,
  },
  {
  path: "news",
  element: <NewsList />,
  }, 
  {
  path: "news/create",
  element: <News />,
  },
  {
  path: "news/:id",
  element: <News />,
  },
  {
  path: "*",
  element: <Home />,
  }
]);

const resources = {
  en: {
    translation: translationEnglish,
  },
  es: {
    translation: translationSpanish,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
  });

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App
