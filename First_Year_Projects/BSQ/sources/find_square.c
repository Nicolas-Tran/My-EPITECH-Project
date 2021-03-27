/*
** EPITECH PROJECT, 2020
** BSQ
** File description:
** find_square.c
*/

#include "my.h"

void find_square(char **map, char *buff)
{
    int row_pos = 0;
    int col_pos = 0;
    int i = 0;

    for (int row = 0; row < count_raws(buff); row++) {
        for (int col = 0; col < count_cols(buff);) {
            if (is_square_of_size(map, row, col, i) == 1) {
                row_pos = row;
                col_pos = col;
                i++;
            }else
                col++;
        }
    }
    replace_x(map, col_pos, row_pos, i);
}
