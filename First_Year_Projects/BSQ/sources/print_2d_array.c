/*
** EPITECH PROJECT, 2020
** BSQ
** File description:
** print_2d_array.c
*/

#include "my.h"

void print_2d_array(char **array)
{
    for (int i = 0; array[i] != NULL; i++) {
        my_putstr(array[i]);
        write(1, "\n", 1);
    }
}
