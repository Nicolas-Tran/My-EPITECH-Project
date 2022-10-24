/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** main
*/

#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/ptrace.h>
#include <sys/user.h>
#include <unistd.h>
#include <sys/resource.h>
#include <sys/wait.h>
#include <string.h>
#include "syscall.h"
#include "strace.h"
#include "struct.h"

int main(int ac, char *const *av, char *const *const env)
{
    if (ac != 2)
        return 84;
    if (strcmp(av[1], "--help") == 0 || strcmp(av[1], "-h") == 0)
        printf("USAGE: ftrace <command>\n");
    strace(av[1], av, env);
    print_function(av);
    return 0;
}