/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** tests_my_strcmp.c
*/

#include <criterion/criterion.h>
#include <string.h>

int my_strcmp(char const *s1, char const *s2);

Test(my_strcmp, string_comparaison)
{
    char *str = "test";

    cr_expect_eq(my_strcmp(str, "test"), strcmp(str, "test"));
    cr_expect_eq(my_strcmp(str, "kaka"), strcmp(str, "kaka"));
}
