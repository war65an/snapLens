// Import the necessary Camera Kit modules.
import {
  bootstrapCameraKit,
  CameraKitSession,
  createMediaStreamSource,
  Transform2D,
  Lens,
} from '@snap/camera-kit';

// Create an async function to initialize Camera Kit and start the video stream.
(async function() {
  // Bootstrap Camera Kit using your API token.
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjgzOTA4NzQ0LCJzdWIiOiJlNDU5NDNiNi1kZGQxLTRhZGYtYmZkOC0yZTQzNzhjZTc3MmZ-UFJPRFVDVElPTn5kMzU3Zjc2My1iYWFkLTQ1MTQtYmQ2Ny1hNTQ2NzdjOWM5NDcifQ.XEQOrWXU7XH1QFnIjVJXvsYLJ7Y1ytt9bxQJti4Gxm0'
  });

  // Create a new CameraKit session.
  const session = await cameraKit.createSession();

  // Replace the `canvas` element with the live output from the CameraKit session.
  document.getElementById('canvas').replaceWith(session.output.live);

  // Load the specified lens group.
  const { lenses } = await cameraKit.lensRepository.loadLensGroups(['cab6531f-5c6e-4728-88c9-0d07abbfb854'])
  

  // Apply the first lens in the lens group to the CameraKit session.
  session.applyLens(lenses[1]);

  // Get the user's media stream.
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'},
  });

  // Create a CameraKit media stream source from the user's media stream.
  const source = createMediaStreamSource(
    mediaStream, {
      // transform: Transform2D.MirrorX,
      cameraType: 'back'
    }
  );

  // Set the source of the CameraKit session.
  await session.setSource(source);

  // Set the render size of the CameraKit session to the size of the browser window.
  session.source.setRenderSize( window.innerWidth,  window.innerHeight);

  // Start the CameraKit session.
  session.play();
})();
