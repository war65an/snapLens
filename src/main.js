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
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjgzOTA4NzQ0LCJzdWIiOiJlNDU5NDNiNi1kZGQxLTRhZGYtYmZkOC0yZTQzNzhjZTc3MmZ-U1RBR0lOR35lYjMxNWY1Yi0zODBlLTRkZDItYmZlZC1jNzk1OTU4NTMzZGUifQ.mx4APinGG-bP9HRQuQmQ2vlhw1e_A3SObLd2UvAp82I'
  });

  // Create a new CameraKit session.
  const session = await cameraKit.createSession();

  // Replace the `canvas` element with the live output from the CameraKit session.
  document.getElementById('canvas').replaceWith(session.output.live);

  // Load the specified lens group.
  const { lenses } = await cameraKit.lensRepository.loadLensGroups(['cab6531f-5c6e-4728-88c9-0d07abbfb854'])
  

  // Apply the first lens in the lens group to the CameraKit session.
  session.applyLens(lenses[0]);

  // Get the user's media stream.
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'},
  });

  // Create a CameraKit media stream source from the user's media stream.
  const source = createMediaStreamSource(
    mediaStream, {
      transform: Transform2D.MirrorX,
      cameraType: 'front'
    }
  );

  // Set the source of the CameraKit session.
  await session.setSource(source);

  // Set the render size of the CameraKit session to the size of the browser window.
  session.source.setRenderSize( window.innerWidth,  window.innerHeight);

  // Start the CameraKit session.
  session.play();
})();
