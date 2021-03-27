/*
** EPITECH PROJECT, 2020
** my_strcmp
** File description:
** libraries
*/

int my_strcmp(char const *s1, char const *s2)
{
    int cmp = 0;

    if (s1[0] != s2[0])
        return (s1[0] - s2[0]);
    for (cmp = 0; s1[cmp] == s2[cmp] && s1[cmp] != '\0' && s2[cmp] != '\0';
        cmp++) {
    }
    if (s1[cmp] != s2[cmp])
        return 1;
    return 0;
}
