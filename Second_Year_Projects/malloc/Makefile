##
## EPITECH PROJECT, 2021
## Makefile
## File description:
## compile
##

CC	=	gcc

SRC	=	alloc_function.c	\
		linked_list_function.c\

OBJ	=	$(SRC:.c=.o)

NAME	=	libmy_malloc.so

CFLAGS	=	-c -Wall -Wextra

CPPFLAGS	=	-fpic

all:	$(NAME)

$(NAME):	$(OBJ)
	$(CC) $(OBJ) $(CPPFLAGS) $(CFLAGS)
	$(CC) -shared -o $(NAME) $(OBJ)

DEBUG:	CFLAGS += -g3
DEBUG:	$(NAME)

clean:
	rm -f $(OBJ)

fclean:	clean
	rm -f $(NAME)

re:	fclean all

.PHONY : all $(NAME) clean DEBUG fclean re
