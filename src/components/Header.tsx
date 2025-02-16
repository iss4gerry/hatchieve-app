import React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
	const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
		useState<boolean>(false);

	function handleStartAddNewChallenge() {
		setIsCreatingNewChallenge(true);
	}

	function handleDone() {
		setIsCreatingNewChallenge(false);
	}

	return (
		<>
			<AnimatePresence>
				{isCreatingNewChallenge && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						<NewChallenge onDone={handleDone} />
					</motion.div>
				)}
			</AnimatePresence>

			<header id="main-header">
				<h1>Your Challenges</h1>
				<motion.button
					whileHover={{ scale: 1.1 }}
					transition={{ type: 'spring', stiffness: 500 }}
					onClick={handleStartAddNewChallenge}
					className="button"
				>
					Add Challenge
				</motion.button>
			</header>
		</>
	);
}
