/*
** EPITECH PROJECT, 2020
** BSQ
** File description:
** my.h
*/

#ifndef __MY_H___
#define __MY_H___

#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>

char **load_2d_arr_from_file(char const *filepath, int nb_rows, int nb_cols);
char **mem_alloc_2d_array(int nb_rows, int nb_cols);
void fs_cat_x_bytes(char const *filepath, int x);
int is_square_of_size(char **map, int row, int col, int square_size);
char *load_file_in_mem(char const *filepath);
char *mem_alloc(char const *a, char const *b);
int my_strlen(char const *str);
int my_getnbr(char const *str);
int count_cols(char *buff);
int count_raws(char *buff);
char **buffer_to_array(char *buff);
char **replace_x(char** array, int col, int raw, int square_size);
void free_2d_array(char **map, int nb_raws);
int my_putstr(char const *str);
void my_putchat(char c);
void find_square(char **map, char *buff);
void print_2d_array(char **array);
#endif
