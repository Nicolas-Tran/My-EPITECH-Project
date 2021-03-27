/*
** EPITECH PROJECT, 2021
** my_hunter
** File description:
** my_hunter.c
*/

#include <SFML/Graphics/RenderWindow.h>
#include <SFML/Graphics/RectangleShape.h>
#include <SFML/Graphics/Color.h>
#include <SFML/Graphics/CircleShape.h>
#include "my_hunter.h"

void my_hunter(void)
{
    sfVideoMode video_mode = video_mode_set(1920, 1080, 32);
    sfRenderWindow *window;
    sfEvent event;
    duck_t ducka;
    sfClock *clock = sfClock_create();
    sfTime time;

    window = sfRenderWindow_create(video_mode,"MyWindow", sfDefaultStyle,NULL);
    ducka.sprite = duck();
    ducka.rect = rect();
    sfRenderWindow_setFramerateLimit(window, 30);
    while (sfRenderWindow_isOpen(window)) {
        game_loop(window, time, &ducka, clock);
        while (sfRenderWindow_pollEvent(window, &event))
            analyse_events(window, event, &ducka);
    }
    destroy_all(ducka, window, clock);
}
