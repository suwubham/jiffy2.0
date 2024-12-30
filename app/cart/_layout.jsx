import { Stack, Slot } from "expo-router";

export default function HomeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Cart",
        }}
      />
      <Slot />
    </>
  );
}
