// Interactive Digital Comic Application
class ComicReader {
    constructor() {
        this.story = null;
        this.currentScene = null;
        this.history = [];
        this.visitedScenes = new Set();
        this.showingParallelPath = false;
        this.chosenPath = null;

        // DOM Elements
        this.elements = {
            loading: document.getElementById('loading'),
            errorScreen: document.getElementById('error-screen'),
            errorMessage: document.getElementById('error-message'),
            sceneImage: document.getElementById('scene-image'),
            sceneDescription: document.getElementById('scene-description'),
            parallelScene: document.getElementById('parallel-scene'),
            parallelImage: document.getElementById('parallel-image'),
            choicesContainer: document.getElementById('choices-container'),
            choicesButtons: document.getElementById('choices-buttons'),
            navigation: document.getElementById('navigation'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            progressFill: document.getElementById('progress-fill'),
            progressText: document.getElementById('progress-text'),
            endingScreen: document.getElementById('ending-screen'),
            endingTitle: document.getElementById('ending-title'),
            endingDescription: document.getElementById('ending-description'),
            endingEmotions: document.getElementById('ending-emotions')
        };

        this.init();
    }

    async init() {
        try {
            await this.loadStory();
            this.setupEventListeners();
            this.loadScene(this.story.start);
            this.hideLoading();
        } catch (error) {
            this.showError('Failed to load the story: ' + error.message);
        }
    }

    async loadStory() {
        try {
            const response = await fetch('story_complete.json');
            if (!response.ok) {
                throw new Error('Story file not found');
            }
            this.story = await response.json();
        } catch (error) {
            throw new Error('Could not load story data');
        }
    }

    setupEventListeners() {
        this.elements.prevBtn.addEventListener('click', () => this.goToPreviousScene());
        this.elements.nextBtn.addEventListener('click', () => this.goToNextScene());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && !this.elements.prevBtn.disabled) {
                this.goToPreviousScene();
            } else if (e.key === 'ArrowRight' && !this.elements.nextBtn.disabled) {
                this.goToNextScene();
            }
        });
    }

    loadScene(sceneId) {
        const scene = this.story.scenes[sceneId];

        if (!scene) {
            this.showError('Scene not found: ' + sceneId);
            return;
        }

        // Add current scene to history (but not if we're going back)
        if (this.currentScene && this.history[this.history.length - 1] !== sceneId) {
            this.history.push(this.currentScene.id);
        }

        this.currentScene = scene;
        this.visitedScenes.add(sceneId);

        // Check if this is an ending
        if (scene.type === 'ending') {
            this.showEnding(scene);
            return;
        }

        // Render the scene
        this.renderScene(scene);
        this.updateProgress();
        this.updateNavigation();
    }

    renderScene(scene) {
        // Hide ending screen if visible
        this.elements.endingScreen.classList.add('hidden');

        // Set main scene image
        this.elements.sceneImage.src = `images/${scene.image}`;
        this.elements.sceneImage.alt = scene.description;

        // Set description
        this.elements.sceneDescription.textContent = scene.description;

        // Handle parallel path visualization
        if (scene.type === 'parallel' && scene.parallelPath) {
            this.showParallelPath(scene);
        } else {
            this.hideParallelPath();
        }

        // Handle decision points
        if (scene.type === 'decision') {
            this.showChoices(scene);
            this.elements.nextBtn.disabled = true; // Disable next until choice is made
        } else {
            this.hideChoices();
            this.elements.nextBtn.disabled = false;
        }
    }

    showParallelPath(scene) {
        const parallelSceneData = this.story.scenes[scene.parallelPath];

        if (parallelSceneData) {
            this.elements.parallelImage.src = `images/${parallelSceneData.image}`;
            this.elements.parallelImage.alt = parallelSceneData.description;
            this.elements.parallelScene.classList.remove('hidden');
            this.showingParallelPath = true;
        }
    }

    hideParallelPath() {
        this.elements.parallelScene.classList.add('hidden');
        this.showingParallelPath = false;
    }

    showChoices(scene) {
        this.elements.choicesContainer.classList.remove('hidden');
        this.elements.choicesButtons.innerHTML = '';

        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = `choice-btn ${choice.emotionalTone}`;
            button.innerHTML = `<span>${choice.label}</span>`;

            button.addEventListener('click', () => {
                this.makeChoice(choice);
            });

            this.elements.choicesButtons.appendChild(button);
        });
    }

    hideChoices() {
        this.elements.choicesContainer.classList.add('hidden');
    }

    makeChoice(choice) {
        // Store the chosen path
        this.chosenPath = choice.emotionalTone;

        // Load the next scene
        this.loadScene(choice.next);

        // If this decision has parallel visualization, we'll see it in the next scene
        if (this.currentScene.parallelVisualization) {
            this.showingParallelPath = true;
        }
    }

    goToNextScene() {
        if (this.currentScene.type === 'ending') {
            return; // No navigation from endings
        }

        if (this.currentScene.type === 'decision') {
            return; // Must make a choice first
        }

        if (this.currentScene.next) {
            this.loadScene(this.currentScene.next);
        }
    }

    goToPreviousScene() {
        if (this.history.length === 0) {
            return;
        }

        // Remove current scene from history and go to previous
        const previousSceneId = this.history.pop();

        // Load previous scene without adding to history
        const prevScene = this.story.scenes[previousSceneId];
        this.currentScene = prevScene;
        this.renderScene(prevScene);
        this.updateProgress();
        this.updateNavigation();
    }

    showEnding(scene) {
        // Hide main content
        this.elements.navigation.style.display = 'none';
        this.elements.choicesContainer.classList.add('hidden');

        // Show ending screen
        this.elements.endingScreen.classList.remove('hidden');

        // Set ending content
        const endingType = scene.emotionalTone === 'struggle' ?
            'The Path of Struggle' : 'The Path of Acceptance';

        this.elements.endingTitle.textContent = endingType;
        this.elements.endingDescription.textContent = scene.description;

        // Show emotional state
        if (scene.emotionalState) {
            this.elements.endingEmotions.innerHTML = `
                <p><strong>Mood:</strong> ${scene.emotionalState.mood}</p>
                <p><strong>Connection:</strong> ${scene.emotionalState.connection}</p>
                <p><strong>Experience:</strong> ${scene.emotionalState.experience}</p>
            `;
        }

        // Update progress to show completion
        this.updateProgress();

        // NO RESTART BUTTON - Absolute ending as specified
    }

    updateProgress() {
        const totalScenes = this.story.metadata.totalScenes;
        const visitedCount = this.visitedScenes.size;
        const percentage = (visitedCount / totalScenes) * 100;

        this.elements.progressFill.style.width = `${percentage}%`;
        this.elements.progressText.textContent = `${visitedCount} / ${totalScenes}`;
    }

    updateNavigation() {
        // Update previous button
        this.elements.prevBtn.disabled = this.history.length === 0;

        // Update next button
        if (this.currentScene.type === 'ending') {
            this.elements.nextBtn.disabled = true;
        } else if (this.currentScene.type === 'decision') {
            this.elements.nextBtn.disabled = true;
        } else {
            this.elements.nextBtn.disabled = !this.currentScene.next;
        }
    }

    hideLoading() {
        this.elements.loading.classList.add('hidden');
    }

    showError(message) {
        this.elements.loading.classList.add('hidden');
        this.elements.errorScreen.classList.remove('hidden');
        this.elements.errorMessage.textContent = message;
    }
}

// Initialize the comic reader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const reader = new ComicReader();
});
