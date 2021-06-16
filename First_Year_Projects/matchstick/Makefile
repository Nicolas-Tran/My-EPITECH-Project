##
## EPITECH PROJECT, 2020
## Phoenix_Bootcamp_Day03
## File description:
## Makefile
##

CC	=	gcc

SRC	=	sources/print_game_board.c\
		sources/my_getnbr.c\
		sources/print_updated_board_game.c\
		sources/my_putstr.c\
		sources/my_strlen.c\
		sources/print_2d_array.c\
		sources/get_board_game.c\
		sources/read_player_move_and_print_updated_board_game.c\
		sources/matchstick_function.c\
		sources/free_board_game.c\
		sources/count_matches.c\

MAIN	=	main.c			\

SRC_UT	=	\

CFLAGS	=	-Wall -Wextra

CPPFLAGS=	-I./includes

LIB     =       -L./myprintf -lmy

LDFLAGS=	-lcriterion --coverage

OBJ	=	$(SRC:.c=.o)	\
		$(MAIN:.c=.o)

NAME	=	matchstick

TEST	=	tests_run

all:		$(NAME)

$(NAME):	$(OBJ)
		make -C ./myprintf
		$(CC) -o $(NAME) $(OBJ) $(CFLAGS) $(CPPFLAGS) $(LIB)

DEBUG:		CFLAGS += -g3
DEBUG:		$(NAME)

clean:
		rm -f $(OBJ)

fclean:		clean
		make fclean -C ./myprintf
		rm -f $(NAME)
		rm -f $(TEST)
		rm -f *.gcda
		rm -f *.gcno

tests_run:	fclean
		$(CC) -o $(TEST) $(SRC) $(SRC_UT) $(LDFLAGS) $(CPPFLAGS) $(CFLAGS) -lncurses
		./tests_run

re:		fclean all

.PHONY: all $(NAME) DEBUG clean fclean tests_run re
