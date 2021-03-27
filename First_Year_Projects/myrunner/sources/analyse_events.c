/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** analyse_events.c
*/

#include "my_runner.h"

void analyse_events(sfRenderWindow *window, sfEvent event,
                    struct game_object *duck)
{
    if (event.type == sfEvtClosed)
        sfRenderWindow_close(window);
    if (sfKeyboard_isKeyPressed(sfKeySpace))
        duck->status = 1;
}
