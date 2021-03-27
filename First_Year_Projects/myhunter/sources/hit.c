/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** hit.c
*/

#include "my_hunter.h"

void hit(sfRenderWindow *window, duck_t ducka)
{
    sfVector2f sprite_pos = sfSprite_getPosition(ducka.sprite);
    sfVector2i mouse_pos = sfMouse_getPositionRenderWindow(window);
    sfVector2f vec = create_vec(-100, 0);

    if (mouse_pos.x < sprite_pos.x + 110 && mouse_pos.x > sprite_pos.x - 110
        && mouse_pos.y < sprite_pos.y + 100 && mouse_pos.y > sprite_pos.y - 100)
        sfSprite_setPosition(ducka.sprite, vec);
}
