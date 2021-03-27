/*
** EPITECH PROJECT, 2020
** my_printf
** File description:
** tests_my_printf.c
*/

#include <criterion/criterion.h>
#include <criterion/redirect.h>
#include "bsprintf.h"
#include "my.h"
#include <stdio.h>

void redirect_all_std(void)
{
    cr_redirect_stdout();
    cr_redirect_stderr();
}

Test(my_printf, simple_string, .init = redirect_all_std)
{
    my_printf("Hello World");
    cr_assert_stdout_eq_str("Hello World");
}

Test(my_printf, flag_d, .init = redirect_all_std)
{
    my_printf("%d", 42);
    cr_expect_stdout_eq_str("42");
}

Test(my_printf, flag_i, .init = redirect_all_std)
{
    my_printf("%i", 42);
    cr_expect_stdout_eq_str("42");
}

Test(my_printf, flag_c, .init = redirect_all_std)
{
    my_printf("%c", 'c');
    cr_expect_stdout_eq_str("c");
}

Test(my_printf, flag_s, .init = redirect_all_std)
{
    my_printf("%s", "hello");
    cr_expect_stdout_eq_str("hello");
}

Test(my_printf, flag_o, .init = redirect_all_std)
{
    my_printf("%o", -8);
    cr_expect_stdout_eq_str("37777777770");
}

Test(my_printf, multiple_flag, .init = redirect_all_std)
{
    my_printf("%s %s", "hello", "world");
    cr_expect_stdout_eq_str("hello world");
}

Test(my_printf, multiple_flag2, .init = redirect_all_std)
{
    my_printf("%s%%%d%s", "astek", 42, "world");
    cr_expect_stdout_eq_str("astek%42world");
}

Test(my_printf, flag_percent, .init = redirect_all_std)
{
    my_printf("%%");
    cr_expect_stdout_eq_str("%");
}

Test(my_printf, flag_percent2, .init = redirect_all_std)
{
    my_printf("%c%%%c", 'c', 'c');
    cr_expect_stdout_eq_str("c%c");
}
