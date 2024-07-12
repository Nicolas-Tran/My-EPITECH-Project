import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  RefreshControl,
  Button,
  TextInput,
  Image,
  AsyncStorage,
  Switch,
} from "react-native";

const ProfileScreen = ({}) => {
  const [username, setUsername] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [title, setTitle] = useState("");
  const [subredditType, setSubredditType] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [NightMode, setNightMode] = useState(false);
  const [VideoAutoplay, setVideoAutoplay] = useState(false);
  const [showPresence, setShowPresence] = useState(false);
  const [enableFollowers, setEnableFollowers] = useState(false);
  const [feedRecommendations, setFeedRecommendations] = useState(false);

  const handleDescriptionSubmit = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      fetch("https://oauth.reddit.com/api/site_admin.json", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_type: "json",
          description: newDescription,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated subreddit description:", data);
          setSubreddit(data.public_description);
          setNewDescription("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getPrefs = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    fetch("https://oauth.reddit.com/api/v1/me/prefs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful response
        setNightMode(data.nightmode);
        setVideoAutoplay(data.video_autoplay);
        setShowPresence(data.show_presence);
        setEnableFollowers(data.enable_followers);
        setFeedRecommendations(data.feed_recommendations_enabled);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleFeedRecommendations = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "myBot/0.0.1",
      "Content-Type": "application/json",
    };
    var data = {
      feed_recommendations_enabled: feedRecommendations,
    };
    if (feedRecommendations == true) {
      data = {
        feed_recommendations_enabled: false,
      };
      setFeedRecommendations(false);
    } else {
      data = {
        feed_recommendations_enabled: true,
      };
      setFeedRecommendations(true);
    }
    fetch("https://oauth.reddit.com/api/v1/me/prefs", {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  };

  const handleEnableFollowers = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "myBot/0.0.1",
      "Content-Type": "application/json",
    };
    var data = {
      enable_followers: enableFollowers,
    };
    if (enableFollowers == true) {
      data = {
        enable_followers: false,
      };
      setEnableFollowers(false);
    } else {
      data = {
        enable_followers: true,
      };
      setEnableFollowers(true);
    }
    fetch("https://oauth.reddit.com/api/v1/me/prefs", {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  };

  const handleShowPresence = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "myBot/0.0.1",
      "Content-Type": "application/json",
    };
    var data = {
      show_presence: showPresence,
    };
    if (showPresence == true) {
      data = {
        show_presence: false,
      };
      setShowPresence(false);
    } else {
      data = {
        show_presence: true,
      };
      setShowPresence(true);
    }
    fetch("https://oauth.reddit.com/api/v1/me/prefs", {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  };

  const handleUsernameSubmit = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "myBot/0.0.1",
      "Content-Type": "application/json",
    };
    var data = {
      nightmode: NightMode,
    };
    if (NightMode == true) {
      data = {
        nightmode: false,
      };
      setNightMode(false);
    } else {
      data = {
        nightmode: true,
      };
      setNightMode(true);
    }
    fetch("https://oauth.reddit.com/api/v1/me/prefs", {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful response

        console.log(NightMode);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleVideoAutoplay = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "myBot/0.0.1",
      "Content-Type": "application/json",
    };
    var data = {
      video_autoplay: VideoAutoplay,
    };
    if (VideoAutoplay == true) {
      data = {
        video_autoplay: false,
      };
      setVideoAutoplay(false);
    } else {
      data = {
        video_autoplay: true,
      };
      setVideoAutoplay(true);
    }
    fetch("https://oauth.reddit.com/api/v1/me/prefs", {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful response
        console.log(data);

        console.log("ProfileScreen.js: NightMode", NightMode);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchUserData();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("accessToken");

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
            // console.log("ProfileScreen.js: pl", data);
            const { name, icon_img, subreddit, title } = data;
            setUsername(name);
            setIconUrl(icon_img);
            setSubreddit(subreddit ? subreddit.public_description : "");
            setTitle(subreddit.title);
            setSubredditType(subreddit.subreddit_type);
            setSubscriberCount(subreddit.subscribers);
            setNightMode(data.pref_nightmode);
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
    fetchUserData();
    getPrefs();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.profileInfo}>
          <Image style={styles.profileIcon} source={{ uri: iconUrl }} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.subreddit}>{subreddit}</Text>
          <Text style={styles.subredditType}>{subredditType}</Text>
          <Text style={styles.subscriberCount}>
            {subscriberCount} subscribers
          </Text>
          <Text style={styles.title}>title: {title}</Text>
          <View style={styles.parameters}>
            <Switch
              style={styles.switch}
              value={NightMode}
              onValueChange={handleUsernameSubmit}
            />
            <Text style={styles.text}>
              {NightMode ? "Night Mode" : "Day Mode"}
            </Text>
          </View>

          <View style={styles.parameters}>
            <Switch
              style={styles.switch}
              value={VideoAutoplay}
              onValueChange={handleVideoAutoplay}
            />
            <Text style={styles.text}>
              {VideoAutoplay ? "Autoplay" : "Not Autoplay"}
            </Text>
          </View>

          <View style={styles.parameters}>
            <Switch
              style={styles.switch}
              value={!showPresence}
              onValueChange={handleShowPresence}
            />
            <Text style={styles.text}>
              {showPresence ? "I am Visible" : "I am Invisible"}
            </Text>
          </View>

          <View style={styles.parameters}>
            <Switch
              style={styles.switch}
              value={enableFollowers}
              onValueChange={handleEnableFollowers}
            />
            <Text style={styles.text}>
              {enableFollowers ? "enable followers" : "Do not enable followers"}
            </Text>
          </View>

          <View style={styles.parameters}>
            <Switch
              style={styles.switch}
              value={feedRecommendations}
              onValueChange={handleFeedRecommendations}
            />
            <Text style={styles.text}>
              {" "}
              {feedRecommendations
                ? "feedRecommendations activate"
                : "feedRecommendations desactivate"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
    color: "#fff",
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  subreddit: {
    color: "#BDBDBD",
    marginRight: 5,
  },
  subredditType: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color: "#fff",
  },
  subscriberCount: {
    color: "#BDBDBD",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
  },
  description: {
    marginBottom: 10,
  },
  descriptionInput: {
    backgroundColor: "#424242",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  descriptionButton: {
    backgroundColor: "#BB86FC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  usernameInput: {
    backgroundColor: "#424242",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  usernameButton: {
    backgroundColor: "#BB86FC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  subredditTypeLabel: {
    color: "#BDBDBD",
    marginRight: 10,
  },
  subredditTypeButtons: {
    flexDirection: "row",
  },
  subredditTypeButton: {
    backgroundColor: "#424242",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  subredditTypeButtonSelected: {
    backgroundColor: "#BB86FC",
  },
  subredditTypeButtonText: {
    color: "#fff",
  },
  subredditIconInput: {
    backgroundColor: "#424242",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  subredditIconButton: {
    backgroundColor: "#BB86FC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  subredditTitleInput: {
    backgroundColor: "#424242",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  subredditTitleButton: {
    backgroundColor: "#BB86FC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF5252",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    color: "#fff",
  },
  buttonText: {
    color: "#121212",
  },
  parameters: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ProfileScreen;
