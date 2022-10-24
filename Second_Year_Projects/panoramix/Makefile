##
## EPITECH PROJECT, 2022
## Delivery_tek_2
## File description:
## Makefile
##

CC	=	gcc

SRC =	main2.c	\
		druid_thread.c	\
		panoramix.c	\
		villager_thread.c

OBJ =	$(SRC:.c=.o)

NAME	=	panoramix

CFLAGS	= -Wall -Wextra

CPPFLAGS = -I ./include

$(NAME): $(OBJ)
		$(CC) -o $(NAME) $(OBJ) -pthread

all: $(NAME)

clean:
		rm -rf $(OBJ)

DEBUG:

fclean: clean
		rm -rf $(NAME)

re:	fclean all

.PHONY:	all $(NAME) clean DEBUG fclean re
