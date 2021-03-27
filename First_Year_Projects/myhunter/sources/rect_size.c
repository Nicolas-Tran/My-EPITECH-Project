/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** rect_size.c
*/

#include "my_hunter.h"

sfIntRect rect(void)
{
    sfIntRect rect;

    rect.top = 0;
    rect.left = 0;
    rect.width = 110;
    rect.height = 110;

    return (rect);
}
