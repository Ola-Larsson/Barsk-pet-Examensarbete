import * as ImagePicker from "expo-image-picker";
import { Stack, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { CreateDrinkRequest } from "../interfaces/auth/types";
import { useApi } from "./hooks/useApi";

export default function CreateDrink() {
  const [editForm, setEditForm] = useState<CreateDrinkRequest>({
    name: "",
    description: "",
    instructions: "",
    ingredients: [
      {
        name: "",
        amount: "",
      },
    ],
    tags: [
      {
        name: "",
      },
    ],
    image: "",
  });
  const [img, setImg] = useState<any>(null);

  const [errors, setErrors] = useState<any>({
    name: "",
    description: "",
    instructions: "",
    image: "",
    ingredients: [
      {
        name: "",
        amount: "",
      },
    ],
    tags: [
      {
        name: "",
      },
    ],
  });

  const router = useRouter();
  const pathName = usePathname();
  const auth = useAuth();

  const api = useApi("/drinks", false, auth.auth?.token);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    instructions: yup.string().required("Instructions are required"),
    imageUrl: yup.string().optional(),
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Required"),
        amount: yup.string().required("Required"),
      })
    ),
    tags: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Tag name is required"),
      })
    ),
  });

  const handleSubmit = async () => {
    try {
      await schema.validate(editForm, { abortEarly: false });
      setErrors({});
      api.execute("POST", editForm);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        let newErrors: any = {};
        err.inner.forEach((error) => {
          error.path && (newErrors[error.path] = error.message);
        });
        setErrors(newErrors);
      }
    }
  };

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
      setImg(result.assets[0].uri);
      setEditForm({ ...editForm, image: result.assets[0].base64 });
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
      <Stack.Screen options={{ title: editForm.name ? "lmao" : "Xd" }} />
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
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
                source={img ? { uri: img } : {}}
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
            {errors?.imageUrl && (
              <Text
                style={{
                  color: "red",
                  fontSize: 15,
                  paddingLeft: 15,
                  fontWeight: "bold",
                }}
              >
                *{errors?.imageUrl}
              </Text>
            )}
            <View
              style={{
                width: "100%",
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
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
                  Drink Namexd
                </Text>
                {errors?.name && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 15,
                      paddingLeft: 15,
                      fontWeight: "bold",
                    }}
                  >
                    *{errors?.name}
                  </Text>
                )}
              </View>
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
              <View
                style={{
                  flexDirection: "row",
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
                  Description
                </Text>
                {errors?.description && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 15,
                      paddingLeft: 15,
                      fontWeight: "bold",
                    }}
                  >
                    *{errors?.description}
                  </Text>
                )}
              </View>
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
              <View
                style={{
                  flexDirection: "row",
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
                  Ingredients
                </Text>
              </View>
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
                      <View
                        style={{
                          width: "50%",
                          marginRight: 10,
                        }}
                      >
                        {errors[`ingredients[${index}].name`] && (
                          <Text
                            style={{
                              color: "red",
                              fontSize: 15,
                              paddingLeft: 15,
                              fontWeight: "bold",
                            }}
                          >
                            *{errors[`ingredients[${index}].name`]}
                          </Text>
                        )}
                        <TextInput
                          selectionColor="#aaa"
                          style={{
                            backgroundColor: "#2d2d2d",
                            width: "100%",
                            padding: 0,
                            height: 40,
                            borderRadius: 5,
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
                      </View>
                      <View
                        style={{
                          width: "32%",
                          marginRight: 10,
                        }}
                      >
                        {errors[`ingredients[${index}].amount`] && (
                          <Text
                            style={{
                              color: "red",
                              fontSize: 15,
                              paddingLeft: 15,
                              fontWeight: "bold",
                            }}
                          >
                            *{errors[`ingredients[${index}].amount`]}
                          </Text>
                        )}
                        <TextInput
                          selectionColor="#aaa"
                          style={{
                            backgroundColor: "#2d2d2d",
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
                      </View>
                      <IconButton
                        icon="delete"
                        iconColor="#f8c700"
                        style={{
                          height: 30,
                          alignSelf: "flex-end",
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
              <View
                style={{
                  flexDirection: "row",
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
                  Instructions
                </Text>
                {errors?.instructions && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 15,
                      paddingLeft: 15,
                      fontWeight: "bold",
                    }}
                  >
                    *{errors?.instructions}
                  </Text>
                )}
              </View>
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
                        <View
                          style={{
                            width: "85%",
                            marginRight: 10,
                          }}
                        >
                          {errors[`tags[${index}].name`] && (
                            <Text
                              style={{
                                color: "red",
                                fontSize: 15,
                                paddingLeft: 15,
                                fontWeight: "bold",
                              }}
                            >
                              *{errors[`tags[${index}].name`]}
                            </Text>
                          )}
                          <TextInput
                            selectionColor="#aaa"
                            style={{
                              backgroundColor: "#2d2d2d",
                              width: "100%",
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
                        </View>
                        <IconButton
                          icon="delete"
                          iconColor="#f8c700"
                          style={{
                            height: 30,
                            alignSelf: "flex-end",
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
                  marginTop: 5,
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
              handleSubmit();
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
