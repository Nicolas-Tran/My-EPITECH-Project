##
## EPITECH PROJECT, 2020
## Phoenix_Bootcamp_Day03
## File description:
## Makefile
##

CC	=	gcc

SRC	=	sources/my_strcmp.c\
		sources/buffer_to_array.c\
		sources/mem_alloc_2d_array.c\
		sources/make_map_from_string.c\
		sources/mysokoban_function.c\
		sources/get_position.c\
		sources/move_player.c\
		sources/print_resize_window.c\
		sources/win_conditions.c\
		sources/lose_conditions.c\

MAIN	=	main.c			\

SRC_UT	=	tests/tests_my_strcmp.c	\
		tests/tests_make_map_from_string.c\
		tests/tests_get_position.c\

CFLAGS	=	-Wall -Wextra

CPPFLAGS=	-I./includes

LDFLAGS=	-lcriterion --coverage

OBJ	=	$(SRC:.c=.o)	\
		$(MAIN:.c=.o)

NAME	=	my_sokoban

TEST	=	tests_run

all:		$(NAME)

$(NAME):	$(OBJ)
		$(CC) -o $(NAME) $(OBJ) $(CFLAGS) $(CPPFLAGS) -lncurses

DEBUG:		CFLAGS += -g3
DEBUG:		$(NAME)

clean:
		rm -f $(OBJ)

fclean:		clean
		rm -f $(NAME)
		rm -f $(TEST)
		rm -f *.gcda
		rm -f *.gcno

tests_run:	fclean
		$(CC) -o $(TEST) $(SRC) $(SRC_UT) $(LDFLAGS) $(CPPFLAGS) $(CFLAGS) -lncurses
		./tests_run

re:		fclean all
