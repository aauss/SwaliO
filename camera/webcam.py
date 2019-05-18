import logging
import sys

import cv2

from camera.constants import LOGGING_LEVEL

logging.basicConfig(stream=sys.stdout, level=LOGGING_LEVEL)
LOG = logging.getLogger(__name__)

# How many frames to show text
SHOW_FRAMES = 100


class Camera:
    def __init__(self, debug=False):
        self.debug = debug

    def _instantiate_camera(self):
        cap = cv2.VideoCapture(0)

        shown_frames = 0
        white = False
        brown = False

        return cap, shown_frames, white, brown

    def _debug_display(self, frame, white, brown, shown_frames):

        if cv2.waitKey(1) & 0xFF == ord('w'):
            LOG.debug("White")
            white = True
        elif cv2.waitKey(1) & 0xFF == ord('b'):
            LOG.debug('Brown')
            brown = True

        if white and brown:
            LOG.warning("White and Brown are both set, unknown interactions!")

        if white:
            shown_frames += 1
            cv2.addText(frame, "White Glass", (10, 20), 'Times')
            if shown_frames == SHOW_FRAMES:
                shown_frames = 0
                white = False
        if brown:
            shown_frames += 1
            cv2.addText(frame, "Brown Glass", (10, 20), "Times")
            if shown_frames == SHOW_FRAMES:
                shown_frames = 0
                brown = False

        return frame, white, brown, shown_frames

    def _imprint_classification(self, frame, classification):
        LOG.warning("THIS IS NOT YET IMPLEMENTED")
        return frame

    def activate(self, classifier):

        cap, shown_frames, white, brown = self._instantiate_camera()

        while (True):

            # Capture frame-by-frame
            ret, frame = cap.read()

            # Draw the text box
            cv2.rectangle(frame, (3, 9), (90, 22), (255, 255, 255), -1)

            classification = classifier.infer(frame)
            frame = self._imprint_classification(frame, classification)

            if self.debug:
                frame, white, brown, shown_frames = self._debug_display(frame, white, brown, shown_frames)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            # Display the resulting frame
            cv2.imshow('Webcam', frame)

        # When everything done, release the capture
        cap.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    class DummyClassifier:
        def infer(self, input):
            return input
    c = DummyClassifier()


    cam = Camera(debug=True)
    cam.activate(c)
