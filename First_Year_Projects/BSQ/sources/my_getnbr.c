/*
** EPITECH PROJECT, 2020
** my_getnbr
** File description:
** libraries
*/

int my_getnbr(char const *str)
{
    int nb = 1;
    long result = 0;
    int i = 0;

    while (str[i] == '-' || str[i] == '+') {
        i++;
        if (i % 2 == 1)
            nb = -1;
        else
            nb = 1;
    }
    for ( ; str[i] >= '0' && str[i] <= '9'; i++)
        result = result * 10 + str[i] - '0';
    result = result * nb;
    if (result >= -2147483648 || result <= 2147483647)
        return (result);
    else
        return (0);
}
