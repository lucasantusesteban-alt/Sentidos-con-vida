/**
 * Sensory Interactions & Web Audio API handling
 */

class AudioInteraction {
    constructor() {
        this.audioCtx = null;
        this.initialized = false;
        this.setupListeners();
    }

    initAudio() {
        if (!this.initialized) {
            // Create audio context on first user interaction
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
                this.initialized = true;
            }
        }
    }

    playHoverSound(frequency = 432, type = 'sine', duration = 0.5) {
        if (!this.audioCtx) return;

        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        // Subtle envelope for the sound to make it feel like a gentle texture/chime
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, this.audioCtx.currentTime + 0.05); // Very quiet
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    }

    setupListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize audio context on first click/touchstart anywhere
            document.body.addEventListener('click', () => this.initAudio(), { once: true });
            document.body.addEventListener('touchstart', () => this.initAudio(), { once: true });

            // Add hover sounds to all interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .audio-hover');

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    // Play a gentle 432Hz (healing freq) sine wave on hover
                    this.playHoverSound(432, 'sine', 0.8);
                });

                el.addEventListener('focus', () => {
                    this.playHoverSound(528, 'sine', 0.8); // Slightly different note for focus
                });
            });

            // Floating welcome audio button logic 
            const welcomeBtn = document.getElementById('welcome-audio-btn');
            if (welcomeBtn) {
                welcomeBtn.addEventListener('click', () => {
                    // In a real app, this would play a recorded audio file.
                    // For now, we simulate with a synth chord.
                    this.initAudio();
                    this.playHoverSound(432, 'triangle', 2);
                    setTimeout(() => this.playHoverSound(544, 'triangle', 1.8), 100);
                    setTimeout(() => this.playHoverSound(648, 'triangle', 1.6), 200);

                    // Visual feedback
                    welcomeBtn.style.transform = 'scale(0.9)';
                    setTimeout(() => welcomeBtn.style.transform = '', 200);
                });
            }
        });
    }
}

// Initialize on script load
const interactions = new AudioInteraction();
