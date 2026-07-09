const cache = new Map();

function loadImage(src) {
  if (cache.has(src)) return cache.get(src);

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });

  cache.set(src, promise);
  return promise;
}

function buildPriorityOrder(currentIndex, total) {
  if (total === 0) return [];

  const order = [currentIndex];
  const offsets = [1, -1, 2, -2];

  for (const offset of offsets) {
    const index = currentIndex + offset;
    if (index >= 0 && index < total && !order.includes(index)) {
      order.push(index);
    }
  }

  for (let i = 0; i < total; i++) {
    if (!order.includes(i)) order.push(i);
  }

  return order;
}

export class ImagePreloader {
  constructor(sources = []) {
    this.sources = sources;
    this.loaded = new Set();
    this.failed = new Set();
    this.queue = [];
    this.processing = false;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  getState() {
    return {
      total: this.sources.length,
      loadedCount: this.loaded.size,
      isReady: this.sources.length > 0 && this.loaded.has(0),
      isFullyLoaded: this.loaded.size === this.sources.length,
      loaded: new Set(this.loaded),
    };
  }

  isLoaded(index) {
    return this.loaded.has(index);
  }

  async preloadIndex(index) {
    if (index < 0 || index >= this.sources.length) return;
    if (this.loaded.has(index) || this.failed.has(index)) return;

    try {
      await loadImage(this.sources[index]);
      this.loaded.add(index);
      this.notify();
    } catch {
      this.failed.add(index);
      this.notify();
    }
  }

  async preloadPriority(currentIndex = 0) {
    const order = buildPriorityOrder(currentIndex, this.sources.length);

    for (const index of order) {
      await this.preloadIndex(index);
    }
  }

  async preloadAll() {
    return this.preloadPriority(0);
  }

  updateSources(sources) {
    this.sources = sources;
    this.loaded.clear();
    this.failed.clear();
    this.notify();
  }
}

export function createPreloader(sources) {
  return new ImagePreloader(sources);
}

export function preloadImage(src) {
  return loadImage(src);
}
