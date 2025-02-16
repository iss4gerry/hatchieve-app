import React from 'react';
import { createContext, useState, ReactNode } from 'react';

interface Challenge {
	id: string;
	title: string;
	description: string;
	status: 'active' | 'completed' | 'failed';
}

interface ChallengesContextType {
	challenges: Challenge[];
	addChallenge: (challenge: Omit<Challenge, 'id' | 'status'>) => void;
	deleteChallenge: (challengeId: string) => void;
	updateChallengeStatus: (
		challengeId: string,
		newStatus: 'active' | 'completed' | 'failed'
	) => void;
}

export const ChallengesContext = createContext<ChallengesContextType>({
	challenges: [],
	addChallenge: () => {},
	deleteChallenge: () => {},
	updateChallengeStatus: () => {},
});

interface ChallengesContextProviderProps {
	children: ReactNode;
}

export default function ChallengesContextProvider({
	children,
}: ChallengesContextProviderProps) {
	const [challenges, setChallenges] = useState<Challenge[]>([]);

	function addChallenge(challenge: Omit<Challenge, 'id' | 'status'>) {
		setChallenges((prevChallenges) => [
			{ ...challenge, id: Math.random().toString(), status: 'active' },
			...prevChallenges,
		]);
	}

	function deleteChallenge(challengeId: string) {
		setChallenges((prevChallenges) =>
			prevChallenges.filter((challenge) => challenge.id !== challengeId)
		);
	}

	function updateChallengeStatus(
		challengeId: string,
		newStatus: 'active' | 'completed' | 'failed'
	) {
		setChallenges((prevChallenges) =>
			prevChallenges.map((challenge) =>
				challenge.id === challengeId
					? { ...challenge, status: newStatus }
					: challenge
			)
		);
	}

	const challengesContext: ChallengesContextType = {
		challenges,
		addChallenge,
		deleteChallenge,
		updateChallengeStatus,
	};

	return (
		<ChallengesContext.Provider value={challengesContext}>
			{children}
		</ChallengesContext.Provider>
	);
}
