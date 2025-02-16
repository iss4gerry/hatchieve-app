import React from 'react';
import { useContext, useRef, useState, useCallback, FormEvent } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context';
import Modal from './Modal';
import images from '../assets/images';

interface ImageType {
	src: string;
	alt: string;
}

interface NewChallengeProps {
	onDone: () => void;
}

export default function NewChallenge({ onDone }: NewChallengeProps) {
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
	const deadlineRef = useRef<HTMLInputElement | null>(null);
	const [scope, animate] = useAnimate();

	const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
	const { addChallenge } = useContext(ChallengesContext);

	const handleSelectImage = useCallback((image: ImageType) => {
		setSelectedImage(image);
	}, []);

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const title = titleRef.current?.value.trim() || '';
		const description = descriptionRef.current?.value.trim() || '';
		const deadline = deadlineRef.current?.value.trim() || '';

		if (!title || !description || !deadline || !selectedImage) {
			animate(
				'input, textarea',
				{ x: [-10, 0, 10, 0] },
				{ type: 'tween', duration: 0.2, delay: stagger(0.05) }
			);
			return;
		}

		const challenge = { title, description, deadline, image: selectedImage };
		addChallenge(challenge);
		onDone();
	}

	return (
		<Modal title="New Challenge" onClose={onDone}>
			<form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
				<p>
					<label htmlFor="title">Title</label>
					<input ref={titleRef} type="text" name="title" id="title" required />
				</p>

				<p>
					<label htmlFor="description">Description</label>
					<textarea
						ref={descriptionRef}
						name="description"
						id="description"
						required
					/>
				</p>

				<p>
					<label htmlFor="deadline">Deadline</label>
					<input
						ref={deadlineRef}
						type="date"
						name="deadline"
						id="deadline"
						required
					/>
				</p>

				<motion.ul
					id="new-challenge-images"
					variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
					initial="hidden"
					animate="visible"
				>
					{images.map((image) => (
						<motion.li
							key={image.alt}
							variants={{
								hidden: { opacity: 0, scale: 0.5 },
								visible: { opacity: 1, scale: [0.8, 1] },
							}}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ type: 'spring' }}
							onClick={() => handleSelectImage(image)}
							className={selectedImage === image ? 'selected' : undefined}
						>
							<img src={image.src} alt={image.alt} />
						</motion.li>
					))}
				</motion.ul>

				<p className="new-challenge-actions">
					<button type="button" onClick={onDone}>
						Cancel
					</button>
					<button type="submit">Add Challenge</button>
				</p>
			</form>
		</Modal>
	);
}
