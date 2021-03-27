/*
** EPITECH PROJECT, 2020
** my_runner
** File description:
** my_runner.h
*/

#ifndef __MY_RUNNER_H__
#define __MY_RUNNER_H__

#include <SFML/Graphics.h>
#include <SFML/Config.h>
#include <SFML/System/Export.h>
#include <stdlib.h>
#include <SFML/Audio.h>

struct game_object
{
    sfSprite *sprite;
    sfTexture *texture;
    sfVector2f *posi;
    sfIntRect recta;
    int status;
    void (*ptr_move)(sfSprite *);
    struct game_object *next;
    sfClock *clock;
};

typedef struct clocke_s
{
    sfClock *clock;
    sfTime time;
    float seconds;
} clocke_t;

struct game_object *creat_obj(const char *path, sfVector2f pos, sfIntRect rect);
void destroy_all_object(struct game_object *Pllax, struct game_object *Pllax2,
                        sfMusic *music, sfRenderWindow *window);
sfVideoMode video_mode_set(unsigned int w, unsigned int h, unsigned int bitsPP);
sfIntRect create_rect(int r_top, int r_left, int r_width, int r_height);
sfVector2f create_vec(float x, float y);
void analyse_events(sfRenderWindow *window, sfEvent event,
                    struct game_object *duck);
void my_runner(void);
struct game_object *create_parallax(void);
void draw_parallax(struct game_object *parallax, struct game_object *parallax2,
                    sfRenderWindow *window);
void move_parallax(struct game_object *parallax);
void set_parallax_position(struct game_object *obj);
void reset_position_parallax(struct game_object *parallax);
struct game_object *create_parallax2(void);
void move_all_parallax(struct game_object *Pllax, struct game_object *Pllax2);
struct game_object *create_duck(void);
void move_rect(sfIntRect *rect, int offset, int max_value);
void free_all(struct game_object *Px, struct game_object *Px2);
void clock_function(struct game_object *duck, float seconds, sfClock *clock,
                    sfRenderWindow *window);
void game_loop(sfRenderWindow *window, struct game_object *parallax,
                struct game_object *parallax2, struct game_object *duck);
void jump(struct game_object *duck);
#endif
