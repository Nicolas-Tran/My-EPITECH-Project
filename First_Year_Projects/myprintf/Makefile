##
## EPITECH PROJECT, 2020
## bs_my_printf
## File description:
## Makefile
##

SRC	=	sources/disp_stdarg.c			\
		sources/my_printf.c			\
		sources/my_put_nbr.c			\
		sources/my_putstr.c			\
		sources/my_putchar.c			\
		sources/my_strlen.c			\
		sources/my_revstr.c			\

SRC_UT	=	tests/tests_my_printf.c			\

CFLAGS	=	-Wall -Wextra

CPPFLAGS=	-I./includes

LDFLAGS	=	-lcriterion --coverage

OBJ	=	$(SRC:.c=.o)

LIB	=	-L. -lmy

NAME	=	libmy.a


TEST	=	tests_run

all:		$(NAME)

$(NAME):	$(OBJ)
		ar rc $(NAME) $(OBJ)

clean:
		rm -f $(OBJ)

fclean:		clean
		rm -f $(NAME)
		rm -f $(TEST)
		rm -f *.gcda
		rm -f *.gcno

re:		fclean all

tests_run:	fclean $(NAME)
		gcc -o $(TEST) $(SRC_UT) $(CFLAGS) $(CPPFLAGS) $(LDFLAGS) $(LIB)
		./tests_run

.PHONY:		all $(NAME) clean fclean re tests_run
