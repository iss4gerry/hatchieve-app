import React from 'react';
import Badge from './Badge.js';
import { motion } from 'framer-motion';

type TabProps = {
	isSelected: boolean;
	onSelect: () => void;
	badgeCaption: number;
	children: React.ReactNode;
};

function Tab({ isSelected, onSelect, badgeCaption, children }: TabProps) {
	return (
		<li>
			<button
				className={isSelected ? 'selected' : undefined}
				onClick={onSelect}
			>
				{children}
				<Badge caption={badgeCaption} />
			</button>
			{isSelected && (
				<motion.div layoutId="tab-indicator" className="active-tab-indicator" />
			)}
		</li>
	);
}

type ChallengeTabsProps = {
	selectedType: 'active' | 'completed' | 'failed';
	onSelectType: (type: 'active' | 'completed' | 'failed') => void;
	challenges: {
		active: { id: string }[];
		completed: { id: string }[];
		failed: { id: string }[];
	};
	children: React.ReactNode;
};

export default function ChallengeTabs({
	selectedType,
	onSelectType,
	challenges,
	children,
}: ChallengeTabsProps) {
	return (
		<>
			<menu id="tabs">
				<Tab
					isSelected={selectedType === 'active'}
					onSelect={() => onSelectType('active')}
					badgeCaption={challenges.active.length}
				>
					Active
				</Tab>
				<Tab
					isSelected={selectedType === 'completed'}
					onSelect={() => onSelectType('completed')}
					badgeCaption={challenges.completed.length}
				>
					Completed
				</Tab>
				<Tab
					isSelected={selectedType === 'failed'}
					onSelect={() => onSelectType('failed')}
					badgeCaption={challenges.failed.length}
				>
					Failed
				</Tab>
			</menu>
			<div>{children}</div>
		</>
	);
}
