/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** panoramix
*/

#include "panoramix.h"
#include <stdlib.h>

panoramix_t init_panoramix(char **av)
{
    panoramix_t panoramix = {};
    panoramix.nb_villagers = atoi(av[1]);
    panoramix.pot_size = atoi(av[2]);
    panoramix.nb_fight = atoi(av[3]);
    panoramix.nb_refills = atoi(av[4]);
    panoramix.nb_pot_refills = panoramix.pot_size;
    panoramix.id = 0;
    sem_init(&(panoramix.sem_villager), 0, panoramix.nb_villagers + 1);
    sem_init(&(panoramix.sem_druid), 0, 0);
    return panoramix;
}

int panoramix_function(char **av)
{
    pthread_t *t;
    panoramix_t panoramix = {};

    t = malloc(sizeof(pthread_t) * panoramix.nb_villagers);
    panoramix = init_panoramix(av);
    pthread_create(&t[0], NULL, thread2, &panoramix);
    for (int i = 1; i < panoramix.nb_villagers + 1; i++)
        pthread_create(&t[i], NULL, thread, &panoramix);
    for (int i = 0; i < panoramix.nb_villagers + 1; i++)
        pthread_join(t[i], NULL);
    sem_destroy(&panoramix.sem_druid);
    sem_destroy(&panoramix.sem_villager);
    free(t);
    return 0;
}