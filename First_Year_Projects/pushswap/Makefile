##
## EPITECH PROJECT, 2020
## bs_my_printf
## File description:
## Makefile
##

CC	=	gcc

SRC	=	sources/free_node.c	\
		sources/init_node.c	\
		sources/rotate_right.c	\
		sources/swap_list.c	\
		sources/my_getnbr.c	\
		sources/show_list.c	\
		sources/my_put_nbr.c	\
		sources/rotate.c	\
		sources/check_order.c	\
		sources/push_arg2_to_arg1.c	\
		sources/sort_algo.c	\

MAIN	=	sources/main.c

SRC_UT	=	tests/tests_swap_list.c	\
		tests/tests_sort_algo.c	\
		tests/tests_rotate_right.c \

CFLAGS	+=	-Wall -Wextra

CPPFLAGS +=	-I./include

LDFLAGS	=	-lcriterion --coverage

OBJ	=	$(SRC:.c=.o) \
		$(MAIN:.c=.o)

LIB	=	-L./lib/my -lmy

NAME	=	push_swap

TEST	=	tests_run

all:		$(NAME)

$(NAME):	$(OBJ)
		$(CC) -o $(NAME) $(OBJ) $(CFLAGS) $(CPPFLAGS)

clean:
		rm -f $(OBJ)

fclean:		clean
		rm -f $(NAME)
		rm -f $(TEST)
		rm -f *.gcda
		rm -f *.gcno

tests_run:	fclean
		$(CC) -o $(TEST) $(SRC_UT) $(SRC) $(CFLAGS) $(CPPFLAGS) $(LDFLAGS)
		./tests_run

re:		fclean all

.PHONY:		all $(NAME) clean fclean re tests_run
