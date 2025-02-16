import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
	const modalRoot = document.getElementById('modal');
	if (!modalRoot) {
		console.error('Modal root element not found!');
		return null;
	}

	return createPortal(
		<>
			<div className="backdrop" onClick={onClose} />
			<motion.dialog
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}
				initial="hidden"
				animate="visible"
				exit="hidden"
				open
				className="modal"
				transition={{ duration: 0.2 }}
			>
				<h2>{title}</h2>
				{children}
			</motion.dialog>
		</>,
		modalRoot
	);
}
