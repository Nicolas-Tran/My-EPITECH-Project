/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** main2
*/

#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#include "panoramix.h"
#include <stdlib.h>

void print_usage(void)
{
    write(2, "USAGE: ./panoramix <nb_villagers> <pot_size> <nb_fights>"
            "<nb_refills> \nValues must be >0.\n", 89);
}

int main(int ac, char **av)
{
    if (ac != 5) {
        print_usage();
        return 84;
    }
    for (int i = 1; i < ac; i++)
        if (atoi(av[i]) <= 0) {
            print_usage();
            return 84;
        }
    panoramix_function(av);
    return 0;
}