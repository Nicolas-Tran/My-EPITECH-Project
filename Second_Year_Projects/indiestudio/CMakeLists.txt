cmake_minimum_required(VERSION 3.0.0)
project(bomberman)

include(CTest)
include_directories(Raylib/
                    Raylib/Audio/
                    Raylib/Camera/
                    Raylib/Graphics/
                    Raylib/Input/
                    Raylib/Shapes/
                    Raylib/Vector/
                    Src/
                    Src/Game_Object/
                    Src/Game_Object/PowerUp/
                    Src/Scene/
                    Src/Save/
                    Inc/
                    Core/
                    Map/
                    ./)
enable_testing()

#set(CMAKE_CXX_FALGS_DEBUG "-g3")
add_definitions(-g3)

include(FetchContent)
set(BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(BUILD_GAMES    OFF CACHE BOOL "" FORCE)
FetchContent_Declare(raylib GIT_REPOSITORY https://github.com/raysan5/raylib.git GIT_TAG master)
FetchContent_MakeAvailable(raylib)
FetchContent_Declare(json URL https://github.com/nlohmann/json/releases/download/v3.10.5/json.tar.xz)
FetchContent_MakeAvailable(json)

add_executable(bomberman    MyMain.cpp
                            Raylib/Camera/Camera2D.cpp
                            Raylib/Camera/Camera3D.cpp
                            Raylib/Graphics/Color.cpp
                            Raylib/Graphics/Shader.cpp
                            Raylib/Graphics/Text.cpp
                            Raylib/Graphics/Texture.cpp
                            Raylib/Graphics/Window.cpp
                            Raylib/Graphics/Animation.cpp
                            Raylib/Shapes/Rectangle.cpp
                            Raylib/Shapes/Cube.cpp
                            Raylib/Vector/Vector2.cpp
                            Raylib/Vector/Vector3.cpp
                            Raylib/Vector/Vector4.cpp
                            Raylib/Graphics/Model.cpp
                            Raylib/Input/Mouse.cpp
                            Raylib/Audio/Sound.cpp
                            Src/Chrono.cpp
                            Src/Game_Object/BombermanMap.cpp
                            Src/Button.cpp
                            Src/Game_Object/Player.cpp
                            Src/Scene/Pause.cpp
                            Src/Scene/Menu.cpp
                            Src/Scene/Win.cpp
                            Src/Game_Object/PowerUp/bombDown.cpp
                            Src/Game_Object/PowerUp/bombUp.cpp
                            Src/Game_Object/PowerUp/fireDown.cpp
                            Src/Game_Object/PowerUp/fireMax.cpp
                            Src/Game_Object/PowerUp/fireUp.cpp
                            Src/Game_Object/PowerUp/penetrationBomb.cpp
                            Src/Game_Object/PowerUp/speedDown.cpp
                            Src/Game_Object/PowerUp/speedUp.cpp
                            Src/Scene/Game.cpp
                            Src/Game_Object/Bomb.cpp
                            Src/Options.cpp
                            Core/Core.cpp
                            Src/Game_Object/PowerUp/powerBomb.cpp
                            Src/Game_Object/IA.cpp
                            Src/Scene/Settings.cpp
                            Raylib/Audio/AudioDevice.cpp
                            Raylib/Audio/Music.cpp
                        )

target_link_libraries(bomberman raylib nlohmann_json::nlohmann_json)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
