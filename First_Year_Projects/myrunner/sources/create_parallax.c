/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** create_parallax.c
*/

#include "my_runner.h"

struct game_object *create_parallax(void)
{
    sfVector2f vec = create_vec(0, 0);
    sfVector2f vec1 = create_vec(0, 820);
    sfIntRect rect1 = create_rect(0, 0, 1923, 217);
    sfIntRect rect = create_rect(0, 0, 1923, 1080);
    struct game_object *obj = creat_obj("Spring2Long1_5.png", vec, rect);

    obj->next = creat_obj("Spring2Long1_4.png", vec1, rect);
    obj->next->next = creat_obj("Spring2Long1_3.png", vec1, rect);
    obj->next->next->next = creat_obj("Spring2Long1_2.png", vec1, rect);
    obj->next->next->next->next = creat_obj("Spring2Long1_1.png", vec1, rect);
    obj->next->next->next->next->next = creat_obj("Spring2Long1_0.png", vec1,
                                                rect1);
    obj->next->next->next->next->next->next = obj;
    set_parallax_position(obj);
    return obj;
}
