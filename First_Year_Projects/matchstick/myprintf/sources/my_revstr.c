/*
** EPITECH PROJECT, 2020
** my_revstr
** File description:
** task03
*/

#include "my.h"

char *my_revstr(char *str)
{
    int i;
    int j;
    char tmp;

    for (i = 0; str[i] != '\0'; i++);
    for (j = 0; j != my_strlen(str) / 2; j++) {
        tmp = str[i - 1];
        str[i - 1] = str [j];
        str[j] = tmp;
        i--;
    }
    return (str);
}
