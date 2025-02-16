import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FC } from 'react';

import WelcomePage from './pages/Welcome';
import ChallengesPage from './pages/Challenges';

const router = createBrowserRouter([
	{ path: '/', element: <WelcomePage /> },
	{ path: '/challenges', element: <ChallengesPage /> },
]);

const App: FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
