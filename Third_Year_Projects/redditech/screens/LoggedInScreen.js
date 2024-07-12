import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking, ScrollView, RefreshControl, Button, TextInput, AsyncStorage } from "react-native";
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker} from "@react-native-picker/picker";
import ProfileScreen from './ProfileScreen';

export default function LoggedInScreen({ }) {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [subredditName, setSubredditName] = useState("");
  const [subredditNames, setSubredditNames] = useState([]);
  const [subredditFullName, setSubredditFullName] = useState("");
  const [postsNew, setPostsNew] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const handlePress = (url) => {
    Linking.openURL(url);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [subredditProfile, setSubredditProfile] = useState([]);
  const [gotoProfile, setGotoProfile] = useState(false);

  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);
  const onClearText = () => {
    setSearchTerm('');
    setShowSearchBar(!showSearchBar);
  };
  const [selectedValue, setSelectedValue] = useState('new');

  const handleValueChange = (value) => {
    setSelectedValue(value);
    // call the appropriate function based on the selected value
    switch (value) {
      case 'hot':
        getHotPosts();
        break;
      case 'new':
        getNewPosts();
        break;
      case 'best':
        getBestPosts();
        break;
      default:
        break;
    }
  };

  let token = "";
  console.log(subredditNames);

  const JoinSubredditButton = () => {
    const isSubscribed = () => {
      if (subredditNames.includes(subredditName.substring(2))) {
        return true;
      } else {
        return false;
      }
    };
  
    const [subscribed, setSubscribed] = useState(isSubscribed());
  
    const toggleSubscription = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (subscribed) {
        // Unsubscribe the user from the subreddit
        const response = await fetch(
          `https://oauth.reddit.com/api/subscribe?sr=${subredditFullName}&action=unsub`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.ok) {
          // Update the subscribed state variable 
          setSubscribed(false);
        }
      } else {
        // Subscribe the user to the subreddit
        const response = await fetch(
          `https://oauth.reddit.com/api/subscribe?sr=${subredditFullName}&action=sub`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.ok) {
          // Update the subscribed state variable
          setSubscribed(true);
        }
      }
    };
  
    return (
      <TouchableOpacity onPress={toggleSubscription}>
        <Text
          style={subscribed ? styles.unsubscribeButton : styles.subscribeButton}
        >
          {subscribed ? "Leave" : "Join"}
        </Text>
      </TouchableOpacity>
    );
  };
  
  
  const ShowUserProfile = async () => {
    setIsSearching(false)
    setGotoProfile(false)
    setIsViewingOwnProfile(true);
  };

  const ShowSubredditProfile = async (subredditName) => {
    fetch("https://oauth.reddit.com/" + subredditName + "/about.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const subredditProfil = data.data;
        const subredditFullname = subredditProfil.name;
        setSubredditProfile(subredditProfil);
        setGotoProfile(true);
        setSubredditName(subredditName);
        setSubredditFullName(subredditFullname);
        setIsSearching(false);
        setIsViewingOwnProfile(false);
        console.log(`Fullname of the subreddit '${subredditName}': ${subredditFullname}`);
      })
      .catch((error) => console.error(error));

    fetch("https://reddit.com/" + subredditName + "/new.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        setPostsNew(posts);
        setIsSearching(false);
      })
      .catch((error) => console.error(error));
  };


  const fetchUserData = async () => {
    token = await AsyncStorage.getItem('accessToken');

    if (token) {
      // Get user profile data
      fetch("https://oauth.reddit.com/api/v1/me.json", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const { name, icon_img, subreddit } = data;
          setUsername(name); // Update the username state variable
          setImage(icon_img);
          setDescription(subreddit ? subreddit.public_description : "");
          setGotoProfile(false)
        })
        .catch((error) => {
          console.error(error);
        });

      // Get user subreddit karma breakdown
      fetch("https://oauth.reddit.com/subreddits/mine/subscriber", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const subredditNames = data.data.children.map(
            (child) => child.data.display_name
          );
          setSubredditNames(subredditNames);
        })
        .catch((error) => console.error(error));

      // Get user subreddit posts
      getNewPosts();
    }
  };

  const getNewPosts = async () => {
    fetch("https://oauth.reddit.com/new.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        setPostsNew(posts);
        setGotoProfile(false);
        setIsSearching(false);
      })
      .catch((error) => console.error(error));
  };

  const getHotPosts = async () => {
    fetch("https://oauth.reddit.com/hot.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())

      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        setPostsNew(posts);
        setGotoProfile(false)
        setIsSearching(false);
      })
      .catch((error) => console.error(error));
  };

  const getBestPosts = async () => {
    fetch("https://oauth.reddit.com/best.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())

      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        setPostsNew(posts);
        setGotoProfile(false)
        setIsSearching(false);
      })
      .catch((error) => console.error(error));

  };

  const handleSearch = async () => {
    fetch(`https://oauth.reddit.com/search.json?q=${searchTerm}&type=sr`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())

      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        setSearchResults(posts);
        setGotoProfile(false);
        setIsSearching(true);
      })
      .catch((error) => console.error(error));
  };

  const returnHome = () => {
    setIsViewingOwnProfile(false);
    setGotoProfile(false);
    setIsSearching(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setIsViewingOwnProfile(false);
    fetchUserData().then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
       <View style={styles.nav}>
        {!showSearchBar && (
          <>
            {/* <Text style={styles.username}>{username}</Text> */}
            <TouchableOpacity onPress={ShowUserProfile}>
              <Image style={styles.image} source={{ uri: image }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSearchBar}>
              <Icon name="search" size={20} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerContainer} onPress={returnHome}>
            <Icon name="home" size={20} color="white" style={styles.iconHome} />
              <Picker 
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleValueChange(itemValue)}
              >
                <Picker.Item label="New ↓" value="new" />
                <Picker.Item label="Hot" value="hot" />
                <Picker.Item label="Best ↑" value="best" />
              </Picker>
            </TouchableOpacity>
          </>
        )}
        {showSearchBar && (
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search reddit..."
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
              onSubmitEditing={handleSearch}
              disabled={!searchTerm}
              autoFocus
            />
            {searchTerm.length >= 0 && (
              <Icon name="times-circle" size={20} color="#888" style={styles.clearIcon} onPress={onClearText} />
            )}
          </View>
        )}
      </View>
      {isViewingOwnProfile && (
      <ProfileScreen isViewingOwnProfile={isViewingOwnProfile} />
      )}
      {!isViewingOwnProfile && (
      <ScrollView style={styles.main}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {gotoProfile ? (
          <View style={styles.subReddit}>
            {subredditProfile.header_img && (
            <Image 
              source={{ uri: subredditProfile.header_img }} 
              style={styles.profilePic}
            />
            )}
            <Text style={styles.subName}>
              {subredditProfile.display_name_prefixed}
            </Text>
            <Text style={styles.subTitle}>
              {subredditProfile.title}
            </Text>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'baseline', 
              marginBottom: 10 
            }}>
              <Icon name="users" size={18} color="#1A1A1B" />
              <Text style={styles.subMembers}>
                {subredditProfile.subscribers} membres
              </Text>
            </View>

            <Text style={styles.subDescription}>
              <Icon name="book" size={18} color="#1A1A1B" style={{marginRight:5}}/>  {subredditProfile.public_description}
            </Text>
            <JoinSubredditButton/>
          </View>



        ) : (<View></View>
        )}

        {isSearching ? (


          searchResults.map((searchResults) => (
            <View style={styles.publication} key={searchResults.id}>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => ShowSubredditProfile(searchResults.display_name_prefixed)}>
                  <Text style={styles.author}>{searchResults.display_name_prefixed} </Text>
                </TouchableOpacity>
                <Text style={styles.author2}>• {searchResults.subscribers} membres</Text>
              </View>

              <Text style={styles.title}>{searchResults.public_description}</Text>
              {searchResults.selftext && <Text style={styles.text}>{searchResults.selftext}</Text>}
              {searchResults.url_overridden_by_dest && (
                <TouchableOpacity onPress={() => handlePress(searchResults.url_overridden_by_dest)}>
                  <Text style={styles.text}>{searchResults.url_overridden_by_dest}</Text>
                </TouchableOpacity>
              )}
              {searchResults.thumbnail && searchResults.url_overridden_by_dest && (
                <View style={styles.subImage}>
                  <Image style={{ flex: 1 }} source={{
                    uri: searchResults.thumbnail.startsWith("http") ? searchResults.thumbnail : undefined,
                  }} />
                </View>
              )}
            </View>
          ))

        ) : (

          postsNew.map((post) => (
            <View style={styles.publication} key={post.id}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => ShowSubredditProfile(post.subreddit_name_prefixed)}>
                  <Text style={styles.author}>r/{post.subreddit} </Text>
                </TouchableOpacity>
                <Text style={styles.author2}>• posted by u/{post.author}</Text>
              </View>
              <Text style={styles.title}>{post.title}</Text>
              {post.selftext && <Text style={styles.text}>{post.selftext}</Text>}
              {post.url_overridden_by_dest && (
                <TouchableOpacity onPress={() => handlePress(post.url_overridden_by_dest)}>
                  <Text style={styles.text}>{post.url_overridden_by_dest}</Text>
                </TouchableOpacity>
              )}
              {post.thumbnail && post.url_overridden_by_dest && (
                <View style={styles.subImage}>
                  <Image style={{ flex: 1 }} source={{
                    uri: post.thumbnail.startsWith("http") ? post.thumbnail : undefined,
                  }} />
                </View>
              )} 
            </View>
          ))


        )}
      </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "black",
    overflow: "scroll",
  },
  nav: {
    flexDirection: "row-reverse",
    alignItems: "center",
    // justifyContent: "flex -end",
    height: 50,
    gap: 16,
    borderBottomWidth: 1,
    backgroundColor: "#1d1e20",
    borderBottomColor: "#3a3c40",
    overflow: "hidden",
  },
  username: {
    fontWeight: "bold",
    marginRight: 8,
    color: "white",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  pickerContainer: {
    flex: 1,
    maxHeight: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "43%",
    backgroundColor: "grey",
    overflow: "hidden",
    borderRadius: 7,
    flexDirection: "row",
  },
  picker: {
    maxHeight: "100%",
    width: "87%",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  iconHome: {
    marginLeft:5,
    marginRight:3,
  },
  main: {
    flex: 1,
    padding: 16,
  },
  publication: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#3a3c40",
    borderRadius: 8,
    padding: 16,
  },
  author: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "skyblue",
  },
  author2: {
    color: "grey",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "skyblue",
  },
  text: {
    marginBottom: 8,
    color: "white",
  },
  subImage: {
    marginTop: 8,
    aspectRatio: 1.5,
    borderWidth: 1,
    maxHeight: 350,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  icon: {
    marginHorizontal: 10,
    alignSelf: "flex-start",
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    margin: 10,
    padding: 5,
  },
  searchIcon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  clearIcon: {
    marginHorizontal: 5,
  },
  cancelButton: {
    color: '#007AFF',
    marginLeft: 10,
  },
  subReddit: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "grey",
    elevation: 2,
    marginBottom: 10,
    flex: 1,
  },
  profilePic: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
    resizeMode: 'stretch'
  },
  subName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1A1A1B'
  },
  subTitle: {
    fontSize: 18, 
    marginBottom: 10, 
    color: '#1A1A1B'
  },
  subDescription: {
    fontSize: 13,  
    color: '#1A1A1B' 
  },
  subMembers: {
    fontSize: 16, 
    marginLeft: 5, 
    color: '#1A1A1B' 
  },
  subscribeButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    width: "30%",
    alignSelf: "flex-end",
  },
  unsubscribeButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius:8,
    width: "30%",
    alignSelf: "flex-end",
  },
});