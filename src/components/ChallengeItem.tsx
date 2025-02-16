import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChallengesContext } from '../store/challenges-context';

type Challenge = {
	id: string;
	title: string;
	description: string;
	deadline: string;
	image: React.ImgHTMLAttributes<HTMLImageElement>;
};

type ChallengeItemProps = {
	challenge: Challenge;
	onViewDetails: () => void;
	isExpanded: boolean;
};

export default function ChallengeItem({
	challenge,
	onViewDetails,
	isExpanded,
}: ChallengeItemProps) {
	const { updateChallengeStatus } = useContext(ChallengesContext);

	const formattedDate = new Date(challenge.deadline).toLocaleDateString(
		'en-US',
		{
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		}
	);

	function handleCancel() {
		updateChallengeStatus(challenge.id, 'failed');
	}

	function handleComplete() {
		updateChallengeStatus(challenge.id, 'completed');
	}

	return (
		<motion.li
			layout
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
		>
			<article className="challenge-item">
				<header>
					<img {...challenge.image} />
					<div className="challenge-item-meta">
						<h2>{challenge.title}</h2>
						<p>Complete until {formattedDate}</p>
						<p className="challenge-item-actions">
							<button onClick={handleCancel} className="btn-negative">
								Mark as failed
							</button>
							<button onClick={handleComplete}>Mark as completed</button>
						</p>
					</div>
				</header>
				<div className="challenge-item-details">
					<p>
						<button onClick={onViewDetails}>
							View Details{' '}
							<motion.span
								className="challenge-item-details-icon"
								animate={{ rotate: isExpanded ? 180 : 0 }}
							>
								&#9650;
							</motion.span>
						</button>
					</p>
					<AnimatePresence>
						{isExpanded && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
							>
								<p className="challenge-item-description">
									{challenge.description}
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</article>
		</motion.li>
	);
}
