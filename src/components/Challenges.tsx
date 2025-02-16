import React from 'react';
import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChallengesContext } from '../store/challenges-context';
import ChallengeItem from './ChallengeItem';
import ChallengeTabs from './ChallengeTabs';

type Challenge = {
	id: string;
	title: string;
	description: string;
	deadline: string;
	status: 'active' | 'completed' | 'failed';
	image: React.ImgHTMLAttributes<HTMLImageElement>;
};

type FilteredChallenges = {
	active: Challenge[];
	completed: Challenge[];
	failed: Challenge[];
};

export default function Challenges() {
	const { challenges } = useContext(ChallengesContext);
	const [selectedType, setSelectedType] = useState<
		'active' | 'completed' | 'failed'
	>('active');
	const [expanded, setExpanded] = useState<string | null>(null);

	function handleSelectType(newType: 'active' | 'completed' | 'failed') {
		setSelectedType(newType);
	}

	function handleViewDetails(id: string) {
		setExpanded((prevId) => (prevId === id ? null : id));
	}

	const filteredChallenges: FilteredChallenges = {
		active: (challenges as Challenge[]).filter(
			(challenge) => challenge.status === 'active'
		),
		completed: (challenges as Challenge[]).filter(
			(challenge) => challenge.status === 'completed'
		),
		failed: (challenges as Challenge[]).filter(
			(challenge) => challenge.status === 'failed'
		),
	};

	const displayedChallenges = filteredChallenges[selectedType];

	return (
		<div id="challenges">
			<ChallengeTabs
				challenges={filteredChallenges}
				onSelectType={handleSelectType}
				selectedType={selectedType}
			>
				<AnimatePresence mode="wait">
					{displayedChallenges.length > 0 && (
						<motion.ol
							className="challenge-items"
							key="list"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							{displayedChallenges.map((challenge) => (
								<ChallengeItem
									key={challenge.id}
									challenge={challenge}
									onViewDetails={() => handleViewDetails(challenge.id)}
									isExpanded={expanded === challenge.id}
								/>
							))}
						</motion.ol>
					)}

					{displayedChallenges.length === 0 && (
						<motion.p
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							key="fallback"
						>
							No challenges found.
						</motion.p>
					)}
				</AnimatePresence>
			</ChallengeTabs>
		</div>
	);
}
