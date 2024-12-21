class SnowEffect {
  constructor(options = {}) {
    this.options = {
      targetSelector: options.targetSelector || ".snow-container",
      imageUrl:
        options.imageUrl ||
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjUiIGZpbGw9IndoaXRlIi8+PC9zdmc+",
      minSize: options.minSize || 10,
      maxSize: options.maxSize || 30,
      speed: options.speed || 5,
      density: options.density || 30, // Reduced density to improve performance
      maxFlakes: options.maxFlakes || 100, // Added maxFlakes option
      wind: options.wind || 1, // Default wind strength set to 1
      rotation: options.rotation || false,
      rotationSpeed: options.rotationSpeed || 3,
      opacity: options.opacity || 0.8,
    };

    this.flakes = [];
    this.container = null;
    this.containerRect = null;
    this.animationFrame = null;
  }

  init() {
    if (typeof window === "undefined") {
      console.warn(
        "SnowEffect: 'window' is not defined. Initialization skipped."
      );
      return;
    }

    this.container = document.querySelector(this.options.targetSelector);
    if (!this.container) {
      console.error("Snow container not found!");
      return;
    }

    // Set container style
    if (getComputedStyle(this.container).position === "static") {
      this.container.style.position = "relative";
    }
    this.container.style.overflow = "hidden";

    // Get container dimensions
    this.updateContainerRect();

    // Create initial snowflakes
    this.createFlakes();

    // Start animation
    this.animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      this.updateContainerRect();
      this.adjustFlakesOnResize();
    });
  }

  updateContainerRect() {
    if (typeof window === "undefined") return;
    this.containerRect = this.container.getBoundingClientRect();
  }

  createFlakes() {
    const maxFlakes = this.options.maxFlakes;
    for (let i = 0; i < maxFlakes; i++) {
      this.createFlake();
    }
  }

  createFlake() {
    if (this.flakes.length >= this.options.maxFlakes) return;

    const flake = document.createElement("div");
    const size =
      Math.random() * (this.options.maxSize - this.options.minSize) +
      this.options.minSize;

    flake.style.position = "absolute";
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.backgroundImage = `url(${this.options.imageUrl})`;
    flake.style.backgroundSize = "contain";
    flake.style.backgroundRepeat = "no-repeat";
    flake.style.opacity = this.options.opacity;
    flake.style.willChange = "transform";

    // Random starting position across the entire width
    const startX = Math.random() * this.containerRect.width;
    flake.style.left = `${startX}px`;
    flake.style.top = "-50px";

    // Store flake properties
    flake.dataset.speed = Math.random() * this.options.speed + 1; // Ensure a minimum speed
    flake.dataset.rotation = Math.random() * 360;
    flake.dataset.rotationSpeed = this.options.rotationSpeed
      ? Math.random() * this.options.rotationSpeed
      : 0;
    flake.dataset.wind = (Math.random() * 2 - 1) * this.options.wind; // Random wind direction between -wind and +wind
    flake.dataset.x = startX;
    flake.dataset.y = -50;

    this.container.appendChild(flake);
    this.flakes.push(flake);
  }

  animate() {
    if (typeof window === "undefined") return;

    this.flakes.forEach((flake) => {
      const speed = parseFloat(flake.dataset.speed);
      let x = parseFloat(flake.dataset.x);
      let y = parseFloat(flake.dataset.y);
      let rotation = parseFloat(flake.dataset.rotation);
      const rotationSpeed = parseFloat(flake.dataset.rotationSpeed);
      const wind = parseFloat(flake.dataset.wind);

      // Update position
      y += speed;
      x += wind; // Apply constant wind drift

      // Update rotation if enabled
      if (this.options.rotation) {
        rotation += rotationSpeed;
        flake.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      } else {
        flake.style.transform = `translate(${x}px, ${y}px)`;
      }

      // Store updated values
      flake.dataset.x = x;
      flake.dataset.y = y;
      flake.dataset.rotation = rotation;

      // Reset flake if it's out of vertical bounds
      if (y > this.containerRect.height + 50) {
        flake.dataset.x = Math.random() * this.containerRect.width;
        flake.dataset.y = -50;
        flake.style.top = `-50px`;
        flake.style.left = `${Math.random() * this.containerRect.width}px`;
      }

      // Reset flake if it drifts out of horizontal bounds
      if (x < -50 || x > this.containerRect.width + 50) {
        flake.dataset.x = Math.random() * this.containerRect.width;
        flake.dataset.y = -50;
        flake.style.top = `-50px`;
        flake.style.left = `${Math.random() * this.containerRect.width}px`;
      }
    });

    // Ensure maxFlakes is enforced
    const maxFlakes = this.options.maxFlakes;
    while (this.flakes.length > maxFlakes) {
      const flake = this.flakes.pop();
      flake.remove();
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  adjustFlakesOnResize() {
    if (typeof window === "undefined") return;

    // Update container dimensions
    this.updateContainerRect();

    // Remove excess flakes or add new ones based on new container size
    const desiredFlakes = Math.floor(
      ((this.containerRect.width * this.containerRect.height) / 10000) *
        this.options.density
    );

    // Limit flakes based on maxFlakes option to prevent exceeding
    const maxFlakes = Math.min(desiredFlakes, this.options.maxFlakes);
    while (this.flakes.length > maxFlakes) {
      const flake = this.flakes.pop();
      flake.remove();
    }

    while (this.flakes.length < maxFlakes) {
      this.createFlake();
    }
  }

  destroy() {
    if (typeof window === "undefined") return;

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.flakes.forEach((flake) => flake.remove());
    this.flakes = [];
  }
}

// Export for ES Modules
export default SnowEffect;
