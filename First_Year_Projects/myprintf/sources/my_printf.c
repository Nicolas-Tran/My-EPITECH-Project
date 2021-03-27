/*
** EPITECH PROJECT, 2020
** my_printf
** File description:
** my_printf.c
*/

#include <stdarg.h>
#include <unistd.h>
#include <stdio.h>
#include "my.h"

void case_s(char const *s, int i, va_list list)
{
    switch (s[i + 1]) {
    case 's':
        my_putstr(va_arg(list, char *));
        break;
    case 'd':
    case 'i':
        my_put_nbr(va_arg(list, int));
        break;
    case 'c':
        my_putchar(va_arg(list, int));
        break;
    }
}

void flag_o(va_list list)
{
    unsigned int nb = va_arg(list, int);
    int R = 0;
    char *str = malloc(sizeof(char) * 12);

    for (int i = 0; nb != 0; i++) {
        R = nb % 8;
        nb = nb / 8;
        str[i] = '0' + R;
    }
    my_revstr(str);
    my_putstr(str);
}

void flag_u(va_list list)
{
    unsigned int nb = va_arg(list, int);

    if (nb > 9) {
        my_put_nbr(nb / 10);
    }
    my_putchar(nb % 10 + 48);
}

void case_special(char const *s, int i, va_list list)
{
    switch (s[i + 1]) {
    case '%':
        my_putchar('%');
        break;
    case 'u':
        flag_u(list);
        break;
    case 'o':
        flag_o(list);
        break;
    }
}

int my_printf(char const *s, ...)
{
    int i;
    va_list list;

    va_start(list, s);
    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] == '%') {
            case_s(s, i, list);
            case_special(s, i, list);
            i++;
        } else
            my_putchar(s[i]);
    }
    va_end(list);
    return (0);
}
