let selectedLetter = null;

document.addEventListener("DOMContentLoaded", () => {
	const letterButtons = document.querySelectorAll(".letter-btn");
	const modificationPanel = document.querySelector(".modification-panel");
	const colorPickers = document.querySelectorAll(".color-picker");
	const animationSelect = document.querySelector(".animation-select");

	// Letter button click handlers
	letterButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			selectedLetter = btn.dataset.letter;
			modificationPanel.style.display = "block";
			highlightSelectedLetter(btn);
		});
	});

	// Color picker change handlers
	colorPickers.forEach((picker) => {
		picker.addEventListener("input", (e) => {
			if (!selectedLetter) return;

			const target = e.target.dataset.target;
			const letterSvg = document.querySelector(`svg[id="${selectedLetter}"]`);

			switch (target) {
				case "body":
					// Update main body paths
					letterSvg.querySelectorAll(".letter-body").forEach((path) => {
						path.style.fill = e.target.value;
					});
					break;
				case "arms":
					// Update arms
					letterSvg.querySelectorAll(".arm").forEach((arm) => {
						arm.style.stroke = e.target.value;
					});
					break;
				case "legs":
					// Update legs
					letterSvg.querySelectorAll(".leg").forEach((leg) => {
						leg.style.stroke = e.target.value;
						leg.style.fill = e.target.value;
					});
					break;
			}
		});
	});

	// Animation definitions
	const animations = {
		bounce: {
			keyframes: `
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                `,
			duration: "2s"
		},
		shake: {
			keyframes: `
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                    }
                `,
			duration: "0.8s"
		},
		wobble: {
			keyframes: `
                    @keyframes wobble {
                        0%, 100% { transform: rotate(0); }
                        25% { transform: rotate(-5deg); }
                        75% { transform: rotate(5deg); }
                    }
                `,
			duration: "1.5s"
		},
		pulse: {
			keyframes: `
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                `,
			duration: "1.5s"
		},
		spin: {
			keyframes: `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `,
			duration: "3s"
		},
		flip: {
			keyframes: `
                    @keyframes flip {
                        0% { transform: perspective(400px) rotateY(0); }
                        100% { transform: perspective(400px) rotateY(360deg); }
                    }
                `,
			duration: "2s"
		},
		tada: {
			keyframes: `
                    @keyframes tada {
                        0% { transform: scale(1) rotate(0); }
                        10%, 20% { transform: scale(0.9) rotate(-3deg); }
                        30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
                        40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
                        100% { transform: scale(1) rotate(0); }
                    }
                `,
			duration: "1.5s"
		},
		jello: {
			keyframes: `
                    @keyframes jello {
                        0%, 100% { transform: skewX(0) skewY(0); }
                        25% { transform: skewX(-12deg) skewY(-12deg); }
                        50% { transform: skewX(6deg) skewY(6deg); }
                        75% { transform: skewX(-3deg) skewY(-3deg); }
                    }
                `,
			duration: "2s"
		},
		swing: {
			keyframes: `
                    @keyframes swing {
                        0%, 100% { transform: rotate(0); }
                        20% { transform: rotate(15deg); }
                        40% { transform: rotate(-10deg); }
                        60% { transform: rotate(5deg); }
                        80% { transform: rotate(-5deg); }
                    }
                `,
			duration: "1.5s"
		},
		rubberBand: {
			keyframes: `
                    @keyframes rubberBand {
                        0% { transform: scale(1); }
                        30% { transform: scaleX(1.25) scaleY(0.75); }
                        40% { transform: scaleX(0.75) scaleY(1.25); }
                        60% { transform: scaleX(1.15) scaleY(0.85); }
                        100% { transform: scale(1); }
                    }
                `,
			duration: "1.3s"
		},
		float: {
			keyframes: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(0); }
                        50% { transform: translateY(-15px) rotate(5deg); }
                    }
                `,
			duration: "3s"
		},
		heartBeat: {
			keyframes: `
                    @keyframes heartBeat {
                        0% { transform: scale(1); }
                        14% { transform: scale(1.3); }
                        28% { transform: scale(1); }
                        42% { transform: scale(1.3); }
                        70% { transform: scale(1); }
                    }
                `,
			duration: "1.3s"
		},
		rollIn: {
			keyframes: `
                    @keyframes rollIn {
                        0% { transform: translateX(-100%) rotate(-120deg); }
                        100% { transform: translateX(0) rotate(0); }
                    }
                `,
			duration: "2s"
		},
		dance: {
			keyframes: `
                    @keyframes dance {
                        0%, 100% { transform: rotate(0) translateY(0); }
                        25% { transform: rotate(10deg) translateY(-10px); }
                        50% { transform: rotate(0) translateY(0); }
                        75% { transform: rotate(-10deg) translateY(-10px); }
                    }
                `,
			duration: "1.5s"
		},
		twist: {
			keyframes: `
                    @keyframes twist {
                        0%, 100% { transform: rotateY(0); }
                        50% { transform: rotateY(180deg); }
                    }
                `,
			duration: "2s"
		},
		bounce3D: {
			keyframes: `
                    @keyframes bounce3D {
                        0%, 100% { transform: perspective(400px) translateZ(0); }
                        50% { transform: perspective(400px) translateZ(50px); }
                    }
                `,
			duration: "2s"
		},
		zigzag: {
			keyframes: `
                    @keyframes zigzag {
                        0% { transform: translateX(0) translateY(0); }
                        25% { transform: translateX(10px) translateY(-10px); }
                        50% { transform: translateX(20px) translateY(0); }
                        75% { transform: translateX(10px) translateY(10px); }
                        100% { transform: translateX(0) translateY(0); }
                    }
                `,
			duration: "2s"
		},
		wave: {
			keyframes: `
                    @keyframes wave {
                        0%, 100% { transform: skewX(0) translateX(0); }
                        25% { transform: skewX(15deg) translateX(10px); }
                        75% { transform: skewX(-15deg) translateX(-10px); }
                    }
                `,
			duration: "2s"
		},
		pop: {
			keyframes: `
                    @keyframes pop {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.2); opacity: 0.8; }
                    }
                `,
			duration: "0.6s"
		},
		shake3D: {
			keyframes: `
                    @keyframes shake3D {
                        0%, 100% { transform: perspective(400px) rotateX(0) rotateY(0); }
                        25% { transform: perspective(400px) rotateX(15deg) rotateY(15deg); }
                        75% { transform: perspective(400px) rotateX(-15deg) rotateY(-15deg); }
                    }
                `,
			duration: "2s"
		}
	};

	// Add animation styles to document
	const styleSheet = document.createElement("style");
	document.head.appendChild(styleSheet);
	Object.entries(animations).forEach(([name, anim]) => {
		styleSheet.sheet.insertRule(anim.keyframes, styleSheet.sheet.cssRules.length);
	});

	// Populate animation dropdown
	Object.keys(animations).forEach((anim) => {
		const option = document.createElement("option");
		option.value = anim;
		option.textContent = anim.charAt(0).toUpperCase() + anim.slice(1);
		animationSelect.appendChild(option);
	});

	// Animation change handler
	animationSelect.addEventListener("change", (e) => {
		if (!selectedLetter) return;

		const letterSvg = document.querySelector(`svg[id="${selectedLetter}"]`);
		const selectedAnim = animations[e.target.value];

		if (selectedAnim) {
			// Remove any existing animations
			letterSvg.style.animation = "";
			// Add new animation
			letterSvg.style.animation = `${e.target.value} ${selectedAnim.duration} infinite`;
		}
	});
});

function highlightSelectedLetter(selectedBtn) {
	document.querySelectorAll(".letter-btn").forEach((btn) => {
		btn.style.transform = btn === selectedBtn ? "scale(1.1)" : "scale(1)";
		btn.style.boxShadow =
			btn === selectedBtn ? "0 0 10px rgba(0,0,0,0.2)" : "none";
	});
}

// Group animation button functionality
document.querySelector(".group-btn").addEventListener("click", function () {
	const letters = document.querySelectorAll("svg.letter");

	// More dynamic group animation keyframes
	const groupAnimation = `
            @keyframes groupDance {
                0% { 
                    transform: translateY(0) scale(1) rotate(0deg); 
                }
                10% {
                    transform: translateY(-30px) scale(1.1) rotate(5deg);
                }
                20% {
                    transform: translateY(0) scale(0.95) rotate(0deg);
                }
                30% {
                    transform: translateY(-15px) scale(1.05) rotate(-5deg);
                }
                40% {
                    transform: translateY(0) scale(1) rotate(0deg);
                }
                50% {
                    transform: translateX(-20px) scale(1.1);
                }
                60% {
                    transform: translateX(20px) scale(1.1);
                }
                70% {
                    transform: translateX(0) scale(1) translateY(-10px);
                }
                80% {
                    transform: translateY(0) scale(1.15);
                }
                90% {
                    transform: translateY(-5px) scale(0.95);
                }
                100% { 
                    transform: translateY(0) scale(1) rotate(0deg); 
                }
            }

            @keyframes letterGlow {
                0%, 100% {
                    filter: brightness(1);
                }
                50% {
                    filter: brightness(1.3);
                }
            }

            @keyframes letterPulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.7;
                }
            }
        `;

	// Add the animations to the stylesheet
	const styleSheet = document.createElement("style");
	styleSheet.textContent = groupAnimation;
	document.head.appendChild(styleSheet);

	// Apply animations to each letter with cascading effect
	letters.forEach((letter, index) => {
		// Store original animation
		const originalAnimation = letter.style.animation;

		// Combined animations with delays
		letter.style.animation = `
                groupDance 3s ease-in-out ${index * 0.15}s,
                letterGlow 1s ease-in-out ${index * 0.2}s infinite,
                letterPulse 1.5s ease-in-out ${index * 0.25}s infinite
            `;

		// Reset to original animation after completion
		setTimeout(() => {
			letter.style.animation = originalAnimation;
		}, 4000); // Increased duration for longer animation
	});

	// Disable button during animation
	this.disabled = true;
	this.textContent = "Playing...";

	setTimeout(() => {
		this.disabled = false;
		this.textContent = "Play Group Animation";
	}, 4500);
});
