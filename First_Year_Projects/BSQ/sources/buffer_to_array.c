/*
** EPITECH PROJECT, 2020
** bsq
** File description:
** buffer_to_array.c
*/

#include "my.h"

char **buffer_to_array(char *buff)
{
    int j = 0;
    int k = 0;
    int i = 0;
    char **array = mem_alloc_2d_array(count_raws(buff), count_cols(buff));

    for (; buff[i] != '\n'; i++);
    i++;
    for (; buff[i] != '\0'; i++) {
        if (buff[i] == '\n') {
            array[j][k] = '\0';
            j++;
            k = 0;
        }
        else {
            array[j][k] = buff[i];
            k++;
        }
    }
    array[j] = NULL;
    return array;
}
