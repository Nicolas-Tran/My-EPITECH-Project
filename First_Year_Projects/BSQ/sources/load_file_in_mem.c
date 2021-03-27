/*
** EPITECH PROJECT, 2020
** bsbsq
** File description:
** load_file_in_mem.c
*/

#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>

char *load_file_in_mem(char const *filepath)
{
    struct stat buf;
    char *buff;
    int fd = open(filepath, O_RDONLY);

    stat(filepath, &buf);
    buff = malloc(sizeof(char) * buf.st_size);
    read(fd, buff, buf.st_size);
    return(buff);
}
