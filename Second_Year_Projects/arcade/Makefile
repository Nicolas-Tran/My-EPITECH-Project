##
## EPITECH PROJECT, 2022
## NANOTEKSPICE
## File description:
## Makefile
##

CC =		g++

SRC =		main.cpp								\
			core.cpp								\

SRCCURSE	=	lib/Graphicals/Ncurses/ncurses.cpp	\

SRCSDL	=	main.cpp								\

SRCSFML	=	lib/Graphicals/SFML/SFML.cpp			\
			lib/Graphicals/SFML/Element.cpp

SRCPACMAN	=	lib/Games/Pacman/Pacman.cpp			\
				lib/Games/Pacman/Entity.cpp

OBJ =		$(SRC:.cpp=.o)

NAME =		arcade

NCURSESPATH	=	lib/arcade_ncurses.so

SDL2PATH	=	lib/arcade_sdl2.so

SFMLPATH	=	lib/arcade_sfml.so

PACMAN	=	lib/arcade_pacman.so

CPPFLAGS =	-W -Wall -Wextra -ldl -fno-gnu-unique

SHAREDFLAGS	=	-fPIC -shared

all: graphicals games core

core: $(OBJ)
	$(CC) -o $(NAME) $(OBJ) $(CPPFLAGS)

games:
	$(CC) $(SHAREDFLAGS) $(CPPFLAGS) $(SRCPACMAN) -o $(PACMAN) -I/lib/Games

graphicals: 
	$(CC) $(SHAREDFLAGS) $(CPPFLAGS) $(SRCCURSE) -o $(NCURSESPATH) -I/lib/Ncurses/games -lncurses 
	$(CC) $(SHAREDFLAGS) $(CPPFLAGS) $(SRCSDL) -o $(SDL2PATH)
	$(CC) $(SHAREDFLAGS) $(CPPFLAGS) $(SRCSFML) -o $(SFMLPATH) -I/lib/Graphicals/SFML -lsfml-graphics

debug:	CPPFLAGS += -g3
debug:	$(NAME)

clean:
	$(RM) $(OBJ) *~ \#*\#

fclean: clean
	$(RM) -f $(NAME) $(NCURSESPATH) $(SDL2PATH) $(SFMLPATH) $(PACMAN) a.out

re: fclean all

.PHONY: all debug clean fclean re core games graphicals
