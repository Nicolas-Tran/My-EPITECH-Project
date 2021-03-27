/*
** EPITECH PROJECT, 2020
** bsbsq
** File description:
** mem_alloc_2d_array.c
*/

#include <stdlib.h>

char **mem_alloc_2d_array(int nb_rows, int nb_cols)
{
    char **array;

    array = malloc(sizeof(char *) * (nb_rows + 1));
    for (int i = 0; i < nb_rows; i++)
        array[i] = malloc(sizeof(char) * (nb_cols + 1));
    return (array);
}
