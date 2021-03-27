##
## EPITECH PROJECT, 2020
## BSQ
## File description:
## Makefile
##

SRC	=	sources/main.c			\
		sources/load_file_in_mem.c	\
		sources/my_getnbr.c		\
		sources/count_raws.c		\
		sources/count_cols.c		\
		sources/replace_x.c		\
		sources/buffer_to_array.c	\
		sources/is_square_of_size.c	\
		sources/mem_alloc_2d_array.c	\
		sources/free_2d_array.c		\
		sources/print_2d_array.c	\
		sources/my_putstr.c		\
		sources/my_putchar.c		\
		sources/find_square.c		\

CFLAGS	=	-Wall -Wextra

CPPFLAGS=	-I.

OBJ	=	$(SRC:.c=.o)

NAME	=	bsq

all:		$(NAME)

$(NAME):	$(OBJ)
		gcc -o $(NAME) $(OBJ)

clean:
		rm -f $(OBJ)

fclean:         clean
		rm -f $(NAME)
		~/my_scripts/mr_clean

re:             fclean all

unit_tests:     fclean $(NAME)
		gcc -o tests_run $(SRC_UT) $(CFLAGS) $(CPPFLAGS) $(LDFLAGS) $(LIB)

run_tests:      unit_tests
		./tests_run

.PHONY:         all $(NAME) clean fclean re unit_tests run_tests
