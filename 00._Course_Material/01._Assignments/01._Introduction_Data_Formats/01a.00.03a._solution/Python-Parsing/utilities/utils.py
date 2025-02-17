import os

def base_path(path_name: str):
    '''
    Construct the path which is relative to the Parsing_Scripts directory
    Parameters:
        path_name (string): The name of the directory to construct the path
    Returns:
        string: The constructed path i.e. Parsing_Scripts/{path_name}, absolute path
    '''
    # Get the directory of the current file (utilities/utils.py)
    current_dir = os.path.dirname(__file__)
    # Move up one level to the Parsing_Scripts directory
    parent_dir = os.path.abspath(path_join(current_dir, os.pardir))
    # Construct the path relative to the Parsing_Scripts directory
    return path_join(parent_dir, os.pardir, path_name)

def path_join(*args):
    '''
    Join the paths together
    Parameters:
        *args (tuple): The paths to join together
    '''
    return os.path.join(*args)

if __name__ == "__main__":
    print("----1---")
    print(os.pardir)
    print("----2-----")
    print(os.path.dirname(__file__))
    print("----3-----")
    print(path_join(os.path.dirname(__file__), os.pardir))
    print("----4-----")
    print(base_path("Products"))