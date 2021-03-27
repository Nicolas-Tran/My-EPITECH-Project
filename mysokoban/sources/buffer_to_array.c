/*
** EPITECH PROJECT, 2020
** bsq
** File description:
** buffer_to_array.c
*/

#include <stddef.h>

char **mem_alloc_2d_array(int nb_rows, int nb_cols);

static int count_cols(char *buff)
{
    int i = 0;

    for (; buff[i] != '\0'; i++);
    return i;
}

static int count_raws(char *buff)
{
    int i = 0;
    int j = 0;

    for (; buff[i] != '\0'; i++)
        if (buff[i] == '\n')
            j++;
    j++;
    return j;
}

char **buffer_to_array(char *buff)
{
    int j = 0;
    int k = 0;
    int i = 0;
    char **array = mem_alloc_2d_array(count_raws(buff), count_cols(buff));

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
    array[j + 1] = NULL;
    return array;
}
