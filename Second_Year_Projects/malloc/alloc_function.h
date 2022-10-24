/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** alloc_function
*/

#ifndef ALLOC_FUNCTION_H_
#define ALLOC_FUNCTION_H_

#include <unistd.h>

extern void *space;

void *malloc(size_t size);
void free(void *ptr);
void *calloc(size_t nmemb, size_t size);
void *realloc(void *ptr, size_t size);
void *reallocarray(void *ptr, size_t nmemb, size_t size);

#endif /* !ALLOC_FUNCTION_H_ */
