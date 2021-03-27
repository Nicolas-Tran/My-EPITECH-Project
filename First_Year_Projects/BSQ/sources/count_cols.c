/*
** EPITECH PROJECT, 2020
** bsq
** File description:
** count_cols.c
*/

int count_cols(char *buff)
{
    int col = 0;
    int i = 0;

    for (i = 0; buff[i] != '\n'; i++);
    i++;
    for (col = i; buff[col] != '\n'; col++);
    col = col - i;
    return col;
}
