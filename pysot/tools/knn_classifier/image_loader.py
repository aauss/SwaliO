import os
import re

import matplotlib.pyplot as plt


def _load_image(path, prefix):
    return plt.imread(os.path.join(prefix, path))


def _merge_lists(match_list, path_list):
    """
    Gives the proper paths by taking the entire path of the paths that matched the regex
    :param match_list: list of regex matches
    :param path_list: list of paths
    :return: list of regex matched paths
    """
    proper_paths = []
    for i in range(len(match_list)):
        if match_list[i] is not None:
            proper_paths.append(path_list[i])
    return proper_paths


def load_image_class(path, cls):
    """
    Loads contents from a folder and puts the images into their proper class lists (in a dictionary)
    :param path: path to the images
    :param cls:
    :return:
    """
    assert cls in ["brown", "white", "none"], 'Invalid class name!  Should be in ["brown", "white", "none"]'
    contents = os.listdir(path)
    prefix = path.split("/")[0]

    images = []

    matches = [re.search(r"{}\.*".format(cls), match) for match in contents]
    matches = _merge_lists(matches, contents)
    images.extend([_load_image(path, prefix) for path in matches])

    return images


def load_all_classes(path):
    """
    Loads all image of the classes "white, brown, none"
    :param path: path to the images
    :return: white, brown, none image lists
    """
    white = load_image_class(path, "white")
    brown = load_image_class(path, 'brown')
    none = load_image_class(path, 'none')

    return white, brown, none
