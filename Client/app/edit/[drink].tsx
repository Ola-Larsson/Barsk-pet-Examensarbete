import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { Drink } from "../../interfaces/auth/types";
import { useApi } from "../hooks/useApi";
import * as ImagePicker from "expo-image-picker";

export default function EditDrink() {
  const [editForm, setEditForm] = useState<Drink>({ 
  id: '',
  name: '',
  imageUrl: '',
  description: '',
  ingredients: [],
  tags: [],
  instructions: '',
  created: '',
  user: '',
  rating: 0,
  ratingCount: 0,
  isFavorite: false,
  currentUserRating: 0,
  isOwned: false,
});

  const pathName = usePathname();
  const auth = useAuth();
  const router = useRouter();
  const drinkId = pathName.split("/")[2];

  const drinkFetch = useApi("/drinks/" + drinkId, true, auth.auth?.token);
  const editApi = useApi("/drinks/" + drinkId, false, auth.auth?.token);
  const editImageSave = useApi("/media/", true, auth.auth?.token);

  const save = () => {
    console.log(editForm);
    editApi.execute("PUT", editForm);
  };

  useEffect(() => {
    if (drinkFetch.status == "success") {
      setEditForm(drinkFetch.value);
    }
  }, [drinkFetch.status, drinkFetch.value]);

  useEffect(() => {
    if (editApi.status == "success") {
      router.push("/" + drinkId);
    }
  }, [editApi.status]);
  useEffect(() => {
    if (editImageSave.status == "success") {
      const editImageUrl : string = editImageSave.value?.imageUrl;
      setEditForm({ ... editForm, imageUrl: editImageUrl });
    }
  }, [editImageSave.status]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) return;

    if (!result.canceled) {    
      //setImg(result.assets[0].uri);
      editImageSave.execute("POST", result.assets[0].base64);       
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#1b1c1d",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Stack.Screen options={{ title: drinkFetch.value?.name }} />
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={drinkFetch.status == "pending"}
            style={{ backgroundColor: "#1b1c1d" }}
            colors={["#f8c700", "#f8c700", "#f8c700"]}
            progressBackgroundColor={"#2b2b2b"}
          />
        }
      >
        {editForm && (
          <View>
            <Card
              style={{
                backgroundColor: "transparent",
                width: "100%",
                height: 300,
                flex: 1,
              }}
            >
              <Card.Cover
                source={editForm.imageUrl ? { uri: editForm.imageUrl } : { }}
                style={{
                  width: "100%",
                  height: 300,
                  backgroundColor: "transparent",
                }}
                borderRadius={0}
              />
              <IconButton
                icon="pencil"
                iconColor="#f8c700"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: 0,
                }}
                onPress={() => pickImage()}
              />
            </Card>
            <View
              style={{
                width: "100%",
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "#f8c700",
                  fontSize: 15,
                  paddingLeft: 15,
                  fontWeight: "bold",
                }}
              >
                Drink Name
              </Text>
              <TextInput
                selectionColor="#aaa"
                style={{
                  backgroundColor: "#2d2d2d",
                  width: "100%",
                  height: 35,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                activeUnderlineColor="#2d2d2d"
                underlineStyle={{ display: "none" }}
                placeholder="Name"
                placeholderTextColor="#aaa"
                textColor="#fff"
                value={editForm?.name}
                onChangeText={(text) => {
                  setEditForm({ ...editForm, name: text });
                }}
              />
              <Text
                style={{
                  color: "#f8c700",
                  fontSize: 15,
                  paddingLeft: 15,
                  fontWeight: "bold",
                }}
              >
                Description
              </Text>
              <TextInput
                selectionColor="#aaa"
                style={{
                  backgroundColor: "#2d2d2d",
                  width: "100%",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                activeUnderlineColor="#2d2d2d"
                underlineStyle={{ display: "none" }}
                placeholder="Description"
                numberOfLines={3}
                multiline={true}
                placeholderTextColor="#aaa"
                textColor="#fff"
                value={editForm?.description}
                onChangeText={(text) => {
                  setEditForm({ ...editForm, description: text });
                }}
              />
              <Text
                style={{
                  color: "#f8c700",
                  fontSize: 15,
                  paddingLeft: 15,
                  fontWeight: "bold",
                }}
              >
                Ingredients
              </Text>
              {editForm?.ingredients && (
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    marginBottom: 10,
                  }}
                >
                  {editForm?.ingredients.map((ingredient, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        marginBottom: 10,
                      }}
                    >
                      <TextInput
                        selectionColor="#aaa"
                        style={{
                          backgroundColor: "#2d2d2d",
                          width: "50%",
                          padding: 0,
                          height: 40,
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                        activeUnderlineColor="#2d2d2d"
                        underlineStyle={{ display: "none" }}
                        placeholder="Ingredient"
                        placeholderTextColor="#aaa"
                        textColor="#fff"
                        value={ingredient.name}
                        onChangeText={(text) => {
                          setEditForm({
                            ...editForm,
                            ingredients: editForm?.ingredients?.map((ingredient, i) => {
                              if (i == index) {
                                return { ...ingredient, name: text };
                              }
                              return ingredient;
                            }),
                          });
                        }}
                      />
                      <TextInput
                        selectionColor="#aaa"
                        style={{
                          backgroundColor: "#2d2d2d",
                          width: "32%",
                          padding: 0,
                          height: 40,
                          borderRadius: 5,
                        }}
                        activeUnderlineColor="#2d2d2d"
                        underlineStyle={{ display: "none" }}
                        placeholder="Amount"
                        placeholderTextColor="#aaa"
                        textColor="#fff"
                        value={ingredient.amount}
                        onChangeText={(text) => {
                          setEditForm({
                            ...editForm,
                            ingredients: editForm?.ingredients?.map((ingredient, i) => {
                              if (i == index) {
                                return { ...ingredient, amount: text };
                              }
                              return ingredient;
                            }),
                          });
                        }}
                      />
                      <IconButton
                        icon="delete"
                        iconColor="#f8c700"
                        style={{
                          height: 30,
                        }}
                        onPress={() => {
                          setEditForm({
                            ...editForm,
                            ingredients: editForm?.ingredients?.filter(
                              (ingredient, i) => i != index
                            ),
                          });
                        }}
                      />
                    </View>
                  ))}
                  <Button
                    mode="contained"
                    style={{
                      backgroundColor: "#f8c700",
                      borderRadius: 5,
                      marginBottom: 10,
                      width: "100%",
                    }}
                    onPress={() => {
                      setEditForm({
                        ...editForm,
                        ingredients: [...editForm?.ingredients, { name: "", amount: "" }],
                      });
                    }}
                  >
                    Add Ingredient
                  </Button>
                </View>
              )}
              <Text
                style={{
                  color: "#f8c700",
                  fontSize: 15,
                  paddingLeft: 15,
                  fontWeight: "bold",
                }}
              >
                Instructions
              </Text>
              <TextInput
                selectionColor="#aaa"
                style={{
                  backgroundColor: "#2d2d2d",
                  width: "100%",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                activeUnderlineColor="#2d2d2d"
                underlineStyle={{ display: "none" }}
                placeholder="Instructions"
                multiline={true}
                numberOfLines={3}
                placeholderTextColor="#aaa"
                textColor="#fff"
                value={editForm?.instructions}
                onChangeText={(text) => {
                  setEditForm({ ...editForm, instructions: text });
                }}
              />
              <Text
                style={{
                  color: "#f8c700",
                  fontSize: 15,
                  paddingLeft: 15,
                  fontWeight: "bold",
                }}
              >
                Tags
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                {editForm?.tags && (
                  <View
                    style={{
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {editForm?.tags.map((tag, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginBottom: 10,
                        }}
                      >
                        <TextInput
                          selectionColor="#aaa"
                          style={{
                            backgroundColor: "#2d2d2d",
                            width: "85%",
                            padding: 0,
                            height: 40,
                            borderRadius: 5,
                          }}
                          activeUnderlineColor="#2d2d2d"
                          underlineStyle={{ display: "none" }}
                          placeholder="Tag"
                          placeholderTextColor="#aaa"
                          textColor="#fff"
                          value={tag.name}
                          onChangeText={(text) => {
                            setEditForm({
                              ...editForm,
                              tags: editForm?.tags?.map((tag, i) => {
                                if (i == index) {
                                  return { ...tag, name: text };
                                }
                                return tag;
                              }),
                            });
                          }}
                        />
                        <IconButton
                          icon="delete"
                          iconColor="#f8c700"
                          style={{
                            height: 30,
                          }}
                          onPress={() => {
                            setEditForm({
                              ...editForm,
                              tags: editForm?.tags?.filter((tag, i) => i != index),
                            });
                          }}
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <Button
                mode="contained"
                style={{
                  backgroundColor: "#f8c700",
                  borderRadius: 5,
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setEditForm({
                    ...editForm,
                    tags: [...editForm?.tags, { name: "" }],
                  });
                }}
              >
                Add Tag
              </Button>
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <Button
            mode="contained"
            style={{
              backgroundColor: "#f8c700",
              borderRadius: 5,
              width: "48%",
            }}
            onPress={() => {
              save();
            }}
          >
            Save
          </Button>
          <Button
            mode="contained"
            style={{
              backgroundColor: "#f8c700",
              borderRadius: 5,
              width: "48%",
            }}
            onPress={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
