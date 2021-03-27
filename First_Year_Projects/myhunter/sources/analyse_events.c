/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** analyse_events.c
*/

#include "my_hunter.h"

void analyse_events(sfRenderWindow *window, sfEvent event, duck_t *ducka)
{
    sfVector2f vec = create_vec(-100, 0);

    if (event.type == sfEvtClosed)
        sfRenderWindow_close(window);
//    if (event.type == sfEvtMouseButtonPressed) {ç
    if(sfMouse_isButtonPressed(sfMouseLeft)) {
        hit(window, *ducka);
    }
    // }
    if (sfSprite_getPosition(ducka->sprite).x > 1600)
        sfSprite_setPosition(ducka->sprite, vec);
}
