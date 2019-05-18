import pickle

import cv2
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC

from knn_classifier.image_loader import load_all_classes
from knn_classifier.util import extend_list_with_lists

size = {"width": 450, "height": 450}


def resize(image, width=None, height=None, inter=cv2.INTER_AREA):
    return cv2.resize(image.astype("uint8"), (width, height), interpolation=inter)


def resize_images(images):
    return list(map(lambda image: resize(image, **size), images))


def extract_color_histogram(image, bins=(100, 100, 100)):
    hist = cv2.calcHist([image], [0, 1, 2], None, bins,
                        [0, 256, 0, 256, 0, 256])

    cv2.normalize(hist, hist)
    return hist.flatten()


class KNNClassifier:
    def __init__(self, neighbors):
        self.neighbors = neighbors
        # self.model = SVC(kernel='linear')
        self.model = KNeighborsClassifier(n_neighbors=neighbors, n_jobs=-1)

    def train(self, training_images, training_labels):
        training_images = [extract_color_histogram(image) for image in resize_images(training_images)]
        train = np.array([training_images]).reshape(len(training_images), -1)
        self.model.fit(train, training_labels)

    def predict(self, image):
        image = np.array(extract_color_histogram(resize(image, **size))).reshape(1, -1)
        return self.model.predict(image)

    def save(self):
        with open("saved_models/model.pkl", "wb") as file:
            pickle.dump(self.model, file)

    def load(self, path):
        with open(path, "rb") as file:
            self.model = pickle.load(file)


if __name__ == '__main__':
    white, brown, none = load_all_classes("imgs/")
    assert len(white) > 1 and len(brown) > 1 and len(none) > 1, "Need more than one sample per class!"
    white_train = white[:-1]
    brown_train = brown[:-1]
    none_train = none[:-1]
    white = white[-1]
    brown = brown[-1]
    none = none[-1]
    train = extend_list_with_lists(white_train.copy(), [brown_train, none_train])
    print(len(train))

    labels = [*["white"] * len(white_train), *["brown"] * len(brown_train), *["none"] * len(none_train)]
    print("Training on labels:\n", labels)
    model = KNNClassifier(1)
    model.train(train, labels)

    print("Brown=={}".format(model.predict(brown)))
    print("White=={}".format(model.predict(white)))
    print("None=={}".format(model.predict(none)))

    model.save()
    model.load("saved_models/model.pkl")

    print("Brown=={}".format(model.predict(brown)))
    print("White=={}".format(model.predict(white)))
    print("None=={}".format(model.predict(none)))