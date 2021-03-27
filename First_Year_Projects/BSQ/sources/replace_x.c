/*
** EPITECH PROJECT, 2020
** bsq
** File description:
** replace_x.c
*/

char **replace_x(char** array, int col, int raw, int square_size)
{
    for (int i = 0; i + raw < raw + square_size - 1; i++) {
        for (int j = 0; j + col < col + square_size - 1; j++)
            array[i + raw][j + col] = 'x';
    }
    return array;
}
