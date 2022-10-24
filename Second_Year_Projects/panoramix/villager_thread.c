/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** villager_thread
*/

#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include "panoramix.h"
#include <unistd.h>

void call_refills(panoramix_t *villager)
{
    sem_wait(&(villager)->sem_villager);
    printf("Villager <%d>: Hey Pano wake up! We need more potion.\n",
        villager->id);
    sem_post(&(villager)->sem_druid);
    sleep(1);
}

void *thread(void *arg)
{
    panoramix_t *villager = (panoramix_t *)arg;
    int f2 = villager->nb_fight;

    printf("Villager <%d>: Going into battle !\n", villager->id);
    while (f2 != 0) {
        pthread_mutex_lock(&(villager)->lock);
        printf("Villager <%d>: I need a drink... I see <%d> servings left.\n",
                villager->id, villager->pot_size);
        if (villager->pot_size <= 0)
            call_refills(villager);
        pthread_mutex_unlock(&(villager)->lock);
        villager->pot_size--;
        f2--;
        printf("Villager <%d>: Take that roman scum! Only <%d> left\n",
                villager->id, f2);
    }
    printf("I’m going to sleep now.\n");
    return NULL;
}