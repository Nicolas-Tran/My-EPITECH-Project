/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** panoramix
*/

#ifndef PANORAMIX_H_
#define PANORAMIX_H_

#include <stddef.h>
#include <pthread.h>
#include <semaphore.h>

typedef struct panoramix_s
{
    int nb_villagers;
    int pot_size;
    int nb_fight;
    int nb_refills;
    int nb_pot_refills;
    int id;
    sem_t sem_druid;
    sem_t sem_villager;
    pthread_mutex_t lock;
} panoramix_t;

panoramix_t init_panoramix(char **av);
void *thread2(void *arg);
void *thread(void *arg);
int panoramix_function(char **av);

#endif /* !PANORAMIX_H_ */
