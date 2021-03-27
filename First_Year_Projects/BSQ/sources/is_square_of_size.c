/*
** EPITECH PROJECT, 2020
** bsbsq
** File description:
** is_square_of_size.c
*/

#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>

int is_square_of_size(char **map, int row, int col, int square_size)
{
    for (int i = 0; i < square_size; i++) {
        for (int j = 0; j < square_size; j++) {
            if (map[row + i] == NULL)
                return 0;
            if (map[row + i][col + j] == '\0' || map[row + i][col + j] == '\n'
                || map[row + i][col + j] == 'o')
                return 0;
        }
    }
    return 1;
}
