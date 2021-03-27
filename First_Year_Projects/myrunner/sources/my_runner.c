/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** my_runner.c
*/

#include "my_runner.h"

clocke_t config_clock(clocke_t clocke);

void my_runner(void)
{
    sfVideoMode video_mode = video_mode_set(1920, 1080, 32);
    sfRenderWindow *window;
    sfEvent event;
    struct game_object *parallax = create_parallax();
    struct game_object *parallax2 = create_parallax2();
    struct game_object *duck = create_duck();
    sfMusic *music = sfMusic_createFromFile("1-02 - World 1.flac");

    sfMusic_play(music);
    sfMusic_setLoop(music, sfTrue);
    window = sfRenderWindow_create(video_mode, "Runner", sfDefaultStyle, NULL);
    sfRenderWindow_setFramerateLimit(window, 30);
    while (sfRenderWindow_isOpen(window)) {
        game_loop(window, parallax, parallax2, duck);
        while (sfRenderWindow_pollEvent(window, &event))
            analyse_events(window, event, duck);
    }
    destroy_all_object(parallax, parallax2, music, window);
}
