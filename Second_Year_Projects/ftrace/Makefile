##
## EPITECH PROJECT, 2022
## Delivery_tek_2
## File description:
## Makefile
##

CC	=	gcc

SRC =	main.c	\
		src/print_arg.c	\
		src/print_function.c	\
		src/strace.c	\

OBJ =	$(SRC:.c=.o)

NAME	=	ftrace

CFLAGS	= -Wall -Wextra

CPPFLAGS = -I ./include

$(NAME): $(OBJ)
		$(CC) -o $(NAME) $(OBJ) -lelf

all: $(NAME)

clean:
		rm -rf $(OBJ)

DEBUG:

fclean: clean
		rm -rf $(NAME)

re:	fclean all

.PHONY:	all $(NAME) clean DEBUG fclean re
