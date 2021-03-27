/*
** EPITECH PROJECT, 2020
** bsq
** File description:
** main.c
*/

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "my.h"

int main(int ac, char **av)
{
    struct stat buf;
    char *buff = NULL;
    char **map = NULL;
    int fd = open(av[1], O_RDONLY);

    if (ac < 2)
        return 84;
    if (fd == -1)
        return 84;
    stat(av[1], &buf);
    buff = malloc(sizeof(char) * (buf.st_size + 1));
    read(fd, buff, buf.st_size);
    buff[buf.st_size] = '\0';
    map = buffer_to_array(buff);
    find_square(map, buff);
    print_2d_array(map);
    free_2d_array(map, count_raws(buff));
    free(buff);
    return (0);
}
