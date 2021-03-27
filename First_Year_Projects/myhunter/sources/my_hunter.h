/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** my_hunter.h
*/
#ifndef __MY_HUNTER_H___
#define __MY_HUNTER_H___

#include <SFML/Config.h>
#include <SFML/Graphics.h>
#include <unistd.h>
#include <SFML/System/Export.h>
#include <SFML/Graphics/RenderWindow.h>
#include <SFML/Graphics/RectangleShape.h>
#include <SFML/Graphics/Color.h>
#include <SFML/Graphics/CircleShape.h>

typedef struct duck_s
{
    sfSprite *sprite;
    sfTexture *texture;
    sfIntRect rect;
} duck_t;

typedef struct time_s
{
    sfClock *clock;
    sfTime time;
    float seconds;
} time_t;

void analyse_events(sfRenderWindow *window, sfEvent event, duck_t *ducka);
void move_rect(sfIntRect *rect, int offset, int max_value);
sfSprite *duck(void);
sfIntRect rect(void);
sfVector2f create_vec(float x, float y);
sfVideoMode video_mode_set(unsigned int w, unsigned int h, unsigned int bitsPP);
void show_instructions(char **av);
void do_when_clock(duck_t ducka, sfVector2f vec, sfClock *clock, float seconds);
int destroy_all(duck_t ducka, sfRenderWindow *window, sfClock *clock);
void hit(sfRenderWindow *window, duck_t ducka);
void do_clock(duck_t ducka, sfClock *clock);
void manage_window(sfRenderWindow *window, duck_t ducka);
void game_loop(sfRenderWindow *window, sfTime time, duck_t *ducka,
            sfClock *clock);
#endif
