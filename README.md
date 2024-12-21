# SnowEffect

A customizable snow effect for your website. This package adds a dynamic snowing effect to a selected container, with various options for controlling the appearance, behavior, and performance of the snowflakes.

## Features

- **Customizable Snowflakes**: Adjust size, speed, density, and more.
- **Responsive Design**: Works seamlessly across different screen sizes.
- **Performance Optimized**: Efficiently manages snowflakes to ensure smooth animations.
- **Easy Integration**: Simple setup for any JavaScript framework or vanilla projects.
- **TypeScript Support**: Comes with type definitions for TypeScript projects.

## Installation

You can install the package via npm:

```bash
npm install make-anything-snow
```

## Usage

```html
<script>
  import SnowEffect from "make-anything-snow";

  const snowEffect = new SnowEffect({
    targetSelector: ".snow-container", // CSS selector for the container to apply the effect
    minSize: 5, // Minimum snowflake size in pixels
    maxSize: 20, // Maximum snowflake size in pixels
    speed: 5, // Snowflake fall speed (higher value = faster fall)
    maxFlakes: 200, // Maximum number of snowflakes to create
    density: 50, // Snowflake density (affects the number of flakes based on container size)
    wind: 2, // Wind strength affecting horizontal movement
    rotation: true, // Whether snowflakes should rotate as they fall
    rotationSpeed: 2, // Speed at which snowflakes rotate
    opacity: 0.8, // Opacity of the snowflakes,
    imageUrl: "snowflake.png", // Image to use for snowflakes (can be a URL or base64 data)
  });

  snowEffect.init(); // Initialize and start the snow effect
</script>

<div class="snow-container">
  <h1>Welcome to my project</h1>
  <p>Enjoy the snow effect on this page!</p>
</div>

<style>
  .snow-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    pointer-events: none; /* Ensures snow doesn't block interactions */
    background: transparent; /* Set your desired background */
  }
</style>
```

### Configuration Options

The following options can be passed to the `SnowEffect` constructor:

- **targetSelector** (`string`): Required. The CSS selector of the container where the snowflakes will fall. Defaults to `.snow-container`.
- **imageUrl** (`string`): Optional. The URL of the image used for snowflakes. Defaults to an SVG snowflake image.
- **minSize** (`number`): Optional. The minimum size of snowflakes in pixels. Defaults to `10`.
- **maxSize** (`number`): Optional. The maximum size of snowflakes in pixels. Defaults to `30`.
- **speed** (`number`): Optional. The speed at which the snowflakes fall. A higher value results in faster falling snowflakes. Defaults to `5`.
- **density** (`number`): Optional. The density of the snowflakes. A higher value increases the number of snowflakes. Defaults to `30`.
- **maxFlakes** (`number`): Optional. The maximum number of snowflakes to create. Defaults to `100`.
- **wind** (`number`): Optional. The strength of the wind affecting the horizontal movement of the snowflakes. Defaults to `1`.
- **rotation** (`boolean`): Optional. Whether snowflakes should rotate as they fall. Defaults to `false`.
- **rotationSpeed** (`number`): Optional. The speed of rotation for snowflakes. Defaults to `3`.
- **opacity** (`number`): Optional. The opacity of the snowflakes. Ranges from `0` (completely transparent) to `1` (fully opaque). Defaults to `0.8`.
