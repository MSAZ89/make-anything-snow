export interface SnowEffectOptions {
  targetSelector?: string;
  imageUrl?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  density?: number;
  wind?: number;
  rotation?: boolean;
  rotationSpeed?: number;
  opacity?: number;
  maxFlakes?: number;
}

export default class SnowEffect {
  constructor(options?: SnowEffectOptions);
  init(): void;
  destroy(): void;
}
