/*
** EPITECH PROJECT, 2020
** my_runner
** File description:
** create_object.c
*/

#include "my_runner.h"

struct game_object *creat_obj(const char *path, sfVector2f pos, sfIntRect rect)
{
    struct game_object *test = malloc(sizeof(struct game_object));

    test->texture = sfTexture_createFromFile(path, NULL);
    if (test->texture == NULL)
        return NULL;
    test->sprite = sfSprite_create();
    if (test->sprite == NULL)
        return NULL;
    test->posi = &pos;
    test->recta = rect;
    sfSprite_setTexture(test->sprite, test->texture, sfTrue);
    sfSprite_setTextureRect(test->sprite, test->recta);
    return test;
}
