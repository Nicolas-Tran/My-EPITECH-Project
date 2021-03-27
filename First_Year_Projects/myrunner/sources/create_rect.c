/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** create_rect.c
*/

#include "my_runner.h"

sfIntRect create_rect(int r_top, int r_left, int r_width, int r_height)
{
    sfIntRect rect;

    rect.top = r_top;
    rect.left = r_left;
    rect.width = r_width;
    rect.height = r_height;
    return (rect);
}
