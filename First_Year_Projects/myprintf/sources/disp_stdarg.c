/*
** EPITECH PROJECT, 2020
** bs_my_printf
** File description:
** disp_stdarg.c
*/

#include <stdarg.h>
#include <unistd.h>

static void my_putchar(char c)
{
    write(1, &c, 1);
}

static int my_putstr(char const *str)
{
    int i;

    for (i = 0; str[i] != '\0'; i++)
        my_putchar(str[i]);
    return (0);
}

static int my_put_nbr(int nb)
{
    if (nb == -2147483648){
        write(1, "-2147483648", 11);
        return (0);
    }
    if (nb < 0) {
        my_putchar('-');
        nb = nb * (-1);
    }
    if (nb > 9) {
        my_put_nbr(nb / 10);
    }
    my_putchar(nb % 10 + 48);
    return (0);
}

void disp_stdarg(char *s, ...)
{
    va_list list;

    va_start(list, *s);
    for (int i = 0; s[i] != '\0'; i++){
        if (s[i] == 'c') {
            my_putchar(va_arg(list, int));
            my_putchar('\n');
        }
        else if (s[i] == 's') {
            my_putstr(va_arg(list, char *));
            my_putchar('\n');
        }
        else {
            my_put_nbr(va_arg(list, int));
            my_putchar('\n');
        }
    }
    va_end(list);
}
