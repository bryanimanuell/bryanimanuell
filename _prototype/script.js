const canvas = document.getElementById("scroll-canvas");
const context = canvas.getContext("2d");

const frameCount = 180;
const images = [];

// Helper function to format image paths
const currentFrame = (index) => `./background/frame_${index.toString().padStart(4, '0')}.png`;

// Preload all images and initialize the canvas with the first frame
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i + 1);
  images.push(img);

  if (i === 0) {
    img.onload = () => {
      // Set the canvas internal dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
    };
  }
}

let requestRef;
let currentFrameIndex = 0;

// Update the canvas based on scroll position
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

  // Calculate scroll progress from 0 to 1
  const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScrollTop));

  // Map scroll progress to a frame index
  const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));

  if (frameIndex !== currentFrameIndex) {
    currentFrameIndex = frameIndex;

    // Cancel any pending paint requests for better performance
    if (requestRef) {
      cancelAnimationFrame(requestRef);
    }

    // Request a new frame to be drawn
    requestRef = requestAnimationFrame(() => {
      if (images[currentFrameIndex].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[currentFrameIndex], 0, 0);
      }
    });
  }
});
