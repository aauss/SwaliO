def extend_list_with_lists(original, lists):
    for list in lists:
        original.extend(list)
    return original