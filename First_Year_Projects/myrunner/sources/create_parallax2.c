/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** create_parallax.c
*/

#include "my_runner.h"

static void set_parallax_position2(struct game_object *obj)
{
    sfVector2f vec = create_vec(1918, 0);
    sfVector2f vec1 = create_vec(1918, 820);
    sfVector2f vec2 = create_vec(1918, 270);
    sfVector2f vec3 = create_vec(1918, 372);
    sfVector2f vec4 = create_vec(1918, 236);
    sfVector2f vec5 = create_vec(1918, 275);

    sfSprite_setPosition(obj->sprite, vec);
    sfSprite_setPosition(obj->next->sprite, vec2);
    sfSprite_setPosition(obj->next->next->sprite, vec4);
    sfSprite_setPosition(obj->next->next->next->sprite, vec3);
    sfSprite_setPosition(obj->next->next->next->next->sprite, vec5);
    sfSprite_setPosition(obj->next->next->next->next->next->sprite, vec1);
}

struct game_object *create_parallax2(void)
{
    sfVector2f vec = create_vec(0, 0);
    sfVector2f vec1 = create_vec(0, 820);
    sfIntRect rect1 = create_rect(0, 1, 1923, 217);
    sfIntRect rect = create_rect(0, 0, 1923, 1080);
    struct game_object *obj = creat_obj("Spring3Long1_5.png", vec, rect);

    obj->next = creat_obj("Spring3Long1_4.png", vec1, rect);
    obj->next->next = creat_obj("Spring3Long1_3.png", vec1, rect);
    obj->next->next->next = creat_obj("Spring3Long1_2.png", vec1, rect);
    obj->next->next->next->next = creat_obj("Spring3Long1_1.png", vec1, rect);
    obj->next->next->next->next->next = creat_obj("Spring3Long1_0.png", vec1,
                                                rect1);
    obj->next->next->next->next->next->next = obj;
    set_parallax_position2(obj);
    return obj;
}
