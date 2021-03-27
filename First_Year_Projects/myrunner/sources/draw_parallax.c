/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** draw_parallax.c
*/

#include "my_runner.h"

void draw_parallax(struct game_object *parallax, struct game_object *parallax2,
                sfRenderWindow *window)
{
    sfRenderWindow_drawSprite(window, parallax->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax2->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax->next->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax2->next->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax->next->next->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax2->next->next->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax->next->next->next->sprite,
                            NULL);
    sfRenderWindow_drawSprite(window, parallax2->next->next->next->sprite,
                            NULL);
    sfRenderWindow_drawSprite(window, parallax->next->next->next->next->sprite,
                            NULL);
    sfRenderWindow_drawSprite(window, parallax2->next->next->next->next->sprite,
                            NULL);
    sfRenderWindow_drawSprite(window, parallax->next->next->next->next->next
                            ->sprite, NULL);
    sfRenderWindow_drawSprite(window, parallax2->next->next->next->next->next
                            ->sprite, NULL);
}
