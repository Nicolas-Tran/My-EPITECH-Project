/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** create_vec.c
*/

#include "my_hunter.h"

sfVector2f create_vec(float x, float y)
{
    sfVector2f vec;

    vec.x = x;
    vec.y = y;
    return vec;
}
