/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** druid_thread
*/

#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include "panoramix.h"

void *thread2(void *arg)
{
    panoramix_t *druid = (panoramix_t *)arg;

    printf("druid: I'm ready... but sleepy ...\n");
    while (druid->nb_refills > 0) {
        sem_wait(&(druid->sem_druid));
        druid->nb_refills--;
        printf("Ah! Yes, yes, I'm awake! Working on it! Beware I can only "
                "make <%d> more refills after this one.\n",
                druid->nb_refills);
        druid->pot_size = druid->nb_pot_refills;
        sem_post(&(druid->sem_villager));
    }
    printf("Druid: I'm out of viscum. I'm going back to... zZz\n");
    return NULL;
}