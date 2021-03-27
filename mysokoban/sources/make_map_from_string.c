/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** make_map_from_string.c
*/

#include "sokoban.h"
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>

char **buffer_to_array(char *buff);

static int check_map(char *buff)
{
    if (buff == NULL)
        return 84;
    for (int i = 0; buff[i] != '\0'; i++)
        if (buff[i] != ' ' && buff[i] != '#' && buff[i] != 'P' &&
            buff[i] != 'X' && buff[i] != 'O' && buff[i] != '\n')
            return 84;
    return 0;
}

char **make_map_from_string(char *map_pathname)
{
    struct stat buf;
    int fd = open(map_pathname, O_RDONLY);
    char *buff = NULL;
    char **map = NULL;

    if (fd == -1)
        return NULL;
    stat(map_pathname, &buf);
    if (S_ISREG(buf.st_mode) != 1)
        return NULL;
    buff = malloc(sizeof(char) * (buf.st_size + 1));
    read (fd, buff, buf.st_size);
    buff[buf.st_size] = '\0';
    if (check_map(buff) != 0)
        return NULL;
    map = buffer_to_array(buff);
    free(buff);
    return map;
}
