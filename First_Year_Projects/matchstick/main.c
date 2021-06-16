/*
** EPITECH PROJECT, 2021
** matchstick
** File description:
** main.c
*/

#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

void print_game_board(int lines);
int my_getnbr(char const *str);
int print_updated_board_game(int line, int nb_matches, int line_nb);
int read_player_move_and_print_updated_board_game(char **board_game,
                                                char **av);
char **get_board_game(int line_nb);
int matchstick_function(char **board_game, char **av);

int main(int ac, char **av)
{
    int line_nb = 0;
    char **board_game = NULL;

    if (ac != 3)
        return 84;
    if (my_getnbr(av[1]) <= 0 || my_getnbr(av[1]) > 100)
        return 84;
    if (my_getnbr(av[2]) <= 0)
        return 84;
    line_nb = my_getnbr(av[1]);
    board_game = get_board_game(line_nb);
    print_game_board(line_nb);
    return matchstick_function(board_game, av);
}
