// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   ImageBackground,
//   ScrollView
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const LeaderboardItem = ({ item, index }) => {
//   const getRankColor = () => {
//     // if (index === 0) return "#FFCA28";
//     if (index === 0) return "#C0C0C0";
//     if (index === 1) return "#CD7F32";
//     return "#000";
//   };
//   return (
//     <ScrollView>
//       <View
//         style={[
//           styles.itemContainer,
//           {
//             borderBottomColor: index < 3 ? getRankColor() : "#E0E0E0",
//           },
//         ]}
//       >
//         <Ionicons name="arrow-up" color={"green"} size={20} />

//         <View style={styles.rankContainer}>
//           <Text style={[styles.rankText, , { color: getRankColor() }]}>
//             {index + 2}
//           </Text>
//         </View>
//         <Image source={{ uri: item.avatar }} style={styles.avatar} />
//         <View style={styles.userInfo}>
//           <Text style={[styles.name, { color: getRankColor() }]}>
//             {item.name}
//           </Text>
//           <Text style={styles.username}>@{item.username}</Text>
//         </View>
//         <Text style={[styles.score, , { color: getRankColor() }]}>
//           {item.score}
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const TopUserCard = ({ user }) => (
//   // <ImageBackground
//   //   source={require("../../assets/images/leaderboard-logo.png")}
//   //   style={styles.topUserCardBackground}
//   //   imageStyle={{ borderRadius: 12 }}
//   // >
//   <View style={styles.topUserCard}>
//     <Image source={{ uri: user.avatar }} style={styles.topUserAvatar} />
//     <View style={styles.topUserInfo}>
//       <Text style={styles.topUserName}>{user.name}</Text>
//       <Text style={styles.topUserUsername}>@{user.username}</Text>
//       <Text style={styles.topUserScore}>{user.score} points</Text>
//     </View>
//     <View style={styles.topUserRank}>
//       <Text style={styles.topUserRankText}>1</Text>
//     </View>
//   </View>
//   // </ImageBackground>
// );

// const LeaderboardUI = () => {
//   const leaderboardData = [
//     {
//       id: "1",
//       name: "JSa",
//       username: "jsa",
//       score: 1000,
//       avatar:
//         "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid",
//     },
//     {
//       id: "2",
//       name: "Janith",
//       username: "janith",
//       score: 950,
//       avatar:
//         "https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=",
//     },
//     {
//       id: "3",
//       name: "Bob John",
//       username: "bobj",
//       score: 900,
//       avatar:
//         "https://i.pinimg.com/originals/13/08/a2/1308a28875d5f2f9fb9fe33a411b9298.jpg",
//     },
//     {
//       id: "4",
//       name: "Ali Brown",
//       username: "alib",
//       score: 850,
//       avatar:
//         "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
//     },
//     {
//       id: "5",
//       name: "Ch Davi",
//       username: "charls",
//       score: 800,
//       avatar:
//         "https://static.vecteezy.com/system/resources/thumbnails/034/332/611/small_2x/ai-generated-studio-portrait-of-handsome-elderly-old-african-man-on-different-colours-background-photo.jpg",
//     },
//     {
//       id: "6",
//       name: "JSa",
//       username: "jsa",
//       score: 750,
//       avatar:
//         "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid",
//     },
//     {
//       id: "7",
//       name: "Bob John",
//       username: "bobj",
//       score: 725,
//       avatar:
//         "https://i.pinimg.com/originals/13/08/a2/1308a28875d5f2f9fb9fe33a411b9298.jpg",
//     },
//     {
//       id: "8",
//       name: "Ch Davi",
//       username: "charls",
//       score: 650,
//       avatar:
//         "https://static.vecteezy.com/system/resources/thumbnails/034/332/611/small_2x/ai-generated-studio-portrait-of-handsome-elderly-old-african-man-on-different-colours-background-photo.jpg",
//     },
//   ];

//   const topUser = leaderboardData[0];
//   const remainingUsers = leaderboardData.slice(1);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <FlatList
//         data={remainingUsers}
//         renderItem={({ item, index }) => (
//           <LeaderboardItem item={item} index={index} />
//         )}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContent}
//         ListHeaderComponent={() => (
//           <>
//             <TopUserCard user={topUser} />
//           </>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#FFFFFF",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333333",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//   },
//   listContent: {
//     padding: 16,
//   },
//   itemContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//   },
//   rankContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   rankText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     marginRight: 12,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fe8a01",
//   },
//   username: {
//     fontSize: 14,
//     color: "#000",
//   },
//   score: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#4CAF50",
//   },
//   topUserCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFCA28",
//     margin: 16,
//     padding: 16,
//     borderRadius: 12,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.23,
//     shadowRadius: 5.62,
//   },
//   topUserAvatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 16,
//   },
//   topUserInfo: {
//     flex: 1,
//   },
//   topUserName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333333",
//   },
//   topUserUsername: {
//     fontSize: 16,
//     color: "#666666",
//   },
//   topUserScore: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     marginTop: 4,
//   },
//   topUserRank: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#FFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   topUserRankText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#FFCA28",
//   },
// });

// export default LeaderboardUI;
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LeaderboardItem = ({ item, index }) => {
  const getRankColor = () => {
    if (index === 0) return "#C0C0C0";
    if (index === 1) return "#CD7F32";
    return "#000";
  };
  return (
    <View
      style={[
        styles.itemContainer,
        {
          borderBottomColor: index < 3 ? getRankColor() : "#E0E0E0",
        },
      ]}
    >
      {+index % 2 === 0 ? (
        <Ionicons name="arrow-up" color={"green"} size={20} />
      ) : (
        <Ionicons name="arrow-down" color={"#c4291d"} size={20} />
      )}

      <View style={styles.rankContainer}>
        <Text style={[styles.rankText, { color: getRankColor() }]}>
          {+index + 2}
        </Text>
      </View>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[styles.name, { color: getRankColor() }]}>
          {item.name}
        </Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>
      <Text style={[styles.score, { color: getRankColor() }]}>
        {item.score}
      </Text>
    </View>
  );
};

const TopUserCard = ({ user }) => (
  <View style={styles.topUserCard}>
    <Image source={{ uri: user.avatar }} style={styles.topUserAvatar} />
    <View style={styles.topUserInfo}>
      <Text style={styles.topUserName}>{user.name}</Text>
      <Text style={styles.topUserUsername}>@{user.username}</Text>
      <Text style={styles.topUserScore}>{user.score} points</Text>
    </View>
    <View style={styles.topUserRank}>
      <Text style={styles.topUserRankText}>1</Text>
    </View>
  </View>
);

const LeaderboardUI = () => {
  const leaderboardData = [
    {
      id: 1,
      name: "JSa",
      username: "jsa",
      score: 1000,
      avatar:
        "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid",
    },
    {
      id: 2,
      name: "Janith",
      username: "janith",
      score: 950,
      avatar:
        "https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=",
    },
    {
      id: 3,
      name: "Bob John",
      username: "bobj",
      score: 900,
      avatar:
        "https://i.pinimg.com/originals/13/08/a2/1308a28875d5f2f9fb9fe33a411b9298.jpg",
    },
    {
      id: 4,
      name: "Ali Brown",
      username: "alib",
      score: 850,
      avatar:
        "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
    },
    {
      id: 5,
      name: "Ch Davi",
      username: "charls",
      score: 800,
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/034/332/611/small_2x/ai-generated-studio-portrait-of-handsome-elderly-old-african-man-on-different-colours-background-photo.jpg",
    },
    {
      id: 6,
      name: "JSa",
      username: "jsa",
      score: 750,
      avatar:
        "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid",
    },
    {
      id: 7,
      name: "Bob John",
      username: "bobj",
      score: 725,
      avatar:
        "https://i.pinimg.com/originals/13/08/a2/1308a28875d5f2f9fb9fe33a411b9298.jpg",
    },
    {
      id: 8,
      name: "Ch Davi",
      username: "charls",
      score: 650,
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/034/332/611/small_2x/ai-generated-studio-portrait-of-handsome-elderly-old-african-man-on-different-colours-background-photo.jpg",
    },
  ];

  const topUser = leaderboardData[0];
  const remainingUsers = leaderboardData.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Fixed Top User Card */}
      <TopUserCard user={topUser} />
      {/* Scrollable List */}
      <FlatList
        data={remainingUsers}
        renderItem={({ item, index }) => (
          <LeaderboardItem item={item} index={index} key={index} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fe8a01",
  },
  username: {
    fontSize: 14,
    color: "#000",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  topUserCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFCA28",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.23,
    shadowRadius: 5.62,
  },
  topUserAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  topUserInfo: {
    flex: 1,
  },
  topUserName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  topUserUsername: {
    fontSize: 16,
    color: "#666666",
  },
  topUserScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 4,
  },
  topUserRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  topUserRankText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFCA28",
  },
});

export default LeaderboardUI;
