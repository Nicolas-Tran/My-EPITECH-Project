/*
** EPITECH PROJECT, 2020
** my_put_nbr
** File description:
** libraries
*/

#include <unistd.h>

void my_putchar(char c)
{
    write(1, &c, 1);
}

int my_put_nbr(int nb)
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
