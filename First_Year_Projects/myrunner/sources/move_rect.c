/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** move_rect.c
*/

#include "my_runner.h"

void move_rect(sfIntRect *rect, int offset, int max_value)
{
    rect->left = rect->left + offset;
    if (rect->left >= max_value)
        rect->left = 0;
}
