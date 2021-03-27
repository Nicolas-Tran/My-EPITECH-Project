/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** video_mode_set.c
*/

#include "my_runner.h"

sfVideoMode video_mode_set(unsigned int w, unsigned int h, unsigned int bitsPP)
{
    sfVideoMode video_mode;

    video_mode.width = w;
    video_mode.height = h;
    video_mode.bitsPerPixel = bitsPP;
    return video_mode;
}
