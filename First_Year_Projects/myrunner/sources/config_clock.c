/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** config_clock.c
*/

#include "my_runner.h"

clocke_t config_clock(clocke_t clocke)
{
    clocke.clock = sfClock_create();
    clocke.seconds = 0;
    clocke.time = sfClock_getElapsedTime(clocke.clock);
    clocke.seconds = clocke.time.microseconds / 1000000.0;
    return clocke;
}
