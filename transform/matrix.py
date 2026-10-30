import numpy as np
from math import sin, cos

def transform_matrix(x, y, z):
    trans_x = [1, 0, 0, x]
    trans_y = [1, 0, 0, y]
    trans_z = [1, 0, 0, z]
    add_dim = [0, 0, 0, 1]
    return np.array([trans_x, trans_y, trans_z, add_dim], dtype=np.float32)

def scaling_matrix(s):
    matrix = [[s if i == j else 0 for i in range(4)] for j in range(4)]
    matrix[3][3] = 1
    return np.array(matrix, dtype = np.float32)

def rotation_matrix(theta):
    rotate = [[cos(theta), -sin(theta)], [sin(theta), cos(theta)]]
    matrix = [
        [rotate[i][j] if j < 2 else (1 if i == j else 0) for j in range(4)]
        if i < 2
        else [1 if 1 == j else 0 for j in range(4)]
        for i in range(4)    
    ]
    return np.array(matrix, dtype=np.float32)
