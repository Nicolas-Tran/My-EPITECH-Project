/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** pushswap.h
*/

#ifndef __PUSHSWAP_H__
#define __PUSHSWAP_H__

#include <stdlib.h>
#include <unistd.h>

typedef struct node_s
{
    int data;
    struct node_s *next;
    struct node_s *prev;
} node_t;

void free_node(node_t *head);
void init_node(int data, node_t **head);
void swap_list(node_t **head);
int my_getnbr(char const *str);
void show_list(node_t *head);
int my_put_nbr(int nb);
void push_arg2_to_arg1(node_t **l_a, node_t **l_b);
void rotate_right(node_t **head);
void first_become_last(node_t **head);
int check_order(node_t *head);
void sort_algo(node_t **l_a, node_t **l_b);
#endif
