import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import cityImg from '../assets/city.jpg';
import heroImg from '../assets/hero.png';

export default function WelcomePage() {
	const { scrollY } = useScroll();

	const yCity = useTransform(scrollY, [0, 200], [0, -100]);
	const opacityCity = useTransform(
		scrollY,
		[0, 200, 300, 500],
		[1, 0.5, 0.5, 0]
	);

	const yHero = useTransform(scrollY, [0, 200], [0, -150]);
	const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);

	const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
	const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

	return (
		<>
			<header id="welcome-header">
				<motion.div
					id="welcome-header-content"
					style={{ scale: scaleText, y: yText }}
				>
					<h1>Ready for a challenge?</h1>
					<Link id="cta-link" to="/challenges">
						Get Started
					</Link>
				</motion.div>
				<motion.img
					src={cityImg}
					style={{ opacity: opacityCity, y: yCity }}
					alt="A city skyline touched by sunlight"
					id="city-image"
				/>
				<motion.img
					style={{ opacity: opacityHero, y: yHero }}
					src={heroImg}
					alt="A superhero wearing a cape"
					id="hero-image"
				/>
			</header>
			<main id="welcome-content">
				<section>
					<h2>Now is the perfect time to challenge yourself.</h2>
					<p>
						Take control of your journey with our platform—set ambitious goals,
						track your progress, and achieve what once felt impossible. Whether
						it’s personal growth, career milestones, or just for fun, we’ve got
						everything you need to succeed.
					</p>
				</section>

				<section>
					<h2>Why Take on a Challenge?</h2>
					<p>
						Challenges ignite growth. They push you beyond your comfort zone,
						test your limits, and lead to real transformation. We believe that
						inside everyone lies untapped potential, waiting to be unlocked.
					</p>
				</section>

				<section>
					<h2>What You Get</h2>
					<ul>
						<li>
							<strong>Custom Challenge Creation:</strong> Set your own rules and
							progress at your pace.
						</li>
						<li>
							<strong>Smart Progress Tracking:</strong> Gain insights with
							analytics to measure and celebrate your achievements.
						</li>
						<li>
							<strong>Motivating Community:</strong> Connect with like-minded
							individuals and stay inspired.
						</li>
					</ul>
				</section>

				<section>
					<h2>Join a Thriving Community of Achievers</h2>
					<p>
						“I never knew my true potential until I started my first challenge
						here. It’s been a life-changing experience!” – Alex P.
					</p>
				</section>
			</main>
		</>
	);
}
