/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** tests_sort_algo.c
*/

#include <criterion/criterion.h>
#include "pushswap.h"

Test(sort_algo, first_element)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(1 , &l_a);
    init_node(2 , &l_a);
    init_node(3 , &l_a);
    init_node(4 , &l_a);
    init_node(5 , &l_a);
    while (check_order(l_a) != 1 || l_a->next == NULL)
        sort_algo(&l_a, &l_b);
    cr_expect_eq(l_a->data, 1);
    free_node(l_a);
    free_node(l_b);
}

Test(sort_algo, second_element)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(1 , &l_a);
    init_node(2 , &l_a);
    init_node(3 , &l_a);
    init_node(4 , &l_a);
    init_node(5 , &l_a);
    while (check_order(l_a) != 1 || l_a->next == NULL)
        sort_algo(&l_a, &l_b);
    cr_expect_eq(l_a->next->data, 2);
    free_node(l_a);
    free_node(l_b);
}

Test(sort_algo, third_element)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(1 , &l_a);
    init_node(2 , &l_a);
    init_node(3 , &l_a);
    init_node(4 , &l_a);
    init_node(5 , &l_a);
    while (check_order(l_a) != 1 || l_a->next == NULL)
        sort_algo(&l_a, &l_b);
    cr_expect_eq(l_a->next->next->data, 3);
    free_node(l_a);
    free_node(l_b);
}

Test(sort_algo, fourth_element)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(1 , &l_a);
    init_node(2 , &l_a);
    init_node(3 , &l_a);
    init_node(4 , &l_a);
    init_node(5 , &l_a);
    while (check_order(l_a) != 1 || l_a->next == NULL)
        sort_algo(&l_a, &l_b);
    cr_expect_eq(l_a->next->next->next->data, 4);
    free_node(l_a);
    free_node(l_b);
}

Test(sort_algo, fifth_element)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(1 , &l_a);
    init_node(2 , &l_a);
    init_node(3 , &l_a);
    init_node(4 , &l_a);
    init_node(5 , &l_a);
    while (check_order(l_a) != 1 || l_a->next == NULL)
        sort_algo(&l_a, &l_b);
    cr_expect_eq(l_a->next->next->next->next->data, 5);
    free_node(l_a);
    free_node(l_b);
}

Test(sort_algo, complete_sort)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(14, &l_a);
    init_node(35, &l_a);
    init_node(23, &l_a);
    init_node(92, &l_a);
    init_node(8, &l_a);
    show_list(l_a);
    while (check_order(l_a) != 1 || l_b != NULL)
        sort_algo(&l_a, &l_b);
    show_list(l_a);
    show_list(l_b);
    cr_expect_eq(l_a->data, 8);
    free_node(l_a);
    free_node(l_b);
}

Test(sort_algo, complete_sort2)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    init_node(0, &l_a);
    init_node(0, &l_a);
    init_node(2, &l_a);
    init_node(3, &l_a);
    init_node(4, &l_a);
    show_list(l_a);
    while (check_order(l_a) != 1 || l_b != NULL)
        sort_algo(&l_a, &l_b);
    show_list(l_a);
    show_list(l_b);
    cr_expect_eq(l_a->data, 0);
    free_node(l_a);
    free_node(l_b);
}
